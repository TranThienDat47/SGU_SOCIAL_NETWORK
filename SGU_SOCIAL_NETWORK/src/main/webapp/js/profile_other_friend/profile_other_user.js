class ProfileOtherUser {
	constructor(data = { id: "" }) {
		this.data = data;
		this.idSendRequest = false;
	}

	render() {

		const that = this;

		const btnAddFriend = $("#btnAddFriendInProfile");

		if (btnAddFriend) {
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
					handleAddFriendRequest().then(() => {
						window.location.reload();
					});
				}
			}
		}

		const btnCancleAddFriend = $("#btnCancleFriendReuestProfile");

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

		if (btnCancleAddFriend) {
			btnCancleAddFriend.onclick = () => {
				if (!that.idSendRequest) {
					handleDenyFriendRequest().then(() => {

						btnCancleAddFriend.innerHTML = "<p>Đã từ chuối yêu cầu</p>"
						window.location.reload();
					});
				}
			}
		}


		const btnAcceptFriendRequest = $("#btnAcceptFriendReuestProfile");

		if (btnAcceptFriendRequest) {
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

			btnAcceptFriendRequest.onclick = () => {
				handleAcceptFriendRequest().then(() => {
					window.location.reload();
				})
			}

		}

		const btnFriendProfile = $("#btnFriendUserProfile");
		if (btnFriendProfile) {

			const btnUnfriend = $("#btnUnfriendProfile");

			const handleUnfriend = async () => {
				const url = "/SGU_SOCIAL_NETWORK/api/friend/unfriend";
				const send_data = {
					friendID: getCookieGlobal("id"),
					userID: that.data.id,
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

			btnUnfriend.onclick = () => {
				handleUnfriend().then(() => {
					window.location.reload();
				})
			}



			btnFriendProfile.onclick = () => {
				if (!$(".profile_user-dropdown-menu").classList.contains("profile_user-dropdown-menu_show")) {
					$(".profile_user-dropdown-menu").classList.add("profile_user-dropdown-menu_show")
				} else {
					$(".profile_user-dropdown-menu").classList.remove("profile_user-dropdown-menu_show")
				}
			}
		}


		const btnFollow = $("#btnProfileUserFollow");

		if (btnFollow) {

			const handleFollow = async () => {
				const url = "/SGU_SOCIAL_NETWORK/api/follow/add_follow";
				const send_data = {
					userID: getCookieGlobal("id"),
					followID: that.data.id,
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

			btnFollow.onclick = () => {
				handleFollow().then(() => {
					window.location.reload();
				})
			}
		}

		const wrapperUnfollow = $("#wrapperBtnUnfollowProfile");

		if (wrapperUnfollow) {

			wrapperUnfollow.onclick = () => {
				wrapperUnfollow.classList.toggle("global_post-status_profile_show_unfollow")
			}

			const btnUnfollow = $("#btnUnfollowProfile");

			const handleUnfollow = async () => {
				const url = "/SGU_SOCIAL_NETWORK/api/follow/unfollow";
				const send_data = {
					userID: getCookieGlobal("id"),
					followID: that.data.id,
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

			btnUnfollow.onclick = () => {
				handleUnfollow().then(() => {
					window.location.reload();
				})
			}
		}


	}
}

//new ProfileOtherUser().render();