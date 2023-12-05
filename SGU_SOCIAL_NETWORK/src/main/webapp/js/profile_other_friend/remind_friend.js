class RemindFriend {

	constructor(data = { userID: "" }) {
		this.data = data;
		this.LENGTHPAGE = 8;
		this.currendPage = 0;
		this.listFriend = [];
	}

	async fetchListFriendRemind() {

		const that = this;

		const url = "/SGU_SOCIAL_NETWORK/api/friend/search_friend";
		const send_data = {
			limitValue: that.LENGTHPAGE,
			offsetValue: that.LENGTHPAGE * that.currendPage,
			userID: that.data.userID
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
							that.listFriend = data;

							that.currendPage += 1;

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

	async renderListFriend() {
		const that = this;

		if (that.listFriend) {

			const renderListfriends = await Promise.all(that.listFriend.map(async (element) => {
				const friendData = {
					image: element.image,
					name: element.firstName + " " + element.lastName,
					id: element.id,
					countRoomate: element.coutRoomate,
					friendID: parseInt(element.friendID) === parseInt(that.data.userID) ? element.userID : element.friendID,
				};

				const userFriendItem = new UserFriendItem(friendData);
				const result = userFriendItem.render();

				return result;
			}));

			return renderListfriends.join("");
		} else {
			return "";
		}

	}

	async render() {
		const $ = document.querySelector.bind(document);

		const that = this;
		await that.fetchListFriendRemind();
		await that.renderListFriend().then((resultRender) => {
			const wrapperRenderListFriend = $('#list_friend-list_member');
			if (wrapperRenderListFriend && resultRender) {
				wrapperRenderListFriend.innerHTML = resultRender;
			} else {
				wrapperRenderListFollow.innerHTML = `<div style="margin-left: 0;opacity: 0.6">Không có yêu cầu kết bạn nào.</div>`;
			}
		});

	}
}

//new RemindFriend().render();