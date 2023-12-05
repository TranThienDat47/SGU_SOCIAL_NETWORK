class FriendRequestItem {
	constructor(data = { image: "", name: "", id: "", userID: "", countRoomate: "" }) {
		this.data = data;
		this.isDenyFriendRequest = false;
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

	addEvent() {
		const that = this;
		setTimeout(() => {

			var wsUrl;
			if (window.location.protocol == 'http:') {
				wsUrl = 'ws://';
			} else {
				wsUrl = 'wss://';
			}
			var ws = new WebSocket(wsUrl + window.location.host + "/SGU_SOCIAL_NETWORK/notify");

			const handleSendNotificationAccept = async () => {
				const url = "/SGU_SOCIAL_NETWORK/api/notification/accept_friend";
				const send_data = {
					refID: -1,
					rootID: getCookieGlobal("id"),
					userID: that.data.userID,
					firstName: getCookieGlobal("firstName"),
					lastName: getCookieGlobal("lastName"),
					title: "Đồng ý kết bạn"
				};

				console.log(send_data)
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

									ws.send(JSON.stringify([that.data.userID]))

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

			const handleAcceptFriendRequest = () => {
				const url = "/SGU_SOCIAL_NETWORK/api/friend_request/accept_friend_request";
				const send_data = {
					friendRequestID: that.data.id,
					requestID: getCookieGlobal("id"),
					userID: that.data.userID,
				};

				return new Promise((resolve, reject) => {
					const xhr = new XMLHttpRequest();
					xhr.open("POST", url, true);

					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.setRequestHeader("Authorization", `${that.getCookieGlobalPlus("token")}`);

					xhr.onreadystatechange = async function() {
						if (xhr.readyState === 4) {
							if (xhr.status === 200) {
								try {
									const data = JSON.parse(xhr.responseText);
									await handleSendNotificationAccept();

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

			const handleDenyFriendRequest = () => {
				const url = "/SGU_SOCIAL_NETWORK/api/friend_request/deny_add_friend_request";
				const send_data = {
					friendRequestID: that.data.id,
					requestID: getCookieGlobal("id"),
					userID: that.data.userID,
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
									console.log(data)

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

			const btnRecommendFriend = $(`#btnFriendRequest-${that.data.id}`);
			const btnDenyRecommendFriend = $(`#btnDenyFriendRequest-${that.data.id}`);

			btnRecommendFriend.onclick = async () => {

				await handleAcceptFriendRequest();

				btnRecommendFriend.style.display = "none";
				btnDenyRecommendFriend.classList.add('friend_request-deny-disable')
				that.isDenyFriendRequest = true;

				btnDenyRecommendFriend.innerHTML = "<p>Đã chấp nhận lời mời kết bạn</p>"
			}

			btnDenyRecommendFriend.onclick = async () => {
				if (!that.isDenyFriendRequest) {
					await handleDenyFriendRequest()
					btnRecommendFriend.style.display = "none";
					btnDenyRecommendFriend.innerHTML = "<p>Đã từ chối lời mời kết bạn</p>"
					btnDenyRecommendFriend.classList.add('friend_request-deny-disable')
					that.isDenyFriendRequest = true;
				}
			}
		})
	}

	render() {
		const that = this;
		that.addEvent();
		return `
					<div class="friend_request-info_friend">
						<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.userID}" class="friend_request-img_friend"> <img
							src="${that.data.image}"
							alt="" />
						</a>
						<div class="friend_request-name_friend">
							<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.userID}" class="friend_request-child_name">${that.data.name}</a>
							<p class="friend_request-child_friend">${that.data.countRoomate} bạn chung</p>
						</div>
						<button id="btnFriendRequest-${that.data.id}" class="friend_request-addnew" style=" background-color: #055bf5c7;">
							<p style="color: #fff;">Xác nhận yêu cầu</p>
						</button>
						<button id="btnDenyFriendRequest-${that.data.id}" class="friend_request-addnew friend_request-deny">
							<p>Từ chối</p>
						</button>
					</div>
		`
	}
}