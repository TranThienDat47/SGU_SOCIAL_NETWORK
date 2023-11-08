class ProfileOtherUser {
	constructor(data = { id: "" }) {
		this.data = data;
		this.idSendRequest = false;
	}

	render() {

		const that = this;

		const tabs = document.querySelectorAll('.profile_user-tabs-item');

		tabs.forEach(tab => {
			tab.addEventListener('click', function() {
				tabs.forEach(tab => {
					tab.classList.remove('profile_user-tabs-item_active');
				});

				this.classList.add('profile_user-tabs-item_active');
			});
		});

		const btnAddFriend = $("#btnAddFriendInProfile");

		if (btnAddFriend) {
			const handleAddFriendRequest = () => {
				const url = "/SGU_SOCIAL_NETWORK/api/friend_request/add_friend_request";
				const send_data = {
					requestID: that.data.id,
					userID: getCookieGlobal("id")
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
									console.log(data)
									this.idSendRequest = true;

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

			btnAddFriend.onclick = () => {
				if (!that.idSendRequest) {
					handleAddFriendRequest();
					btnAddFriend.innerHTML = "<p>Đã gửi yêu cầu kết bạn!</p>"
				}
			}
		}

		console.log("ok al nhe", that.data)

	}
}

//new ProfileOtherUser().render();