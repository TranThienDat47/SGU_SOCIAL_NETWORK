class CommentWrite {
	constructor(data = { parentID: -1, modeReply: 0 }) {
		this.commentText = "";
		this.data = data;
		this.handleSubmitComment = async () => { };
		this.handleCancle = async () => { };

	}



	decryptCookieValuePlus(encodedValue, encryptionKey) {
		try {
			// Decode the Base64 encoded value
			var encryptedValue = CryptoJS.enc.Base64.parse(encodedValue);

			// Create a key object from the encryption key
			var key = CryptoJS.enc.Utf8.parse(encryptionKey);

			// Perform decryption using AES
			var decryptedBytes = CryptoJS.AES.decrypt({ ciphertext: encryptedValue }, key, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});

			// Convert the decrypted bytes to a UTF-8 string
			var decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);

			return decryptedValue;
		} catch (error) {
			console.error('Error decrypting cookie value:', error);
			return null;
		}
	}

	getCookieGlobalPlus(name) {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim();
			if (cookie.indexOf(name + '=') === 0) {
				var encodedValue = cookie.substring(name.length + 1, cookie.length);

				// Thực hiện giải mã với cùng một key (khóa)
				var decryptedValue = this.decryptCookieValuePlus(encodedValue, '1234567890123456');

				return decryptedValue;
			}
		}
		return null;
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
							<div id="comment-content" contenteditable="true" class="comment-content ${parseInt(this.data.modeReply) === 0 ? `comment_gloabal_comment_write_text` : ``}"></div>
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
