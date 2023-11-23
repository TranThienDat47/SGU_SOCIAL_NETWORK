class GloabPost {
	constructor() {
		this.listPostHome = [];
		this.tempListPostHome = [];
		this.hasMoreHome = true;

		this.listPostProfile = [];

		this.pagePostHome = 1;
		this.pagePostSearch = 1;

		this.LENGPAGE = 3;
		this.initLengHome = 6;
		this.initLengProfile = 6;
	}

	async fetchListPostHome(limitValue, offsetValue, searchValue) {

		const that = this;

		const url = "/SGU_SOCIAL_NETWORK/api/post/search_post_value_search";
		const send_data = {
			limitValue,
			offsetValue,
			searchValue,
		};

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("POST", url, true)
			xhr.setRequestHeader("Content-Type", "application/json");

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							const data = JSON.parse(xhr.responseText);


							if (data) {
								that.tempListPostHome = data;
								that.listPostHome = [...that.listPostHome, ...data];
							}

							if (data.length <= 0) that.hasMoreHome = false;

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

	async fetchListPostProfile(limitValue, offsetValue, userID) {

		const that = this;

		const url = "/SGU_SOCIAL_NETWORK/api/post/search_post_of_user";
		const send_data = {
			limitValue,
			offsetValue,
			userID,
		};

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("POST", url, true)
			xhr.setRequestHeader("Content-Type", "application/json");

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							const data = JSON.parse(xhr.responseText);


							if (data)
								that.listPostProfile = [...that.listPostProfile, ...data];
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

	async innerListPostHome() {
		const renderListPost = await Promise.all(this.tempListPostHome.map(async (element, index) => {
			const postItemData = {
				postID: element.id,
				authorID: element.authorID,
				privacySettingID: element.privacySettingID,
				content: element.content,
				createAt: element.createAt,
				image1: element.image1,
				image2: element.image2,
				image3: element.image3,
				image4: element.image4,
				likes: element.likes,
				replies: element.replies,
				title: element.title,
				updateAt: element.updateAt,
				firstName: element.firstName,
				lastName: element.lastName,
				image: element.image,
				timeDelay: index * 10,
			};


			const postItem = new GlobalPostItem(postItemData);
			const result = await postItem.render();

			return result;
		}));

		return renderListPost.join("");
	}

	async innerListProfilePost() {
		const renderListPost = await Promise.all(this.listPostProfile.map(async (element) => {
			const postItemData = {
				postID: element.id,
				authorID: element.authorID,
				privacySettingID: element.privacySettingID,
				content: element.content,
				createAt: element.createAt,
				image1: element.image1,
				image2: element.image2,
				image3: element.image3,
				image4: element.image4,
				likes: element.likes,
				replies: element.replies,
				title: element.title,
				updateAt: element.updateAt,
				firstName: element.firstName,
				lastName: element.lastName,
				image: element.image,
			};


			const postItem = new GlobalPostItem(postItemData);
			const result = await postItem.render();

			return result;
		}));

		return renderListPost.join("");
	}

	async renderListPostHome() {
		const that = this;

		await that.fetchListPostHome(this.initLengHome, 0, "").then(() => {
		});

		await that.innerListPostHome().then((resultRender) => {
			const wrapperRenderListPostHome = $('#render_list_post_home');
			if (wrapperRenderListPostHome) {
				wrapperRenderListPostHome.insertAdjacentHTML('beforeend', resultRender);
			}
		})


		window.onscroll = async () => {
			if (that.listPostHome.length > 0 && that.hasMoreHome) {
				console.log(that.hasMoreHome)
				const isScrollAtBottom = window.innerHeight + window.pageYOffset + 3 >= document.documentElement.scrollHeight;

				if (isScrollAtBottom) {
					await that.fetchListPostHome(that.LENGPAGE * that.pagePostHome, that.listPostHome.length, "");

					await that.innerListPostHome().then((resultRender) => {
						const wrapperRenderListPostHome = $('#render_list_post_home');
						if (wrapperRenderListPostHome) {
							wrapperRenderListPostHome.insertAdjacentHTML('beforeend', resultRender);
						}
					})
				}
			}

		}
	}

	async renderListPostProfile() {
		const that = this;

		await that.fetchListPostProfile(that.initLengProfile, 0, getCookieGlobal("id"));

		await that.innerListProfilePost().then((resultRender) => {
			const wrapperRenderListPostProfile = $('#render_list_post_profile');
			if (wrapperRenderListPostProfile) {
				wrapperRenderListPostProfile.innerHTML = resultRender;
			}
		})


		window.onscroll = async () => {
			if (that.listPostHome.length > 0) {
				const isScrollAtBottom = window.innerHeight + window.pageYOffset + 3 >= document.documentElement.scrollHeight;

				if (isScrollAtBottom) {
					await that.fetchListPostHome(that.LENGPAGE * that.initLengProfile, that.listPostHome.length, "");

					await that.innerListProfilePost().then((resultRender) => {
						const wrapperRenderListPostProfile = $('#render_list_post_profile');
						if (wrapperRenderListPostProfile) {
							wrapperRenderListPostProfile.innerHTML = resultRender;
						}
					})
				}
			}

		}
	}

	async renderListPostProfileOtherUser(userID) {
		const that = this;

		await that.fetchListPostProfile(that.initLengProfile, 0, userID);

		await that.innerListProfilePost().then((resultRender) => {
			const wrapperRenderListPostProfile = $('#render_list_post_profile_other_user');
			if (wrapperRenderListPostProfile) {
				wrapperRenderListPostProfile.innerHTML = resultRender;
			}
		})


		window.onscroll = async () => {
			if (that.listPostHome.length > 0) {
				const isScrollAtBottom = window.innerHeight + window.pageYOffset + 3 >= document.documentElement.scrollHeight;

				if (isScrollAtBottom) {
					await that.fetchListPostHome(that.LENGPAGE * that.initLengProfile, that.listPostHome.length, "");

					await that.innerListProfilePost().then((resultRender) => {
						const wrapperRenderListPostProfile = $('#render_list_post_profile_other_user');
						if (wrapperRenderListPostProfile) {
							wrapperRenderListPostProfile.innerHTML = resultRender;
						}
					})
				}
			}

		}
	}


	async render() {

	}
}

//new GloabPost().render();