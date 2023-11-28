class GlobalPostItem {
	constructor(data = {
		postID: "",
		authorID: "",
		privacySettingID: element.privacySettingID,
		content: "",
		createAt: "",
		image1: "",
		image2: "",
		image3: "",
		image4: "",
		likes: "",
		replies: "",
		title: "",
		updateAt: "",
		firstName: "",
		lastName: "",
		image: "",
		timeDelay: 60,
	}) {
		this.data = data;
		this.isLikePost = false;
		this.listLikePost = [];
	}

	async fetchLikePost() {
		const that = this;
		const url = "/SGU_SOCIAL_NETWORK/api/like_post/get_like";
		const send_data = {
			postID: this.data.postID,
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
							that.listLikePost = data;
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

	async fetchCheckLikePost() {
		const that = this;
		const url = "/SGU_SOCIAL_NETWORK/api/like_post/check_like";
		const send_data = {
			postID: this.data.postID,
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
							if (data) {
								that.isLikePost = true;
							}
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

	actionLike() {
		const that = this;
		const wrapperLikePost = $(`#wrapperLikePost-${that.data.postID}`)
		const wrapperTextLikePost = $(`#wrapperTextLikePost-${that.data.postID}`)
		wrapperLikePost.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512">
													<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" fill="#ee3939"/>
												</svg>`;

		wrapperTextLikePost.style.color = "#ee3939";
	}

	actionDisLike() {
		const that = this;
		const wrapperLikePost = $(`#wrapperLikePost-${that.data.postID}`)
		const wrapperTextLikePost = $(`#wrapperTextLikePost-${that.data.postID}`)
		wrapperLikePost.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
										viewBox="0 0 18 18" fill="none">
							            <path
											d="M7.93828 16.4602L7.85039 16.3793L1.69102 10.6594C0.611719 9.65742 0 8.25117 0 6.77812V6.66211C0 4.18711 1.75781 2.06367 4.19062 1.59961C5.57578 1.33242 6.99258 1.65234 8.12109 2.44687C8.4375 2.67187 8.73281 2.93203 9 3.23086C9.14766 3.06211 9.30586 2.90742 9.47461 2.76328C9.60469 2.65078 9.73828 2.54531 9.87891 2.44687C11.0074 1.65234 12.4242 1.33242 13.8094 1.59609C16.2422 2.06015 18 4.18711 18 6.66211V6.77812C18 8.25117 17.3883 9.65742 16.309 10.6594L10.1496 16.3793L10.0617 16.4602C9.77344 16.7273 9.39375 16.8785 9 16.8785C8.60625 16.8785 8.22656 16.7309 7.93828 16.4602ZM8.40586 5.09765C8.3918 5.08711 8.38125 5.07305 8.3707 5.05898L7.74492 4.35586L7.74141 4.35234C6.9293 3.4418 5.70234 3.02695 4.50703 3.25547C2.86875 3.56836 1.6875 4.9957 1.6875 6.66211V6.77812C1.6875 7.78008 2.10586 8.73984 2.84063 9.42187L9 15.1418L15.1594 9.42187C15.8941 8.73984 16.3125 7.78008 16.3125 6.77812V6.66211C16.3125 4.99922 15.1312 3.56836 13.4965 3.25547C12.3012 3.02695 11.0707 3.44531 10.2621 4.35234C10.2621 4.35234 10.2621 4.35234 10.2586 4.35586C10.2551 4.35937 10.2586 4.35586 10.2551 4.35937L9.6293 5.0625C9.61875 5.07656 9.60469 5.08711 9.59414 5.10117C9.43594 5.25937 9.22148 5.34726 9 5.34726C8.77852 5.34726 8.56406 5.25937 8.40586 5.10117V5.09765Z"
											fill="black" />
							        </svg>`;

		wrapperTextLikePost.style.color = "black";
	}

	async render() {
		const that = this;

		setTimeout(() => {
			const btnComment = $(`.global_post-btn_comment-${this.data.postID}`);
			const btnLikePost = $(`#btnLikePost-${that.data.postID}`);

			const handleLikePostRequest = async () => {
				const url = "/SGU_SOCIAL_NETWORK/api/like_post/like";
				const send_data = {
					postID: that.data.postID,
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
									that.isLikePost = true;
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

			const handleDisLikePostRequest = async () => {
				const url = "/SGU_SOCIAL_NETWORK/api/like_post/dislike";
				const send_data = {
					postID: that.data.postID,
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
									that.isLikePost = false;
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

			if (btnLikePost)
				btnLikePost.onclick = async () => {
					if (!that.isLikePost) {
						await handleLikePostRequest().then(async () => {
							await that.fetchLikePost();
							if (that.listLikePost && that.listLikePost.length >= 0) {
								const countLike = $(`#global_post-total_love-${that.data.postID}`);

								countLike.innerHTML = that.listLikePost.length;
							} else {

							}
						});
						that.actionLike();
					} else {
						await handleDisLikePostRequest().then(async () => {
							await that.fetchLikePost();
							if (that.listLikePost && that.listLikePost.length >= 0) {
								const countLike = $(`#global_post-total_love-${that.data.postID}`);

								countLike.innerHTML = that.listLikePost.length;
							} else {

							}
						});
						that.actionDisLike();
					}
				}

			if (btnComment)
				btnComment.onclick = () => {
					const post = new PostDetail(that.data);

					post.render().then(data => {
						$("#showPostDetailGloabal").innerHTML = data
					})
				}
		})

		setTimeout(async () => {
			await that.fetchCheckLikePost().then(() => {
				if (that.isLikePost) {
					that.actionLike();
				}
			}).then(async () => {
				await that.fetchLikePost();
				if (that.listLikePost && that.listLikePost.length > 0) {
					const countLike = $(`#global_post-total_love-${that.data.postID}`);

					countLike.innerHTML = that.listLikePost.length;
				}
			});
		}, that.data.timeDelay * 2.9)

		return `
			<div class="wrapper_of_block ">
				<div class="global_post global_post-${that.data.postID}">
					<div class="global_post-header_post">
						<div class="global_post-logo_profile">
							<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.authorID}"><img
								src="${that.data.image}"
								alt="avata" /> </a>
						</div>
						<div class="global_post-header_content">
							<div>
								<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.authorID}"><p class="global_post-name_profile">${that.data.firstName + " " + that.data.lastName}</p> </a>
							</div>
							<div>
								<p class="global_post-time_post">
									<span>${that.data.createAt + "<span> </span> -"}</span><span class="global_post-status">Tất cả mọi người</span>
								</p>
							</div>
						</div>
						<div class="global_post-header_icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
								viewBox="0 0 20 20" fill="none">
				          		<path fill-rule="evenodd" clip-rule="evenodd"
									d="M12 10C12 10.5304 11.7893 11.0391 11.4142 11.4142C11.0391 11.7893 10.5304 12 10 12C9.46957 12 8.96086 11.7893 8.58578 11.4142C8.21071 11.0391 8 10.5304 8 10C8 9.46957 8.21071 8.96086 8.58578 8.58578C8.96086 8.21071 9.46957 8 10 8C10.5304 8 11.0391 8.21071 11.4142 8.58578C11.7893 8.96086 12 9.46957 12 10ZM18 10C18 10.5304 17.7893 11.0391 17.4142 11.4142C17.0391 11.7893 16.5304 12 16 12C15.4696 12 14.9609 11.7893 14.5858 11.4142C14.2107 11.0391 14 10.5304 14 10C14 9.46957 14.2107 8.96086 14.5858 8.58578C14.9609 8.21071 15.4696 8 16 8C16.5304 8 17.0391 8.21071 17.4142 8.58578C17.7893 8.96086 18 9.46957 18 10ZM6 10C6 10.5304 5.78929 11.0391 5.41422 11.4142C5.03914 11.7893 4.53043 12 4 12C3.46957 12 2.96086 11.7893 2.58578 11.4142C2.21071 11.0391 2 10.5304 2 10C2 9.46957 2.21071 8.96086 2.58578 8.58578C2.96086 8.21071 3.46957 8 4 8C4.53043 8 5.03914 8.21071 5.41422 8.58578C5.78929 8.96086 6 9.46957 6 10Z"
									fill="black" />
				        	</svg>
							<!--<svg style="margin-left: 16px" xmlns="http://www.w3.org/2000/svg"
								width="20" height="20" viewBox="0 0 20 20" fill="none">
					          <path
										d="M19.4081 3.41559C20.189 2.6347 20.189 1.36655 19.4081 0.585663C18.6272 -0.195221 17.359 -0.195221 16.5782 0.585663L10 7.17008L3.41559 0.59191C2.6347 -0.188974 1.36655 -0.188974 0.585663 0.59191C-0.195221 1.37279 -0.195221 2.64095 0.585663 3.42183L7.17008 10L0.59191 16.5844C-0.188974 17.3653 -0.188974 18.6335 0.59191 19.4143C1.37279 20.1952 2.64095 20.1952 3.42183 19.4143L10 12.8299L16.5844 19.4081C17.3653 20.189 18.6335 20.189 19.4143 19.4081C20.1952 18.6272 20.1952 17.359 19.4143 16.5782L12.8299 10L19.4081 3.41559Z"
										fill="black" />
					        </svg>-->
						</div>
					</div>
					<div class="global_post-content_post">
						<p>${that.data.content}</p>
						<div class="global_post-list_render_img">
							${that.data.image1.trim().length > 0 ? `<div class="global_post-list_render_img_item">
															<img alt="" src="${that.data.image1}"/>
														</div>` : ""}
							${that.data.image2.trim().length > 0 ? `<div class="global_post-list_render_img_item">
															<img alt="" src="${that.data.image2}"/>
														</div>` : ""}
							${that.data.image3.trim().length > 0 ? `<div class="global_post-list_render_img_item">
															<img alt="" src="${that.data.image3}"/>
														</div>` : ""}
							${that.data.image4.trim().length > 0 ? `<div class="global_post-list_render_img_item">
															<img alt="" src="${that.data.image4}"/>
														</div>` : ""}
						</div>
					</div>
					<div class="global_post-post_footer">
						<div class="global_post-footer_info">
							<div class="global_post-info_icon">
								<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
									<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" fill="#ee3939"/>
								</svg>
								<p id="global_post-total_love-${that.data.postID}" class="global_post-total_love countLikePost-${that.data.postID}">${that.data.likes}</p>
							</div>
							<div class="global_post-info_global_post-interact">
								<p class="global_post-total_comment">
									<span class="post_detail-count_replies-${that.data.postID}">${that.data.replies} </span><span>Bình luận</span>
								</p>
								<!--<p class="global_post-total_share">
									1 <span>Lượt chia sẻ</span>-->
								</p>
							</div>
						</div>
						<div class="global_post-interact">
							<div id="btnLikePost-${that.data.postID}" class="global_post-interact_child">
								<div id='wrapperLikePost-${that.data.postID}' class="global_post-info_icon-${that.data.postID}" style="
																						    display: flex;
																						    align-items: center;
																						    justify-content: center;
																						">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
										viewBox="0 0 18 18" fill="none">
							            <path
											d="M7.93828 16.4602L7.85039 16.3793L1.69102 10.6594C0.611719 9.65742 0 8.25117 0 6.77812V6.66211C0 4.18711 1.75781 2.06367 4.19062 1.59961C5.57578 1.33242 6.99258 1.65234 8.12109 2.44687C8.4375 2.67187 8.73281 2.93203 9 3.23086C9.14766 3.06211 9.30586 2.90742 9.47461 2.76328C9.60469 2.65078 9.73828 2.54531 9.87891 2.44687C11.0074 1.65234 12.4242 1.33242 13.8094 1.59609C16.2422 2.06015 18 4.18711 18 6.66211V6.77812C18 8.25117 17.3883 9.65742 16.309 10.6594L10.1496 16.3793L10.0617 16.4602C9.77344 16.7273 9.39375 16.8785 9 16.8785C8.60625 16.8785 8.22656 16.7309 7.93828 16.4602ZM8.40586 5.09765C8.3918 5.08711 8.38125 5.07305 8.3707 5.05898L7.74492 4.35586L7.74141 4.35234C6.9293 3.4418 5.70234 3.02695 4.50703 3.25547C2.86875 3.56836 1.6875 4.9957 1.6875 6.66211V6.77812C1.6875 7.78008 2.10586 8.73984 2.84063 9.42187L9 15.1418L15.1594 9.42187C15.8941 8.73984 16.3125 7.78008 16.3125 6.77812V6.66211C16.3125 4.99922 15.1312 3.56836 13.4965 3.25547C12.3012 3.02695 11.0707 3.44531 10.2621 4.35234C10.2621 4.35234 10.2621 4.35234 10.2586 4.35586C10.2551 4.35937 10.2586 4.35586 10.2551 4.35937L9.6293 5.0625C9.61875 5.07656 9.60469 5.08711 9.59414 5.10117C9.43594 5.25937 9.22148 5.34726 9 5.34726C8.77852 5.34726 8.56406 5.25937 8.40586 5.10117V5.09765Z"
											fill="black" />
							        </svg>
								</div>
								<p id="wrapperTextLikePost-${that.data.postID}" class="global_post-total_love-${that.data.postID}">Yêu thích</p>
							</div>
							<button
								class="global_post-interact_child global_post-btn_comment-${this.data.postID}" data_post_id="${this.data.postID}">
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
									viewBox="0 0 18 18" fill="none">
							            <g clip-path="url(#clip0_33_4072)">
							              <path
										d="M4.34523 13.7566C4.79875 13.4262 5.38586 13.3418 5.9132 13.5316C6.84484 13.8691 7.88898 14.0625 8.99992 14.0625C13.3839 14.0625 16.3124 11.2324 16.3124 8.4375C16.3124 5.64258 13.3839 2.8125 8.99992 2.8125C4.61594 2.8125 1.68742 5.64258 1.68742 8.4375C1.68742 9.5625 2.12336 10.6453 2.9425 11.5734C3.24484 11.9145 3.3925 12.3645 3.35734 12.8215C3.30812 13.4578 3.15695 14.0414 2.96008 14.5582C3.55773 14.2805 4.05343 13.9711 4.34523 13.7602V13.7566ZM0.745232 15.184C0.808513 15.0891 0.868279 14.9941 0.924529 14.8992C1.27609 14.3156 1.61008 13.5492 1.67687 12.6879C0.622185 11.4891 -8.04849e-05 10.023 -8.04849e-05 8.4375C-8.04849e-05 4.39805 4.02883 1.125 8.99992 1.125C13.971 1.125 17.9999 4.39805 17.9999 8.4375C17.9999 12.477 13.971 15.75 8.99992 15.75C7.69562 15.75 6.45812 15.525 5.34015 15.1207C4.92179 15.4266 4.23976 15.8449 3.43117 16.1965C2.90031 16.4285 2.29562 16.6395 1.66984 16.7625C1.64172 16.7695 1.61359 16.773 1.58547 16.7801C1.43078 16.8082 1.27961 16.8328 1.1214 16.8469C1.11437 16.8469 1.10383 16.8504 1.09679 16.8504C0.917498 16.868 0.738201 16.8785 0.558904 16.8785C0.330388 16.8785 0.126482 16.7414 0.0385914 16.5305C-0.0492992 16.3195 -8.04923e-05 16.0805 0.158123 15.9187C0.302263 15.7711 0.432341 15.6129 0.555388 15.4441C0.615154 15.3633 0.671404 15.2824 0.724138 15.2016C0.727654 15.1945 0.73117 15.191 0.734685 15.184H0.745232Z"
										fill="black" />
							            </g>
							            <defs>
							              <clipPath id="clip0_33_4072">
							                <rect width="18" height="18" fill="white" />
							              </clipPath>
							            </defs>
							    </svg>
								<p>Bình luận</p>
							</button>
							<!-- <div class="global_post-interact_child">
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
									viewBox="0 0 18 18" fill="none">
							            <g clip-path="url(#clip0_33_4074)">
							              <path
										d="M12.5 8.97891V8.4375V7.3125C12.5 7.00313 12.275 6.75 12 6.75H11H10.5H9.04688C7.45625 6.75 6.1125 7.92773 5.6625 9.54844C5.55937 9.21797 5.5 8.85234 5.5 8.4375C5.5 6.26133 7.06563 4.5 9 4.5H10.5H11H12C12.275 4.5 12.5 4.24687 12.5 3.9375V2.8125V2.27109L15.8125 5.625L12.5 8.97891ZM10.5 8.4375H11V10.125C11 10.7473 11.4469 11.25 12 11.25H12.1156C12.3625 11.25 12.6 11.148 12.7844 10.9617L17.1281 6.56367C17.3656 6.32461 17.5 5.98359 17.5 5.625C17.5 5.26641 17.3656 4.92539 17.1281 4.68633L12.8094 0.312891C12.6094 0.1125 12.3531 0 12.0844 0C11.4844 0 11 0.544922 11 1.21992V2.8125H10.5H9.5H9C6.2375 2.8125 4 5.32969 4 8.4375C4 10.5609 5.08125 11.9215 5.99687 12.6879C6.18125 12.8426 6.35625 12.9727 6.51875 13.0816C6.65625 13.1766 6.78438 13.2539 6.89062 13.3137C6.99687 13.3734 7.08437 13.4191 7.14687 13.4508C7.21562 13.4859 7.29063 13.5 7.36875 13.5H7.44688C7.75313 13.5 8.00313 13.2188 8.00313 12.8742C8.00313 12.6 7.8375 12.3574 7.64062 12.1887C7.62813 12.1781 7.61875 12.1711 7.60625 12.1605C7.55312 12.1219 7.5 12.0727 7.45 12.0164C7.425 11.9883 7.39687 11.9602 7.37187 11.925C7.34687 11.8898 7.32188 11.8582 7.29688 11.823C7.24062 11.7352 7.1875 11.6367 7.14062 11.5242C7.05937 11.3133 7.00625 11.0566 7.00625 10.7367C7.00625 9.46758 7.92188 8.43398 9.05313 8.43398H9.5H10.5V8.4375ZM2.25 1.125C1.00625 1.125 0 2.25703 0 3.65625V15.4688C0 16.868 1.00625 18 2.25 18H12.75C13.9937 18 15 16.868 15 15.4688V13.2188C15 12.7512 14.6656 12.375 14.25 12.375C13.8344 12.375 13.5 12.7512 13.5 13.2188V15.4688C13.5 15.9363 13.1656 16.3125 12.75 16.3125H2.25C1.83438 16.3125 1.5 15.9363 1.5 15.4688V3.65625C1.5 3.18867 1.83438 2.8125 2.25 2.8125H4.25C4.66563 2.8125 5 2.43633 5 1.96875C5 1.50117 4.66563 1.125 4.25 1.125H2.25Z"
										fill="black" />
							            </g>
							            <defs>
							              <clipPath id="clip0_33_4074">
							                <rect width="18" height="18" fill="white" />
							              </clipPath>
							            </defs>
							    </svg>
								<p>Chia sẻ</p>
							</div> -->
						</div>
					</div>
				</div>
			</div>

		`;
	}
}