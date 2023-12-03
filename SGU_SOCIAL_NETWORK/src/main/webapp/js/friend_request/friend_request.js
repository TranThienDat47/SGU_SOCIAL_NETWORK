class FriendRequest {
	constructor() {
		this.listFriendRequest = [];
		this.LENGTHPAGE = 8;
		this.currendPage = 0;
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


	async fetchListFriendRequest() {
		const that = this;

		const url = "/SGU_SOCIAL_NETWORK/api/friend_request/search_friend_reuqest";
		const send_data = {
			limitValue: that.LENGTHPAGE,
			offsetValue: that.LENGTHPAGE * that.currendPage,
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
							that.listFriendRequest = data;
							that.currendPage += 1;
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

	async renderListFriendRequest() {
		const that = this;

		const renderListFriendRequest = await Promise.all(that.listFriendRequest.map(async (element) => {
			const recommendData = {
				image: element.image,
				name: element.firstName + " " + element.lastName,
				id: element.id,
				countRoomate: element.countRoomate,
				userID: element.userID,
			};

			const userFriendRequestItem = new FriendRequestItem(recommendData);
			const result = userFriendRequestItem.render();

			return result;
		}));


		return renderListFriendRequest.join("");
	}

	async render() {
		const that = this;

		const wrapperListRender = $("#wrapperFriendRequestRender");
		await this.fetchListFriendRequest();

		await that.renderListFriendRequest().then((resultRender) => {

			if (wrapperListRender) {
				wrapperListRender.innerHTML = resultRender;
			}
		});


	}
}

new FriendRequest().render();