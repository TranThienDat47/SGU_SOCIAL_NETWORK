class MessageGlobal {
	constructor() {
		this.listFriend = [];
		this.tempListFriend = [];
		this.hasMoreFriend = true;
		this.pageFriendMessage = 0;

		this.initLeng = 16;
		this.LENGTHPAGE = 8;
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


	async fetchListFriendRemind(limit, offset) {
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

		const url = "/SGU_SOCIAL_NETWORK/api/friend/search_friend";
		const send_data = {
			limitValue: limit,
			offsetValue: offset,
			userID: getCookieGlobal("id")
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
								that.tempListFriend = data;
								that.listFriend = [...that.listFriend, ...data];
								that.pageFriendMessage++;
							}

							if (data && data.length <= 0) that.hasMoreFriend = false;
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

	itemFriend(data = { fullName: "", image: "", friendID: "" }) {
		return `<div data-id="${data.friendID}" data-name="${data.fullName}" data-image="${data.image}" class="message_left_item itemFriendMessage">
					<img class="message_left_item_image" alt=""
						src="${data.image}">
					<div class="message_left_item_name">${data.fullName}</div>
					
					<div data-id="${data.friendID}" class="countNewMessage" style="display: none;">0</div>
				</div>`
	}

	async renderListFriend() {
		const that = this;

		if (that.listFriend && that.listFriend.length) {
			const renderListfriends = await Promise.all(that.tempListFriend.map(async (element) => {
				const friendData = {
					image: element.image,
					fullName: element.firstName + " " + element.lastName,
					id: element.id,
					countRoomate: element.coutRoomate,
					friendID: parseInt(element.friendID) === parseInt(getCookieGlobal("id")) ? element.userID : element.friendID,
				};

				const result = that.itemFriend(friendData);

				return result;
			}));

			return renderListfriends.join("");
		} else {
			return `<div style="margin-left: 16px;opacity: 0.6">Chưa có bạn bè để trò chyện</div>`;
		}

	}

	async fetchConversation() {
		const that = this;

		const url = "/SGU_SOCIAL_NETWORK/api/friend/search_friend";
		const send_data = {
			limitValue: limit,
			offsetValue: offset,
			userID: getCookieGlobal("id")
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
								that.tempListFriend = data;
								that.listFriend = [...that.listFriend, ...data];
								that.pageFriendMessage++;
							}

							if (data && data.length <= 0) that.hasMoreFriend = false;
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

	async render() {
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
		const wrapperRenderBoxMessage = document.querySelector("#message_right")

		const wrapperListFriend = document.querySelector(`#message_left_list`)

		if (wrapperListFriend) {

			await that.fetchListFriendRemind(that.initLeng, that.pageFriendMessage).then(async () => {
				await that.renderListFriend().then((resultRender) => {
					wrapperListFriend.insertAdjacentHTML('beforeend', resultRender);
				})
			})

			window.onscroll = async () => {
				if (that.tempListFriend.length > 0 && that.hasMoreFriend) {
					const isScrollAtBottom = window.innerHeight + window.pageYOffset + 3 >= document.documentElement.scrollHeight;

					if (isScrollAtBottom) {
						await that.fetchListFriendRemind(that.LENGTHPAGE * that.pageFriendMessage, that.listFriend.length).then(async () => {
							await that.renderListFriend().then((resultRender) => {
								wrapperListFriend.insertAdjacentHTML('beforeend', resultRender);
							})
						});

					}
				}

			}

			const handleCheckConversation = async (userID1, userID2) => {
				const url = "/SGU_SOCIAL_NETWORK/api/message/get_conversation";
				const send_data = {
					userID1: userID1,
					userID2: userID2,
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

			const handleCreateConversation = async (userID1, userID2) => {
				const url = "/SGU_SOCIAL_NETWORK/api/message/create_conversation";
				const send_data = {
					userID1: userID1,
					userID2: userID2,
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

			setTimeout(() => {

				var wsUrl;
				if (window.location.protocol == 'http:') {
					wsUrl = 'ws://';
				} else {
					wsUrl = 'wss://';
				}
				var ws = new WebSocket(wsUrl + window.location.host + "/SGU_SOCIAL_NETWORK/message");

				ws.onmessage = async function(event) {
					const dataTemp = JSON.parse(event.data);

					if (dataTemp.userIDReveriver && dataTemp.conversationID) {

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

				};

				const handleGetCountOfUser = async (userID1, userID2) => {
					const url = "/SGU_SOCIAL_NETWORK/api/message/get_count_new";
					const send_data = {
						userID1: userID1,
						userID2: userID2,
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

				const listItem = document.querySelectorAll(`.itemFriendMessage`)

				var tempIndex = 0;
				for (let temp of listItem) {
					const friendNameTemp = temp.getAttribute("data-name");
					const friendImageTemp = temp.getAttribute("data-image");

					const friendIDTemp = temp.getAttribute("data-id");

					setTimeout(async (tempIndex = 3) => {
						await handleGetCountOfUser(getCookieGlobal("id"), friendIDTemp).then((resultData) => {
							if (parseInt(resultData) > 0) {

								const listItemCount = document.querySelectorAll(`.countNewMessage`)
								var tempIndex1 = 0;
								for (let temp1 of listItemCount) {
									const friendIDTemp1 = temp1.getAttribute("data-id");
									if (friendIDTemp1 === friendIDTemp) {
										listItemCount[tempIndex1].style.display = "flex";
										listItemCount[tempIndex1].innerHTML = resultData;
									}
									tempIndex1++;
								}


							}
						});



					}, (tempIndex + 1) * 2.9 * 60);
					tempIndex++;
					temp.onclick = async () => {



						// Lấy URL hiện tại
						var currentURL = window.location.href;

						// Kiểm tra xem tham số id đã tồn tại trong URL chưa
						var hasIDParam = currentURL.includes("?id=");

						// Nếu đã tồn tại, thay đổi giá trị của id, nếu không, thêm mới
						var newURL;
						if (hasIDParam) {
							// Thay đổi giá trị của id
							newURL = currentURL.replace(/(\?id=)[^\&]+/, `$1${friendIDTemp}`);
						} else {
							// Thêm tham số mới vào URL
							newURL = currentURL + `?id=${friendIDTemp}`;
						}
						// Thay đổi URL mà không làm tải lại trang
						history.pushState(null, null, newURL);



						await handleCheckConversation(getCookieGlobal("id"), friendIDTemp).then(async (resultData) => {
							if (!resultData.id && !resultData.userID1 && !resultData.userID2 && !resultData.createAt) {
								await handleCreateConversation(getCookieGlobal("id"), friendIDTemp).then((resultDataCreate) => {
									const messageBox = new MessageBox({ id: resultDataCreate, userID1: getCookieGlobal("id"), userID2: friendIDTemp, name: friendNameTemp, image: friendImageTemp });
									wrapperRenderBoxMessage.innerHTML = messageBox.render();
								});
							} else {
								const messageBox = new MessageBox({ id: resultData.id, userID1: resultData.userID1, userID2: resultData.userID2, name: friendNameTemp, image: friendImageTemp });
								wrapperRenderBoxMessage.innerHTML = messageBox.render();
							}
						});

					}
				}
			})
		}


	}
}

setTimeout(() => {
	new MessageGlobal().render();
}, 100)