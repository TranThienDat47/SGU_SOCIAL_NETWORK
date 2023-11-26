class NotificationSocket {
	constructor() {
		this.listNotification = [];
		this.countNotification = 0;
		this.isSeenNotification = false;
	}

	notificationItem(data) {
		return `
					<a href="/SGU_SOCIAL_NETWORK/">
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
		const wrapperNotification = $("#notify_content_global");

		if (that.listNotification) {
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
				console.log(element.read)
				if (!element.read) {
					that.countNotification++;
				}

				return postItem;
			}));

			wrapperNotification.innerHTML = renderListNotification.join("");

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

			const wrapperNotify = $(".header_item-action_notify");
			const btnNotify = $("#btnShowNotify");

			const notify = $(".box_notify");

			btnNotify.onclick = async () => {
				if (notify.classList.contains("box_notify-show")) {
					notify.classList.remove("box_notify-show");
					document.body.removeEventListener('wheel', preventScroll, { passive: false });
					$('.notify_content').removeEventListener('wheel', scroll, { passive: true });



				} else {
					notify.classList.add("box_notify-show");
					$('.notify_content').addEventListener('wheel', scroll);
					document.body.addEventListener('wheel', preventScroll, { passive: false });

					console.log(that.isSeenNotification)

					if (!that.isSeenNotification) {
						await handleSeenNotification().then(() => {
							const countNotify = $("#header_item-action_notify_number");
							countNotify.style.display = "none";
							that.isSeenNotification = true;
						});
					}
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

			dataTemp.forEach((element) => {
				if (parseInt(element) === parseInt(getCookieGlobal("id"))) {
					console.log(element)
					setTimeout(async () => {
						await handleGetNotification().then(() => {
							that.renderNotitfication();
						});;
					}, 100)
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
