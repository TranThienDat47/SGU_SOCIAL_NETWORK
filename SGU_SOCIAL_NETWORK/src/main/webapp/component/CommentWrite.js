class CommentWrite {
	constructor(data = { parentID: -1, modeReply: 0 }) {
		this.commentText = "";
		this.data = data;
		this.handleSubmitComment = async () => { };
		this.handleCancle = async () => { };

	}

	setText(text) {
		this.commentText = text;
	}

	getText() {
		return this.commentText;
	}

	setHandleSubmitComment(handleSubmitComment) {
		this.handleSubmitComment = handleSubmitComment;
	}

	setHandleCancle(handleCancle) {
		this.handleCancle = handleCancle;
	}

	getInputElement() {
		return $(`#CommentWrite_${this.data.parentID} #comment-content`);
	}

	render() {
		const that = this;
		const imgAvt = decodeURIComponent(JSON.parse(localStorage.getItem('image')));


		let intervalID = null;

		intervalID = setInterval(() => {
			const inputText = $(`#CommentWrite_${that.data.parentID} #comment-content`);
			const btnRefresh = $(`#CommentWrite_${that.data.parentID} #btnRefresh`);
			const btnSubmit = $(`#CommentWrite_${that.data.parentID} .btn-comment`);
			if (inputText && btnRefresh && btnSubmit) {

				inputText.oninput = (e) => {
					this.setText(e.target.innerText);
					const btnSubmit = $(`#CommentWrite_${that.data.parentID} .btn-comment`);

					if (that.commentText.trim())
						btnSubmit.classList.remove('disable');
					else
						btnSubmit.classList.add('disable');
				}

				btnRefresh.onclick = () => {
					inputText.innerText = ""
					inputText.focus();
				}

				btnSubmit.onclick = async () => {
					await this.handleSubmitComment();

					inputText.innerText = ""
					inputText.focus();
				}

				if (this.data.modeReply !== 0) {
					const btnCancle = $(`#CommentWrite_${that.data.parentID} #btn-cancle`);

					btnCancle.onclick = () => {
						that.handleCancle();

					}
				}
			}
			clearInterval(intervalID);

		}, 9)

		return `
		        <div id="CommentWrite_${this.data.parentID}" class="comment_wrapper ${parseInt(this.data.modeReply) === 0 ? `comment_gloabal_comment_write` : ""}" >
					<div class="inner-top">
						<div class="comment-left">
							<div class="avata">
								<img
									src="${imgAvt}"
									alt="" class="avt" />
							</div>
						</div>
						<div class="comment-right write-comment">
							<div id="comment-content" contenteditable="true" class="comment-content"></div>
							<div class="write-comment--controls">
								<div class="control-left"></div>
								<div class="control-right">
									${parseInt(this.data.modeReply) !== 0 ? `<button id="btn-cancle" class="btn btn-cancle">hủy</button>` : ""}
									<button id="btnRefresh" class="btn btn-cancle">làm mới</button>
									<button class="btn btn-comment disable">Bình luận</button>
								</div>
							</div>
						</div>
					</div>
				</div>
		        `;
	}

}
