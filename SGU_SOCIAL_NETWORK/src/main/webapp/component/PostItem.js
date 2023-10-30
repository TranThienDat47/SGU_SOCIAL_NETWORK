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
	}) {
		this.data = data;
	}

	//	async addEnvent() {
	//		let intervalID = null;
	//		const that = this;
	//
	//		intervalID = setInterval(() => {
	//			const btnComment = $(`.global_post-btn_comment-${this.data.postID}`);
	//
	//			if (btnComment) {
	//
	//				clearInterval(intervalID);
	//			}
	//		}, 9)
	//	}

	async render() {
		const that = this;
		console.log(that.data)

		setTimeout(() => {
			const btnComment = $(`.global_post-btn_comment-${this.data.postID}`);

			//			const url = "/SGU_SOCIAL_NETWORK/api/post";
			//			const send_data = {
			//				action: "getOnePost",
			//				postID: that.data.postID,
			//			};

			btnComment.onclick = () => {
				const post = new PostDetail(that.data);

				post.render().then(data => {
					$("#showPostDetailGloabal").innerHTML = data
				})

				//				const xhr = new XMLHttpRequest();
				//				xhr.open("POST", url, true)
				//				xhr.setRequestHeader("Content-Type", "application/json");
				//
				//				xhr.onreadystatechange = function() {
				//					if (xhr.readyState === 4) {
				//						if (xhr.status === 200) {
				//							try {
				//								const data = JSON.parse(xhr.responseText);
				//								tempPostDetail = data;
				//
				//								const post = new PostDetail({ id: that.data.postID });
				//
				//								post.render().then(data => {
				//									$("#showPostDetailGloabal").innerHTML = data
				//								})
				//
				//
				//							} catch (error) {
				//								console.log("JSON parsing error:", error);
				//							}
				//						} else {
				//							console.log("Request failed with status:", xhr.status);
				//						}
				//					}
				//				}
				//
				//				xhr.send(JSON.stringify(send_data));
			}
		})

		return `
			<div class="wrapper_of_block ">
				<div class="global_post global_post-${this.data.postID}">
					<div class="global_post-header_post">
						<div class="global_post-logo_profile">
							<img
								src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg"
								alt="avata" />
						</div>
						<div class="global_post-header_content">
							<div>
								<p class="global_post-name_profile">Những câu chuyện thú vị</p>
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
							<svg style="margin-left: 16px" xmlns="http://www.w3.org/2000/svg"
								width="20" height="20" viewBox="0 0 20 20" fill="none">
				          <path
									d="M19.4081 3.41559C20.189 2.6347 20.189 1.36655 19.4081 0.585663C18.6272 -0.195221 17.359 -0.195221 16.5782 0.585663L10 7.17008L3.41559 0.59191C2.6347 -0.188974 1.36655 -0.188974 0.585663 0.59191C-0.195221 1.37279 -0.195221 2.64095 0.585663 3.42183L7.17008 10L0.59191 16.5844C-0.188974 17.3653 -0.188974 18.6335 0.59191 19.4143C1.37279 20.1952 2.64095 20.1952 3.42183 19.4143L10 12.8299L16.5844 19.4081C17.3653 20.189 18.6335 20.189 19.4143 19.4081C20.1952 18.6272 20.1952 17.359 19.4143 16.5782L12.8299 10L19.4081 3.41559Z"
									fill="black" />
				        </svg>
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
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
									viewBox="0 0 18 18" fill="none">
								            <g clip-path="url(#clip0_33_4025)">
								              <g filter="url(#filter0_i_33_4025)">
								                <path
										d="M9 0C6.61305 0 4.32387 0.948212 2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9C0 11.3869 0.948212 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948212 11.3869 0 9 0V0Z"
										fill="#FF9292" />
								              </g>
								              <path
										d="M8.41016 13.7279L8.36133 13.6753L4.93945 9.95452C4.33984 9.30276 4 8.38801 4 7.42981V7.35435C4 5.74439 4.97656 4.36312 6.32812 4.06125C7.09766 3.88745 7.88477 4.09555 8.51172 4.61239C8.6875 4.75875 8.85156 4.92797 9 5.12236C9.08203 5.01259 9.16992 4.91197 9.26367 4.8182C9.33594 4.74503 9.41016 4.67642 9.48828 4.61239C10.1152 4.09555 10.9023 3.88745 11.6719 4.05896C13.0234 4.36083 14 5.74439 14 7.35435V7.42981C14 8.38801 13.6602 9.30276 13.0605 9.95452L9.63867 13.6753L9.58984 13.7279C9.42969 13.9017 9.21875 14 9 14C8.78125 14 8.57031 13.904 8.41016 13.7279ZM8.66992 6.33669C8.66211 6.32983 8.65625 6.32068 8.65039 6.31153L8.30273 5.85416L8.30078 5.85187C7.84961 5.25957 7.16797 4.98972 6.50391 5.13837C5.59375 5.3419 4.9375 6.27037 4.9375 7.35435V7.42981C4.9375 8.08157 5.16992 8.70589 5.57813 9.14954L9 12.8703L12.4219 9.14954C12.8301 8.70589 13.0625 8.08157 13.0625 7.42981V7.35435C13.0625 6.27266 12.4062 5.3419 11.498 5.13837C10.834 4.98972 10.1504 5.26186 9.70117 5.85187C9.70117 5.85187 9.70117 5.85187 9.69922 5.85416C9.69727 5.85645 9.69922 5.85416 9.69727 5.85645L9.34961 6.31382C9.34375 6.32297 9.33594 6.32983 9.33008 6.33898C9.24219 6.44189 9.12305 6.49906 9 6.49906C8.87695 6.49906 8.75781 6.44189 8.66992 6.33898V6.33669Z"
										fill="white" />
								            </g>
								            <defs>
								              <filter id="filter0_i_33_4025" x="0" y="-1"
										width="18" height="19" filterUnits="userSpaceOnUse"
										color-interpolation-filters="sRGB">
								                <feFlood flood-opacity="0"
										result="BackgroundImageFix" />
								                <feBlend mode="normal" in="SourceGraphic"
										in2="BackgroundImageFix" result="shape" />
								                <feColorMatrix in="SourceAlpha" type="matrix"
										values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
										result="hardAlpha" />
								                <feOffset dy="-1" />
								                <feGaussianBlur stdDeviation="1" />
								                <feComposite in2="hardAlpha"
										operator="arithmetic" k2="-1" k3="1" />
								                <feColorMatrix type="matrix"
										values="0 0 0 0 0 0 0 0 0 0.299356 0 0 0 0 0.681188 0 0 0 0.349568 0" />
								                <feBlend mode="normal" in2="shape"
										result="effect1_innerShadow_33_4025" />
								              </filter>
								              <clipPath id="clip0_33_4025">
								                <rect width="18" height="18" fill="white" />
								              </clipPath>
								            </defs>
			          			</svg>
								<p class="global_post-total_love">${that.data.likes}</p>
							</div>
							<div class="global_post-info_global_post-interact">
								<p class="global_post-total_comment">
									${that.data.replies} <span>Bình luận</span>
								</p>
								<!--<p class="global_post-total_share">
									1 <span>Lượt chia sẻ</span>-->
								</p>
							</div>
						</div>
						<div class="global_post-interact">
							<div class="global_post-interact_child">
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
									viewBox="0 0 18 18" fill="none">
						            <path
										d="M7.93828 16.4602L7.85039 16.3793L1.69102 10.6594C0.611719 9.65742 0 8.25117 0 6.77812V6.66211C0 4.18711 1.75781 2.06367 4.19062 1.59961C5.57578 1.33242 6.99258 1.65234 8.12109 2.44687C8.4375 2.67187 8.73281 2.93203 9 3.23086C9.14766 3.06211 9.30586 2.90742 9.47461 2.76328C9.60469 2.65078 9.73828 2.54531 9.87891 2.44687C11.0074 1.65234 12.4242 1.33242 13.8094 1.59609C16.2422 2.06015 18 4.18711 18 6.66211V6.77812C18 8.25117 17.3883 9.65742 16.309 10.6594L10.1496 16.3793L10.0617 16.4602C9.77344 16.7273 9.39375 16.8785 9 16.8785C8.60625 16.8785 8.22656 16.7309 7.93828 16.4602ZM8.40586 5.09765C8.3918 5.08711 8.38125 5.07305 8.3707 5.05898L7.74492 4.35586L7.74141 4.35234C6.9293 3.4418 5.70234 3.02695 4.50703 3.25547C2.86875 3.56836 1.6875 4.9957 1.6875 6.66211V6.77812C1.6875 7.78008 2.10586 8.73984 2.84063 9.42187L9 15.1418L15.1594 9.42187C15.8941 8.73984 16.3125 7.78008 16.3125 6.77812V6.66211C16.3125 4.99922 15.1312 3.56836 13.4965 3.25547C12.3012 3.02695 11.0707 3.44531 10.2621 4.35234C10.2621 4.35234 10.2621 4.35234 10.2586 4.35586C10.2551 4.35937 10.2586 4.35586 10.2551 4.35937L9.6293 5.0625C9.61875 5.07656 9.60469 5.08711 9.59414 5.10117C9.43594 5.25937 9.22148 5.34726 9 5.34726C8.77852 5.34726 8.56406 5.25937 8.40586 5.10117V5.09765Z"
										fill="black" />
						        </svg>
								<p>Yêu thích</p>
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