class Comment {
	constructor(data = { parentID: "-1" }) {
		this.data = data;
		this.listComment = [];
		this.tempImageError = { image: "" };
	}

	async fetchComment() {
		const url = "/SGU_SOCIAL_NETWORK/api/comment/get_comment";
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
		const that = this;
		const renderListComment = await Promise.all(this.listComment.map(async (element, index) => {
			const commentData = {
				image: element.image,
				name: element.firstName + " " + element.lastName,
				createAt: element.createAt,
				content: element.content,
				likes: element.likes,
				replies: element.replies,
				parentID: element.parentID,
				id: element.id,
				modeReply: false,
				rootID: that.data.parentID,
				userID: element.userID,
				timeDelay: index,
			};


			const commentItem = new CommentItem(commentData);
			const result = await commentItem.render();

			return result;
		}));

		return renderListComment.join("");
	}

	async render() {

		const that = this;

		const compressImage = (base64String, quality) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.src = base64String;

				img.onload = () => {
					const canvas = document.createElement('canvas');
					const ctx = canvas.getContext('2d');

					// Set canvas dimensions to the original image dimensions
					canvas.width = img.width;
					canvas.height = img.height;

					// Draw the image onto the canvas with specified quality
					ctx.drawImage(img, 0, 0, img.width, img.height);

					// Convert the canvas content to a base64 JPEG image
					const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

					resolve(compressedBase64);
				};

				img.onerror = reject;
			});
		};

		var wsUrl;
		if (window.location.protocol == 'http:') {
			wsUrl = 'ws://';
		} else {
			wsUrl = 'wss://';
		}
		var ws = new WebSocket(wsUrl + window.location.host + "/SGU_SOCIAL_NETWORK/chat");

		ws.onmessage = async function(event) {

			const dataTemp = JSON.parse(event.data);

			if (dataTemp.parentID === that.data.parentID) {
				const commentData = {
					image: dataTemp.image,
					name: dataTemp.firstName + " " + dataTemp.lastName,
					createAt: dataTemp.createAt,
					content: dataTemp.content,
					likes: dataTemp.likes,
					replies: dataTemp.replies,
					id: dataTemp.id,
					parentID: dataTemp.parentID,
					modeReply: false,
					rootID: that.data.parentID,
					userID: dataTemp.userID
				};

				const commentItem = new CommentItem(commentData);

				const countReplies = $$(`.post_detail-count_replies-${that.data.parentID}`);

				for (let temp of countReplies) {
					temp.innerHTML = parseInt(temp.innerHTML.trim()) + 1 + " ";
				}

				await commentItem.render().then((resultData) => {

					$(`.comment-top.val-${that.data.parentID}`).insertAdjacentHTML('afterbegin', resultData);
				})
			}
		};

		ws.onopen = () => {
		}

		ws.onclose = () => {
			const that = this;



			compressImage(that.tempImageError.image, 0.1).then((compressedBase64) => {
				setTimeout(() => {
					var ws = new WebSocket(wsUrl + window.location.host + "/SGU_SOCIAL_NETWORK/chat");

					ws.onmessage = async function(event) {

						const dataTemp = JSON.parse(event.data);

						if (dataTemp.parentID === that.data.parentID) {
							const commentData = {
								image: dataTemp.image,
								name: dataTemp.firstName + " " + dataTemp.lastName,
								createAt: dataTemp.createAt,
								content: dataTemp.content,
								likes: dataTemp.likes,
								replies: dataTemp.replies,
								id: dataTemp.id,
								parentID: dataTemp.parentID,
								modeReply: false,
								rootID: that.data.parentID,
								userID: dataTemp.userID
							};

							const commentItem = new CommentItem(commentData);

							const countReplies = $$(`.post_detail-count_replies-${that.data.parentID}`);

							for (let temp of countReplies) {
								temp.innerHTML = parseInt(temp.innerHTML.trim()) + 1 + " ";
							}

							await commentItem.render().then((resultData) => {

								$(`.comment-top.val-${that.data.parentID}`).insertAdjacentHTML('afterbegin', resultData);
							})
						}
					};

					ws.onopen = () => {
						that.tempImageError.image = compressedBase64;

						ws.send(JSON.stringify(that.tempImageError));
					}

				}, 400)
			});

		}

		ws.onerror = function(event) {
			console.log("Error ", event)
		}

		const commentWrite = new CommentWrite({ parentID: this.data.parentID, modeReply: 0 });

		const handleSubmitComment = async () => {
			if (!commentWrite.getText().trim()) {
				return;
			} else {
				const url = "/SGU_SOCIAL_NETWORK/api/comment/create_parent_is_post"
				const send_data = { parentID: that.data.parentID, userID: getCookieGlobal("id"), content: commentWrite.getText().trim() };

				const xhr = new XMLHttpRequest();
				xhr.open("POST", url, true);
				xhr.setRequestHeader("Content-Type", "application/json");

				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							try {
								const data = JSON.parse(xhr.responseText);

								compressImage(data.image, 0.02).then((compressedBase64) => {
									data.image = compressedBase64;
									that.tempImageError = data;

									ws.send(JSON.stringify(data));
								});


							} catch (error) {
								console.log("JSON parsing error:", error);
							}
						} else {
							console.log("Request failed with status:", xhr.status);
						}
					}
				}

				xhr.send(JSON.stringify(send_data));
			}
		}

		commentWrite.setHandleSubmitComment(handleSubmitComment);

		await this.fetchComment();


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
