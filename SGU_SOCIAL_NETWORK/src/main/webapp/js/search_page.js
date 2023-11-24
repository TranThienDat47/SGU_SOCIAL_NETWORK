class SearchPage {
	constructor() {
		this.listSearchFriendReult = [];
		this.modeView = false; /* true: friend, false: all */
	}


	async fetchDataSearchPageAll(searchValue = "") {
		const that = this;

		const url = "/SGU_SOCIAL_NETWORK/api/friend/search_value_friend";
		const send_data = { offsetValue: 0, limitValue: 5, searchValue };

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open("POST", url, true);

			xhr.setRequestHeader("Content-Type", "application/json");

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							const data = JSON.parse(xhr.responseText);
							that.listSearchFriendReult = data;
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

	async fetchDataSearchPageAllWithFriend(searchValue = "") {
		const that = this;

		const url = "/SGU_SOCIAL_NETWORK/api/friend/search_with_friend_value";
		const send_data = { offsetValue: 0, limitValue: 5, searchValue };

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open("POST", url, true);

			xhr.setRequestHeader("Content-Type", "application/json");

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							const data = JSON.parse(xhr.responseText);
							that.listSearchFriendReult = data;
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

	async innerListFriend() {
		const renderListFriend = await Promise.all(this.listSearchFriendReult.map(async (element) => {
			const friendItemData = {
				id: element.id,
				countRoomate: element.countRoomate,
				name: element.firstName + " " + element.lastName,
				image: element.image,
			};

			const friendItem = new SearchPageItem(friendItemData);
			const result = await friendItem.render();

			return result;
		}));

		return renderListFriend.join("");
	}

	async renderListFriendPageAll() {
		const that = this;
		const queryString = window.location.search;

		const params = new URLSearchParams(queryString);

		const valueParam = params.get('value');

		if (!that.modeView) {

			await this.fetchDataSearchPageAll(valueParam).then(async () => {
				await that.innerListFriend().then((result) => {
					if (that.listSearchFriendReult.length > 0) {
						$("#search_page-friend-list-wrapper").innerHTML = result + `<a href="/SGU_SOCIAL_NETWORK/Search.jsp?page=user&value=${valueParam}"><button class="btn search_page-btn_view_all_with_friend">Xem
				tất cả</button></a>`;
					} else {
						$("#search_page-friend-list-wrapper").innerHTML = `<p style="padding: 0 16px 16px;">Không có kết quả nào</p>`;
					}
				})
			});


		} else {
			await this.fetchDataSearchPageAllWithFriend(valueParam).then(async () => {
				await that.innerListFriend().then((result) => {
					if (that.listSearchFriendReult.length > 0) {
						$("#search_page-friend-list-wrapper").innerHTML = result + `<button class="btn search_page-btn_view_all_with_friend">Xem
				tất cả</button>`;
					} else {
						$("#search_page-friend-list-wrapper").innerHTML = `<p style="padding: 0 16px 16px;">Không có kết quả nào</p>`;
					}
				})
			});


		}
	}

	async render() {
		const that = this;

		const btnFriend = $$(".search_page-is_friend");

		for (let temp of btnFriend) {
			temp.onclick = () => {
				if (!temp.classList.contains("search_page-is_friend-show")) {
					temp.classList.add("search_page-is_friend-show")
				} else {
					temp.classList.remove("search_page-is_friend-show")
				}
			}
		}

		const btnUnFriend = $$(".search_page-unfriend");

		for (let temp of btnUnFriend) {
			temp.onclick = () => {
			}
		}

		const btnAddFriend = $$(".search_page-addnew");

		for (let temp of btnAddFriend) {
			temp.onclick = () => {
			}
		}
	}

}

//searchPage new SearchPage().render();