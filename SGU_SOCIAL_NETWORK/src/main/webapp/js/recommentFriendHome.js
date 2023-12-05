class RecommendFriendHome {
	constructor() {
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

	async render() {
		const that = this;
		const btnAddFriend = $$(".btnRecommendFriendHome");

		if (btnAddFriend) {

			var wsUrl;
			if (window.location.protocol == 'http:') {
				wsUrl = 'ws://';
			} else {
				wsUrl = 'wss://';
			}
			var ws = new WebSocket(wsUrl + window.location.host + "/SGU_SOCIAL_NETWORK/notify");

			const handleSendNotification = async (id) => {
				const url = "/SGU_SOCIAL_NETWORK/api/notification/send_friend_request";
				const send_data = {
					refID: -1,
					rootID: getCookieGlobal("id"),
					userID: id,
					firstName: getCookieGlobal("firstName"),
					lastName: getCookieGlobal("lastName"),
					title: "Yêu cầu kết bạn"
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

									ws.send(JSON.stringify([id]))

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

			const handleAddFriendRequest = (id) => {
				const url = "/SGU_SOCIAL_NETWORK/api/friend_request/add_friend_request";
				const send_data = {
					requestID: id,
					userID: getCookieGlobal("id")
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
									await handleSendNotification(id);
									this.isSendRequest = true;

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

			for (let temp of btnAddFriend) {
				temp.onclick = async () => {
					if (temp.getAttribute("data-id")) {
						await handleAddFriendRequest(temp.getAttribute("data-id"));
						console.log(temp)
						temp.textContent = "Đã gửi yêu cầu";
						temp.classList.add('btn_recommend_friend_home-disable')

						temp.removeAttribute("data-id")
					}
				}
			}
		}
	}
}