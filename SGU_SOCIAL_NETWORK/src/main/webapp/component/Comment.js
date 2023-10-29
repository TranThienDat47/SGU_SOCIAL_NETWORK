class Comment {
	constructor(data = { parentID: "-1" }) {
		this.data = data;
		this.listComment = [];
	}

	async fetchComment() {
		const url = "/ChatApp/api/comment";
		const send_data = { parentID: this.data.parentID };

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open("POST", url, true);

			xhr.setRequestHeader("Content-Type", "application/json");

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							const data = JSON.parse(xhr.responseText);
							this.listComment = data;

							resolve(data);
						} catch (error) {
							console.log("JSON parsing error:", error);
							reject(error);
						}
					} else {
						console.log("Request failed with status:", xhr.status);
						reject(new Error(`Error: ${xhr.statusText}`));
					}
				}
			}.bind(this);

			xhr.send(JSON.stringify(send_data));
		});
	}

	async renderComments() {
		const renderListComment = await Promise.all(this.listComment.map(async (element) => {
			const commentData = {
				image: "https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg",
				name: "haha",
				createAt: element.createAt,
				content: element.content,
				likes: element.likes,
				replies: element.replies,
				parentID: element.parentID,
				id: element.id,
				modeReply: false,
			};


			const commentItem = new CommentItem(commentData);
			const result = await commentItem.render();

			return result;
		}));

		return renderListComment.join("");
	}

	async render() {

		const that = this;

		const commentWrite = new CommentWrite({ parentID: this.data.parentID, modeReply: 0 });

		const handleSubmitComment = async () => {
			if (!commentWrite.getText().trim()) {
				return;
			} else {
				const url = "/ChatApp/api/comment"
				const send_data = { parentID: that.data.parentID, userID: "1", content: commentWrite.getText().trim() };

				const xhr = new XMLHttpRequest();
				xhr.open("PUT", url, true);
				xhr.setRequestHeader("Content-Type", "application/json");

				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							try {
								const data = JSON.parse(xhr.responseText);
								ws.send(JSON.stringify(data));

							} catch (error) {
								console.log("JSON parsing error:", error);
							}
						} else {
							console.log("Request failed with status:", xhr.status);
							reject(new Error(`Error: ${xhr.statusText}`));
						}
					}
				}

				xhr.send(JSON.stringify(send_data));
			}
		}

		commentWrite.setHandleSubmitComment(handleSubmitComment);

		await this.fetchComment();

		var wsUrl;
		if (window.location.protocol == 'http:') {
			wsUrl = 'ws://';
		} else {
			wsUrl = 'wss://';
		}
		var ws = new WebSocket(wsUrl + window.location.host + "/ChatApp/chat");

		ws.onmessage = async function(event) {

			const dataTemp = JSON.parse(event.data);

			if (dataTemp.parentID === that.data.parentID) {
				const commentData = {
					image: "https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg",
					name: "haha",
					createAt: dataTemp.createAt,
					content: dataTemp.content,
					likes: dataTemp.likes,
					replies: dataTemp.replies,
					id: dataTemp.id,
					parentID: dataTemp.parentID,
					modeReply: false,
				};

				const commentItem = new CommentItem(commentData);

				await commentItem.render().then((resultData) => {

					$(`.comment-top.val-${that.data.parentID}`).insertAdjacentHTML('afterbegin', resultData);
					//					$(`.comment-top.val-${that.data.parentID}`).innerHTML = resultData + $(`.comment-top.val-${that.data.parentID}`).innerHTML;
				})
			}
		};

		ws.onerror = function(event) {
			console.log("Error ", event)
		}

		return `
		        <div class="wrapper_of_block comment_container ">
					<div class="comment">
						<div class="comment__header">
							<div class="wrapper-comment">
								<div class="comment-top val-${this.data.parentID}">
								${await this.renderComments()}
								</div>
								<div class="comment-bottom">
									${commentWrite.render()}
								</div>
							</div>
						</div>
					</div>
				</div>
		        `;
	}
}
