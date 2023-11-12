class RecommendFriendItem {
	constructor(data = { image: "", name: "", id: "", countRoomate: "" }) {
		this.data = data;
		this.isSendRequest = false;
		this.friendRequestID = "";
	}

	addEvent() {
		const that = this;
		setTimeout(() => {

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

			const handleCancleAddFriendRequest = () => {
				const url = "/SGU_SOCIAL_NETWORK/api/friend_request/cancle_add_friend_request";
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
									this.isSendRequest = false;

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


			const btnRecommendFriend = $(`#btnRecommendFriend-${that.data.id}`);

			btnRecommendFriend.onclick = async () => {

				if (!that.isSendRequest) {
					await handleAddFriendRequest();

					btnRecommendFriend.innerHTML = `<p>Hủy lời mời</p>`
				} else {
					await handleCancleAddFriendRequest()
					btnRecommendFriend.innerHTML = `<p>Thêm bạn bè</p>`
				}

			}
		})
	}

	render() {
		const that = this;

		that.addEvent();

		return `
					<div class="recommend_friend-info_friend">
						<a href="" class="recommend_friend-img_friend"> 
							<img
								src="${that.data.image}"
								alt="" />
						</a>
						<div class="recommend_friend-name_friend">
							<a href="" class="recommend_friend-child_name">${that.data.name}</a>
							<p class="recommend_friend-child_friend">${that.data.countRoomate} bạn chung</p>
						</div>
						<button id="btnRecommendFriend-${that.data.id}" class="recommend_friend-addnew">
							${that.isSendRequest ? `<p>Hủy lời mời</p>` : `<p>Thêm bạn bè</p>`}
						</button>
					</div>
		`;
	}
}
