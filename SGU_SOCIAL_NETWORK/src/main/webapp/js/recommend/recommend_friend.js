class RecommendFriend {
	constructor() {
		this.listRecommend = []
		this.currendPage = 0
		this.LENGTHPAGE = 10
	}

	async fetchListRecommendFriend() {
		const that = this;

		const url = "/SGU_SOCIAL_NETWORK/api/user/search_recommend_friend";
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
							that.listRecommend = data;
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

	async renderListRecommend() {
		const that = this;

		const renderListRecommend = await Promise.all(that.listRecommend.map(async (element) => {
			const recommendData = {
				image: element.image,
				name: element.firstName + " " + element.lastName,
				id: element.id,
				countRoomate: element.countRoomate,
			};

			const userRecommendItem = new RecommendFriendItem(recommendData);
			const result = userRecommendItem.render();

			return result;
		}));


		return renderListRecommend.join("");
	}

	async render() {
		const that = this;

		const wrapperListRender = $("#wrapperRenderListRecommnendFriend");
		await this.fetchListRecommendFriend();

		await that.renderListRecommend().then((resultRender) => {

			if (wrapperListRender) {
				wrapperListRender.innerHTML = resultRender;
			}
		});

	}
}

new RecommendFriend().render()