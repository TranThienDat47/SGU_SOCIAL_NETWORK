<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/create_post.css" />
</head>
<body>
	<div class="create_post-content-wrapper">
		<div class="create_post-content-wrapper-title">
			<div class="sidebar_left-user-profile">
				<div class="sidebar_left-profile-image">
					<img
						src="https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg"
						alt="" />
				</div>
				<div class="create_post-profile-name">
					<p>Tú Tài</p>
				</div>
				<div class="create_post-profile-select">
					<select>
						<option>Tất cả mọi người</option>
						<option>Bạn bè</option>
						<option>Chỉ mình tôi</option>
					</select>
				</div>
			</div>
			<div class="create_post-content-wrapper-text">
				<div contenteditable="true" id="create_post-content"></div>
			</div>

			<div class="create_post-list_image">
				<div id="create_post-list_image_inner"></div>
				<!-- 				<div class="create_post-add_image"> -->
				<!-- 					<button class="create_post-delete_image"> -->
				<!-- 						<svg xmlns="http://www.w3.org/2000/svg" height="1em" -->
				<!-- 							viewBox="0 0 384 512"> -->
				<!-- 									! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
				<!-- 									<path -->
				<!-- 								d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg> -->
				<!-- 					</button> -->
				<!-- 					<img alt="anh" -->
				<!-- 						src="https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg"> -->
				<!-- 				</div> -->

				<div id="create_post-add_image" class="create_post-add_image">
					<div class="create_post-icon">
						<svg xmlns="http://www.w3.org/2000/svg" height="1em"
							viewBox="0 0 448 512">
									<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
									<path
								d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
					</div>
					<div class="create_post-title">Thêm ảnh</div>
					<input name="create_post_photo_file" id="create_post-upload_file"
						type="file" accept=".png, .jpg, .jpeg" style="visibility: hidden" />
				</div>
			</div>

			<div class="create_post-post-editor">
				<div class="create_post-editor-icons">
					<div class="create_post-icon-group">
						<p>Thêm vào bài viết của bạn:</p>
						<div id="create_post-btn_add_img">
							<svg style="fill: green" xmlns="http://www.w3.org/2000/svg"
								height="1em" viewBox="0 0 576 512">
					                  <path
									d="M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z" />
					                </svg>
						</div>
						<div>
							<svg style="fill: orange" xmlns="http://www.w3.org/2000/svg"
								height="1em" viewBox="0 0 512 512">
					                  <path
									d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
					                </svg>
						</div>
						<div>
							<svg style="fill: blue" xmlns="http://www.w3.org/2000/svg"
								height="1em" viewBox="0 0 640 512">
					                  <path
									d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c10 0 18.8-4.9 24.2-12.5l-99.2-99.2c-14.9-14.9-23.3-35.1-23.3-56.1v-33c-15.9-4.7-32.8-7.2-50.3-7.2H178.3zM384 224c-17.7 0-32 14.3-32 32v82.7c0 17 6.7 33.3 18.7 45.3L478.1 491.3c18.7 18.7 49.1 18.7 67.9 0l73.4-73.4c18.7-18.7 18.7-49.1 0-67.9L512 242.7c-12-12-28.3-18.7-45.3-18.7H384zm24 80a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
					                </svg>
						</div>
					</div>
				</div>
				<div class="create_post-submit-button">
					<button class="btn create_post-submit-btn">Đăng</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>