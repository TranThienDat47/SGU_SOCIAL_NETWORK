class SearchPageItem {
	constructor(data = { id: "", name: "", countRoomate: "", image: "", timeDelay: 100 }) {
		this.modeItem = 0;  /* 0: thêm bạn bè, 1: từ chối yêu cầu, 2: hủy yêu cầu, 3: là bạn bè */
		this.data = data;
	}

	setModeItem() {

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

	handleUpdateMode() {
		const that = this;
		const btnMode = $(`#wrapperButtonSearchPageItem-${that.data.id}`)

		btnMode.innerHTML = that.modeItem == 0 ? `<button id="btnActionFriendSearchPageAdd-${that.data.id}" class="search_page-addnew"><p>Thêm bạn bè</p></button>`
			: (that.modeItem == 1 ? `<button id="btnActionFriendSearchPageAccept-${that.data.id}" class="search_page-addnew"> <p>Chấp nhận</p></button> <button style="margin-left: 9px" id="btnActionFriendSearchPageDeny-${that.data.id}" class="search_page-addnew"> <p>Từ chối</p></button>`
				: (that.modeItem == 2 ? `<button id="btnActionFriendSearchPageCancle-${that.data.id}" class="search_page-addnew"><p>Hủy yêu cầu kết bạn</p></button>`
					: `<button id="btnActionFriendSearchPage-${that.data.id}" class="search_page-addnew"><p>Bạn bè</p></button>`))


		if (that.modeItem == 0) {
			const handleAddFriendRequest = async () => {
				const url = "/SGU_SOCIAL_NETWORK/api/friend_request/add_friend_request";
				const send_data = {
					requestID: that.data.id,
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
									that.modeItem = 2;

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
			const btnAdd = $(`#btnActionFriendSearchPageAdd-${that.data.id}`)

			btnAdd.onclick = async () => {
				await handleAddFriendRequest().then(() => {
					that.handleUpdateMode();
				})
			}

		} else if (that.modeItem == 1) {

			const handleAcceptFriendRequest = async () => {
				const url = "/SGU_SOCIAL_NETWORK/api/friend_request/accept_friend_request";
				const send_data = {
					friendRequestID: that.data.id,
					requestID: getCookieGlobal("id"),
					userID: that.data.id,
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
									that.modeItem = 3;

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

			const handleDenyFriendRequest = async () => {
				const url = "/SGU_SOCIAL_NETWORK/api/friend_request/deny_add_friend_request";
				const send_data = {
					requestID: getCookieGlobal("id"),
					userID: that.data.id,
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
									that.modeItem = 0;

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

			const btnAccept = $(`#btnActionFriendSearchPageAccept-${that.data.id}`)
			const btnDeny = $(`#btnActionFriendSearchPageDeny-${that.data.id}`)



			btnAccept.onclick = async () => {
				await handleAcceptFriendRequest().then(() => {
					that.handleUpdateMode();
				})
			}

			btnDeny.onclick = async () => {
				await handleDenyFriendRequest().then(() => {
					that.handleUpdateMode();
				})
			}
		} else if (that.modeItem == 2) {

			const handleDenyFriendRequest = async () => {
				const url = "/SGU_SOCIAL_NETWORK/api/friend_request/deny_add_friend_request";
				const send_data = {
					requestID: getCookieGlobal("id"),
					userID: that.data.id,
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
									that.modeItem = 0;

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

			const btnCancle = $(`#btnActionFriendSearchPageCancle-${that.data.id}`)

			btnCancle.onclick = async () => {
				await handleDenyFriendRequest().then(() => {
					that.handleUpdateMode();
				})
			}
		} else {

		}
	}

	addEvent() {
		const that = this;
		const handleCheckFriend = async () => {
			const url = "/SGU_SOCIAL_NETWORK/api/friend/check_is_friend";
			const send_data = {
				valueID: that.data.id,
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
								console.log(that.data.id)
								if (data) {
									that.modeItem = 3;
									that.handleUpdateMode();
								}

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

		const handleCheckSendRequestFriend = async () => {
			const url = "/SGU_SOCIAL_NETWORK/api/friend_request/check_send_request";
			const send_data = {
				valueID: that.data.id,
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
									that.modeItem = 1;
									that.handleUpdateMode();
								}

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

		const handleCheckReceiveRequestFriend = async () => {
			const url = "/SGU_SOCIAL_NETWORK/api/friend_request/check_send_request";
			const send_data = {
				userID: that.data.id,
				valueID: getCookieGlobal("id")
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
									that.modeItem = 2;
									that.handleUpdateMode();
								}

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

		setTimeout(async () => {
			await handleCheckFriend().then(async () => {
				await handleCheckSendRequestFriend().then(async () => {
					await handleCheckReceiveRequestFriend();
				});
			}).then(() => {
				if (that.modeItem == 0) {
					const handleAddFriendRequest = async () => {
						const url = "/SGU_SOCIAL_NETWORK/api/friend_request/add_friend_request";
						const send_data = {
							requestID: that.data.id,
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
											that.modeItem = 2;
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
					const btnAdd = $(`#btnActionFriendSearchPageAdd-${that.data.id}`)

					if (btnAdd) {
						btnAdd.onclick = async () => {
							await handleAddFriendRequest().then(() => {
								that.handleUpdateMode();
							})
						}
					}

				}
			});


			if (parseInt(that.data.id) === parseInt(getCookieGlobal("id"))) {
				$(`#wrapperButtonSearchPageItem-${that.data.id}`).innerHTML = ""
			}
		}, that.data.timeDelay * 30 * 2.9)

	}

	async render() {
		const that = this;

		that.addEvent();

		return `
				<div id="search_page-friend-list-${that.data.id}" class="search_page-friend-list" class="search_page-friend-list">
					<div class="search_page-friend-item">
						<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.id}" class="search_page-friend-avatar"> <img
							src="${that.data.image}"
							alt="" />
						</a>
						<div class="search_page-friend-details">
							<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.id}"><p>${that.data.name}</p></a>
							<span>${that.data.countRoomate} bạn chung</span>
						</div>
					</div>
					
					<div id="wrapperButtonSearchPageItem-${that.data.id}" style="display: flex;">
							${that.modeItem == 0 ? `<button id="btnActionFriendSearchPageAdd-${that.data.id}" class="search_page-addnew"><p>Thêm bạn bè</p></button>`
				: (that.modeItem == 1 ? `<button id="btnActionFriendSearchPageAccept-${that.data.id}" class="search_page-addnew"> <p>Chấp nhận</p></button> <button style="margin-left: 9px" id="btnActionFriendSearchPageDeny-${that.data.id}" class="search_page-addnew"> <p>Từ chối</p></button>`
					: (that.modeItem == 2 ? `<button id="btnActionFriendSearchPageCancle-${that.data.id}" class="search_page-addnew"><p>Hủy yêu cầu kết bạn</p></button>`
						: `<button id="btnActionFriendSearchPage-${that.data.id}" class="search_page-addnew"><p>Bạn bè</p></button>`))}
					
					</div>
				</div>
	`
	}
}