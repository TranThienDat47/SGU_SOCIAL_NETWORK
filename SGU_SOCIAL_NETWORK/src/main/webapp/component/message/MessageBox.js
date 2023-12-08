class MessageBox {
	constructor(data = { id: "", userID1: "", userID2: "", name: "", image: "" }) {
		this.data = data;

		this.listMessage = [];
		this.tempListMessage = [];
		this.hasMoreMessage = true;
		this.pageMessage = 0;

		this.tempScroll = 0;

		this.LENGTHPAGE = 16;
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


	messageOther(textMessage) {
		return `<div class="message_right_chat_message_other">${textMessage}</div>`;
	}

	messageMy(textMessage) {
		return `<div class="message_right_chat_message_my_wrapper">
						<div class="message_right_chat_message_my">${textMessage}</div>
					</div>`;
	}

	async handleGetMessageOfConversation(limit, offset) {
		const that = this;
		const url = "/SGU_SOCIAL_NETWORK/api/message/get_message_of_conversation";
		const send_data = {
			limitValue: limit,
			offsetValue: offset,
			conversationID: that.data.id,
		};

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);

			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization", `${that.getCookieGlobalPlus("token")}`);

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							const data = JSON.parse(xhr.responseText);


							if (data) {
								that.tempListMessage = data;
								that.listMessage = [...that.listMessage, ...data];
								that.pageMessage++;
							}

							if (data && (data.length <= 0 || data.length < that.LENGTHPAGE)) that.hasMoreMessage = false;

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

	async handleSendMessage(content) {

		function getCookieGlobal(name) {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].trim();
				if (cookie.indexOf(name + '=') === 0) {
					var encodedValue = cookie.substring(name.length + 1, cookie.length);
					var decodedValue = decodeURIComponent(encodedValue);
					return decodedValue;
				}
			}
			return null;
		}

		const that = this;
		const url = "/SGU_SOCIAL_NETWORK/api/message/create_message";
		const send_data = {
			content,
			userID: getCookieGlobal("id"),
			conversationID: that.data.id,
		};

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);

			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization", `${that.getCookieGlobalPlus("token")}`);

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							const data = JSON.parse(xhr.responseText);

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

	renderMessage(data = [{ content: "", userID: "" }]) {
		const that = this;

		function getCookieGlobal(name) {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].trim();
				if (cookie.indexOf(name + '=') === 0) {
					var encodedValue = cookie.substring(name.length + 1, cookie.length);
					var decodedValue = decodeURIComponent(encodedValue);
					return decodedValue;
				}
			}
			return null;
		}

		if (data) {
			const resultRender = [];

			// Duyệt từ cuối đến đầu mảng
			for (let index = data.length - 1; index >= 0; index--) {
				const element = data[index];
				if (parseInt(element.userID) === parseInt(getCookieGlobal("id"))) {
					resultRender.push(that.messageMy(element.content));
				} else {
					resultRender.push(that.messageOther(element.content));
				}
			}

			return resultRender.join("");
		} else {
			return "";
		}
	}


	render() {
		const that = this;
		function getCookieGlobal(name) {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].trim();
				if (cookie.indexOf(name + '=') === 0) {
					var encodedValue = cookie.substring(name.length + 1, cookie.length);
					var decodedValue = decodeURIComponent(encodedValue);
					return decodedValue;
				}
			}
			return null;
		}
		setTimeout(async () => {
			const wrapperListMessage = document.querySelector("#message_right_chat_message");

			that.hasMoreMessage = false;
			await that.handleGetMessageOfConversation(that.LENGTHPAGE, that.pageMessage * that.LENGTHPAGE).then((resultData) => {
				wrapperListMessage.insertAdjacentHTML('afterbegin', that.renderMessage(resultData));
				wrapperListMessage.scrollTop = wrapperListMessage.scrollHeight;
			});



			setTimeout(() => {
				that.hasMoreMessage = true;
				wrapperListMessage.onscroll = async () => {
					const currentScrollPosition = wrapperListMessage.scrollTop;

					if (that.tempListMessage.length > 0 && that.hasMoreMessage) {
						// Kiểm tra xem thanh cuộn đã ở đầu trang hay không
						const isScrollAtTop = wrapperListMessage.scrollTop === 0;

						if (isScrollAtTop) {
							await that.handleGetMessageOfConversation(that.LENGTHPAGE, that.pageMessage * that.LENGTHPAGE).then((resultData) => {
								wrapperListMessage.insertAdjacentHTML('afterbegin', that.renderMessage(resultData));
								wrapperListMessage.scrollTop = currentScrollPosition + 96;
							});
						}
					}
				};

			}, 0)


			var wsUrl;
			if (window.location.protocol == 'http:') {
				wsUrl = 'ws://';
			} else {
				wsUrl = 'wss://';
			}
			var ws = new WebSocket(wsUrl + window.location.host + "/SGU_SOCIAL_NETWORK/message");

			ws.onmessage = async function(event) {
				const dataTemp = JSON.parse(event.data);

				if (dataTemp.userIDReveriver && dataTemp.conversationID && parseInt(that.data.id) === parseInt(dataTemp.conversationID) && parseInt(getCookieGlobal("id")) === parseInt(dataTemp.userIDReveriver)) {
					const wrapperListMessage = document.querySelector(`.message_right_chat_message-${that.data.id}-${dataTemp.userIDReveriver}`);

					if (wrapperListMessage) {
						wrapperListMessage.insertAdjacentHTML('beforeend', that.renderMessage(dataTemp.data));
						wrapperListMessage.scrollTop = wrapperListMessage.scrollHeight;

						const listItemCount = document.querySelectorAll(`.countNewMessage`)

						var tempIndex1 = 0;

						for (let temp1 of listItemCount) {
							const friendIDTemp1 = temp1.getAttribute("data-id");
							if (parseInt(friendIDTemp1) === parseInt(dataTemp.userIDSend)) {
								listItemCount[tempIndex1].style.display = "flex";
								listItemCount[tempIndex1].innerHTML = parseInt(listItemCount[tempIndex1].innerHTML) + 1;
							}
							tempIndex1++;
						}

					}
				}

			};


			const txtMessage = document.querySelector(`#txtMessage-${that.data.id}-${getCookieGlobal("id")}`)
			const btnSendMessage = document.querySelector(`#btnSendMessage-${that.data.id}-${getCookieGlobal("id")}`)


			const handleReadMessage = async (conversationID, userID) => {
				const url = "/SGU_SOCIAL_NETWORK/api/message/read_mesage";
				const send_data = {
					conversationID,
					userID,
				};

				return new Promise((resolve, reject) => {
					const xhr = new XMLHttpRequest();
					xhr.open("POST", url, true);

					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.setRequestHeader("Authorization", `${that.getCookieGlobalPlus("token")}`);

					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							if (xhr.status === 200) {
								try {
									const data = JSON.parse(xhr.responseText);

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

			txtMessage.onfocus = async () => {
				const tempUserID = parseInt(that.data.userID1) === parseInt(getCookieGlobal("id")) ? that.data.userID2 : that.data.userID1;
				await handleReadMessage(that.data.id, tempUserID).then(() => {
					const listItemCount = document.querySelectorAll(`.countNewMessage`)

					var tempIndex1 = 0;

					for (let temp1 of listItemCount) {
						const friendIDTemp1 = temp1.getAttribute("data-id");
						if (parseInt(friendIDTemp1) === parseInt(tempUserID)) {
							listItemCount[tempIndex1].style.display = "none";
							listItemCount[tempIndex1].innerHTML = "0";
						}
						tempIndex1++;
					}
				});

			}

			btnSendMessage.onclick = async () => {
				await that.handleSendMessage(txtMessage.value).then((resultData) => {
					ws.send(JSON.stringify({ conversationID: that.data.id, userIDSend: getCookieGlobal("id"), userIDReveriver: parseInt(that.data.userID1) === parseInt(getCookieGlobal("id")) ? that.data.userID2 : that.data.userID1, data: [{ content: txtMessage.value, userIDSend: getCookieGlobal("id") }] }));

					wrapperListMessage.insertAdjacentHTML('beforeend', that.renderMessage([{ content: txtMessage.value, userID: getCookieGlobal("id") }]));
					wrapperListMessage.scrollTop = wrapperListMessage.scrollHeight;
					txtMessage.value = "";
					txtMessage.focus();
				})
			}

			txtMessage.onkeydown = async (event) => {
				if (event.key === 'Enter') {
					// Ngăn chặn hành động mặc định của phím Enter (ngắn định lệnh xuống dòng)
					event.preventDefault();

					btnSendMessage.click();
				}
			};

		}, 100)

		return `
			<div class="message_right_header">
				<div class="message_right_item">
					<img class="message_right_item_image" alt=""
						src="${that.data.image}">
					<div class="message_right_item_name">${that.data.name}</div>
				</div>
			</div>

			<div class="message_right_chat">
				<div id="message_right_chat_message" class="message_right_chat_message message_right_chat_message-${that.data.id}-${parseInt(that.data.userID1) === parseInt(getCookieGlobal("id")) ? that.data.userID1 : that.data.userID2}">
				</div>
				<div class="message_right_chat_write">
					<input id="txtMessage-${that.data.id}-${getCookieGlobal("id")}" class="message_right_chat_write_message" type="text"
						value="" placeholder="Soạn tin nhắn..." />
					<div id="btnSendMessage-${that.data.id}-${getCookieGlobal("id")}" class="message_right_chat_write_send">
						<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16"
							viewBox="0 0 512 512">
						<path
								d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" /></svg>
					</div>
				</div>
			</div>
		`;
	}
}