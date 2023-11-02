class GloabPost {
	constructor() {
		this.listPostHome = [];
		this.pagePostHome = 1;
		this.LENGPAGE = 3;
		this.initLengHome = 6;
	}

	async fetchListPostHome(limitValue, offsetValue, searchValue) {

		const that = this;

		const url = "/SGU_SOCIAL_NETWORK/api/post/search_post";
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

							that.listPostHome = [...that.listPostHome, ...data];
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

	async renderListPostHome() {
		const renderListPost = await Promise.all(this.listPostHome.map(async (element) => {
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


	async render() {

		const that = this;

		await that.fetchListPostHome(this.initLengHome, 0, "");

		await this.renderListPostHome().then((resultRender) => {
			const wrapperRenderListPostHome = $('#render_list_post_home');
			wrapperRenderListPostHome.innerHTML = resultRender;
		})


		window.onscroll = async () => {
			if (that.listPostHome.length > 0) {
				const isScrollAtBottom = window.innerHeight + window.pageYOffset + 3 >= document.documentElement.scrollHeight;

				if (isScrollAtBottom) {
					await that.fetchListPostHome(that.LENGPAGE * that.pagePostHome, that.listPostHome.length, "");

					await that.renderListPostHome().then((resultRender) => {
						const wrapperRenderListPostHome = $('#render_list_post_home');
						wrapperRenderListPostHome.innerHTML = resultRender;
					})
				}
			}

		}

	}
}

new GloabPost().render();