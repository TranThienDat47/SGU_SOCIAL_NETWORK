class SearchPagePost {
	constructor() {
		this.listPostSearch = [];
		this.pagePostSearch = 1;
		this.modeView = false; /* true: friend, false: all */

		this.LENGPAGE = 3;
		this.initLengHome = 6;
		this.hasMore = true;
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

	async fetchListPostSearch(limitValue, offsetValue, searchValue) {

		const that = this;

		const url = "/SGU_SOCIAL_NETWORK/api/post/search_post_value_search";
		const send_data = {
			limitValue,
			offsetValue,
			searchValue,
		};

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("POST", url, true)
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization", `${that.getCookieGlobalPlus("token")}`);

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							const data = JSON.parse(xhr.responseText);

							if (data && data.length > 0) that.listPostSearch = [...that.listPostSearch, ...data]; else that.hasMore = false;
							//							if (data) that.listPostSearch = data;


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

	async fetchListPostSearchWithFriend(limitValue, offsetValue, searchValue) {

		const that = this;

		const url = "/SGU_SOCIAL_NETWORK/api/post/search_post_value_with_friend";
		const send_data = {
			limitValue,
			offsetValue,
			searchValue,
			userID: getCookieGlobal("id")
		};

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("POST", url, true)
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization", `${that.getCookieGlobalPlus("token")}`);

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							const data = JSON.parse(xhr.responseText);

							if (data && data.length > 0) that.listPostSearch = [...that.listPostSearch, ...data]; else that.hasMore = false;
							//							if (data) that.listPostSearch = data;
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

	async innerListPostSearch() {
		const renderListPost = await Promise.all(this.listPostSearch.map(async (element) => {
			const postItemData = {
				postID: element.id,
				authorID: element.authorID,
				privacySettingID: element.privacySettingID,
				content: element.content,
				createAt: element.createAt,
				image1: element.image1,
				image2: element.image2,
				image3: element.image3,
				image4: element.image4,
				likes: element.likes,
				replies: element.replies,
				title: element.title,
				updateAt: element.updateAt,
				firstName: element.firstName,
				lastName: element.lastName,
				image: element.image,
			};


			const postItem = new GlobalPostItem(postItemData);
			const result = await postItem.render();

			return result;
		}));

		return renderListPost.join("");
	}

	async renderListPostSearch(valueSearch = "") {
		const that = this;
		that.listPostSearch = []

		if (!that.modeView) {
			await that.fetchListPostSearch(this.initLengHome, 0, valueSearch.trim()).then(() => {
			});

			await that.innerListPostSearch().then((resultRender) => {
				const wrapperRenderListPostSearch = $('#render_list_post_search');
				if (wrapperRenderListPostSearch && resultRender) {
					wrapperRenderListPostSearch.innerHTML = resultRender;
				} else {
					wrapperRenderListPostSearch.innerHTML = `<div style="margin-top: 16px;opacity: 0.6">Không có bài viết nào.</div>`;
				}
			})
			window.onscroll = async () => {
				if (that.listPostSearch.length > 0 && that.hasMore) {
					const isScrollAtBottom = window.innerHeight + window.pageYOffset + 3 >= document.documentElement.scrollHeight;

					if (isScrollAtBottom) {
						await that.fetchListPostSearch(that.LENGPAGE * that.pagePostSearch, that.listPostSearch.length, valueSearch);

						await that.innerListPostSearch().then((resultRender) => {
							const wrapperRenderListPostSearch = $('#render_list_post_search');
							if (wrapperRenderListPostSearch) {
								wrapperRenderListPostSearch.innerHTML = resultRender;
							}
						})
					}
				}

			}
		} else {
			await that.fetchListPostSearchWithFriend(this.initLengHome, 0, valueSearch.trim());

			await that.innerListPostSearch().then((resultRender) => {
				const wrapperRenderListPostSearch = $('#render_list_post_search');
				if (wrapperRenderListPostSearch && resultRender) {
					wrapperRenderListPostSearch.innerHTML = resultRender;
				} else {
					wrapperRenderListPostSearch.innerHTML = `<div style="margin-top: 16px;opacity: 0.6">Không có bài viết nào.</div>`;
				}
			})

			window.onscroll = async () => {
				if (that.listPostSearch.length > 0 && that.hasMore) {
					const isScrollAtBottom = window.innerHeight + window.pageYOffset + 3 >= document.documentElement.scrollHeight;

					if (isScrollAtBottom) {
						await that.fetchListPostSearchWithFriend(that.LENGPAGE * that.pagePostSearch, that.listPostSearch.length, valueSearch);

						await that.innerListPostSearch().then((resultRender) => {
							const wrapperRenderListPostSearch = $('#render_list_post_search');
							if (wrapperRenderListPostSearch) {
								wrapperRenderListPostSearch.innerHTML = resultRender;
							}
						})
					}
				}

			}
		}


	}

	async render() {

	}
}

//new GloabPost().render();