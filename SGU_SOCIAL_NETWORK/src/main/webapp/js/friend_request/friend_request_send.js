class FriendRequest {
	constructor() {
		this.listFriendRequest = [];
		this.LENGTHPAGE = 8;
		this.currendPage = 0;
	}

	async fetchListFriendRequest() {
		const that = this;

		const url = "/SGU_SOCIAL_NETWORK/api/friend_request/search_reuqest_send";
		const send_data = {
			limitValue: that.LENGTHPAGE,
			offsetValue: that.LENGTHPAGE * that.currendPage,
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
							that.listFriendRequest = data;
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

	async renderListFriendRequest() {
		const that = this;

		const renderListFriendRequest = await Promise.all(that.listFriendRequest.map(async (element) => {
			const recommendData = {
				image: element.image,
				name: element.firstName + " " + element.lastName,
				id: element.id,
				countRoomate: element.countRoomate,
				userID: element.requestID,
			};

			const userFriendRequestItem = new FriendRequestSendItem(recommendData);
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