class NotificationSocket {
	constructor() {
		this.listNotification = [];
		this.countNotification = 0;
		this.isSeenNotification = false;
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

	notificationItem(data) {

		return `
					<a class="notification_post_${data.title === "Bình luận bài viết" || data.title === "Yêu thích bài viết" ? "ok" : ""}" data-id="${data.refID}" href="${data.title === "Yêu cầu kết bạn" ? '/SGU_SOCIAL_NETWORK/FriendRequest.jsp'
				: (data.title === 'Đồng ý kết bạn' ? `/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${data.rootID}`
					: (data.title === "Yêu thích bài viết" ? `#` : `#`))}" >
						<div class="notify_content_child">
							<img
								src="${data.image}"
								alt="" />
							<div class="child_content">
								<p>${data.content}</p>
								<p>${data.createAT}</p>
							</div>
						</div>
					</a>
		`
	}

	async renderNotitfication() {
		const that = this;
		const wrapperNotification = document.querySelector("#notify_content_global");

		if (that.listNotification) {
			var tempCount = 0;
			const renderListNotification = await Promise.all(that.listNotification.map(async (element, index) => {
				const notifiData = {
					image: element.image,
					content: element.content,
					rootID: element.rootID,
					userID: element.userID,
					refID: element.refID,
					title: element.title,
					createAT: element.createAT,
					image: element.image,
					firstName: element.firstName,
					lastName: element.lastName,
				};


				const postItem = that.notificationItem(notifiData);

				if (!element.read) {
					tempCount++;
				}

				return postItem;
			}));

			that.countNotification = tempCount;

			if (renderListNotification.join("")) {
				wrapperNotification.innerHTML = renderListNotification.join("");
			} else {
				wrapperNotification.innerHTML = `<div style=" display: flex; justify-content: center; align-items: center; height: 100%; opacity: 0.6;">Bạn chưa có thông báo nào</div>`;
			}

			if (that.countNotification > 0) {
				const countNotify = $("#header_item-action_notify_number");
				countNotify.style.display = "block";
				countNotify.innerHTML = that.countNotification;
				that.isSeenNotification = false;
			} else {
				that.isSeenNotification = true;
			}


			const handleSeenNotification = async () => {
				const url = "/SGU_SOCIAL_NETWORK/api/notification/read";
				const send_data = {
					userID: getCookieGlobal("id"),
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
									that.listNotification = data;
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

			const wrapperNotify = document.querySelector(".header_item-action_notify");
			const btnNotify = document.querySelector("#btnShowNotify");

			const notify = document.querySelector(".box_notify");

			btnNotify.onclick = async () => {
				if (notify.classList.contains("box_notify-show")) {
					notify.classList.remove("box_notify-show");
					document.body.removeEventListener('wheel', preventScroll, { passive: false });
					$('.notify_content').removeEventListener('wheel', scroll, { passive: true });



				} else {
					notify.classList.add("box_notify-show");
					$('.notify_content').addEventListener('wheel', scroll);
					document.body.addEventListener('wheel', preventScroll, { passive: false });

					setTimeout(() => {
						const listNotification_post = document.querySelectorAll(".notification_post_ok")

						for (let temp of listNotification_post) {
							temp.onclick = () => {
								const tempRender = new PostDetailPage(temp.getAttribute("data-id"));

								tempRender.fetchPost().then(() => {
									setTimeout(() => {
										tempRender.render().then((resultRender) => {
											$("#showPostDetailGloabal").innerHTML = resultRender;
											notify.classList.remove("box_notify-show");
											document.body.removeEventListener('wheel', preventScroll, { passive: false });
											$('.notify_content').removeEventListener('wheel', scroll, { passive: true });
										})
									}, 100)
								});
							}
						}


					}, 10)


					if (!that.isSeenNotification) {
						await handleSeenNotification().then(() => {
							const countNotify = $("#header_item-action_notify_number");
							countNotify.style.display = "none";
							that.isSeenNotification = true;
						});
					}
				}
			}

			const wrapperSetting = $(".header_item-action-setting");
			const btnSetting = $("#btnHeaderShowSetting");

			const setting = $(".user_setting-box_setting");

			btnSetting.onclick = () => {
				if (setting.classList.contains("user_setting-box_setting-show")) {
					setting.classList.remove("user_setting-box_setting-show");
					document.body.removeEventListener('wheel', preventScroll, { passive: false });
				} else {
					setting.classList.add("user_setting-box_setting-show");
					document.body.addEventListener('wheel', preventScroll, { passive: false });
				}
			}


			window.onclick = function(e) {
				if (notify.classList.contains('box_notify-show')) {
					if (!checkNode(wrapperNotify, e.target)) {
						notify.classList.remove("box_notify-show");
						document.body.removeEventListener('wheel', preventScroll, { passive: false });
						$('.notify_content').removeEventListener('wheel', scroll, { passive: true });
					}
				}

				if (setting.classList.contains("user_setting-box_setting-show")) {
					if (!checkNode(wrapperSetting, e.target)) {
						setting.classList.remove("user_setting-box_setting-show");
						document.body.removeEventListener('wheel', preventScroll, { passive: false });
					}
				}
			};


		}
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

		var wsUrl;
		if (window.location.protocol == 'http:') {
			wsUrl = 'ws://';
		} else {
			wsUrl = 'wss://';
		}
		var ws = new WebSocket(wsUrl + window.location.host + "/SGU_SOCIAL_NETWORK/notify");

		ws.onmessage = async function(event) {
			const dataTemp = JSON.parse(event.data);

			dataTemp.forEach((element, index) => {
				if (parseInt(element) === parseInt(getCookieGlobal("id"))) {
					setTimeout(async () => {
						await handleGetNotification().then(() => {
							that.renderNotitfication();
						});;
					}, index * 30 * 2.9)
					return;
				}
			})
		};

		const handleGetNotification = async () => {
			const url = "/SGU_SOCIAL_NETWORK/api/notification/get";
			const send_data = {
				userID: getCookieGlobal("id"),
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
								that.listNotification = data;
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
			await handleGetNotification().then(() => {
				that.renderNotitfication();
			});
		}, 400)



	}
}

async function renderNotificationSocket() {
	await new NotificationSocket().render();
}

setTimeout(async () => {
	await renderNotificationSocket()
}, 100)
