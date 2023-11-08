<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.util.CookieUtils"%>


<%
String originalDataImg = CookieUtils.get("image", request);

String fullName = CookieUtils.get("firstName", request) + " " + CookieUtils.get("lastName", request);

String queryString = request.getQueryString();
String currentURL = request.getRequestURI();

if (queryString != null && !queryString.isEmpty()) {
	currentURL += "?" + queryString;
}
String tab1URL = "/SGU_SOCIAL_NETWORK/";
String tab1_1URL = "/SGU_SOCIAL_NETWORK/index.jsp?page=home";
String tab2URL = "/SGU_SOCIAL_NETWORK/index.jsp?page=follow";
String tab3URL = "/SGU_SOCIAL_NETWORK/index.jsp?page=recommend";
%>


<div id="global_header">
	<div class="header_left">
		<a href="${pageContext.request.contextPath}/"><img alt="Logo SGU"
			src="${pageContext.request.contextPath}/assets/images/logo.png"
			class="header_logo"></a>

		<button class="header_btn_clear">
			<svg xmlns="http://www.w3.org/2000/svg" height="1em"
				viewBox="0 0 384 512">
					<path
					d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
		</button>

		<div class="header_wrapper_search">
			<div class="header_search">
				<input class="header_search_input" type="text"
					placeholder="Tìm kiếm" name="txtSearch" vlaue="" />
				<button class="header_search_btn">
					<svg xmlns="http://www.w3.org/2000/svg" height="1em"
						viewBox="0 0 512 512">
						<path
							d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
				</button>
			</div>
		</div>
		<div class="header_search_result-wrapper"></div>
	</div>

	<div class="header_center">
		<div class="header_center-list"
			style="display: flex; width: 100%; justify-content: space-evenly;">
			<a href="/SGU_SOCIAL_NETWORK/index.jsp?page=home"
				class="header_center-item <%=currentURL.trim().equals(tab1URL.trim()) || currentURL.trim().equals(tab1_1URL.trim()) ? "header_active" : ""%>">
				<div>Trang chủ</div>
			</a> <a href="/SGU_SOCIAL_NETWORK/index.jsp?page=follow"
				class="header_center-item <%=currentURL.trim().equals(tab2URL.trim()) ? "header_active" : ""%>">
				<div>Theo dõi</div>
			</a> <a href="/SGU_SOCIAL_NETWORK/index.jsp?page=recommend"
				class="header_center-item <%=currentURL.trim().equals(tab3URL.trim()) ? "header_active" : ""%>">
				<div>Gợi ý</div>
			</a>
		</div>
	</div>

	<div class="header_right">
		<div class="header_list-action">

			<div class="header_item-action header_item-action_notify">
				<button id="btnShowNotify" class="btn " style="padding: 9px;">
					<div class="icon" style="margin: 0;">
						<svg xmlns="http://www.w3.org/2000/svg" height="1em"
							viewBox="0 0 448 512">
								<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
								<path
								d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" /></svg>
					</div>
				</button>

				<div class="box_notify">
					<div class="notify_header">
						<h2>Thông báo</h2>
					</div>
					<div class="notify_content">
						<div class="notify_content_child">
							<img
								src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"
								alt="" />
							<div class="child_content">
								<p>Ai đó đã bình luận bài viết của bạn: "Bạn ở đâu "</p>
							</div>
						</div>
						<div class="notify_content_child">
							<img
								src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"
								alt="" />
							<div class="child_content">
								<p>Ai đó đã bình luận bài viết của bạn: "Tôi yêu bạn "</p>
							</div>
						</div>
						<div class="notify_content_child">
							<img
								src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"
								alt="" />
							<div class="child_content">
								<p>Ai đó đã thích bài viết của bạn</p>
							</div>
						</div>
						<div class="notify_content_child">
							<img
								src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"
								alt="" />
							<div class="child_content">
								<p>Ai đó đã bình luận bài viết của bạn: "Bạn ở đâu "</p>
							</div>
						</div>
						<div class="notify_content_child">
							<img
								src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"
								alt="" />
							<div class="child_content">
								<p>Ai đó đã bình luận bài viết của bạn: "Tôi yêu bạn "</p>
							</div>
						</div>
						<div class="notify_content_child">
							<img
								src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"
								alt="" />
							<div class="child_content">
								<p>Ai đó đã thích bài viết của bạn</p>
							</div>
						</div>
						<div class="notify_content_child">
							<img
								src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"
								alt="" />
							<div class="child_content">
								<p>Ai đó đã bình luận bài viết của bạn: "Bạn ở đâu "</p>
							</div>
						</div>
						<div class="notify_content_child">
							<img
								src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"
								alt="" />
							<div class="child_content">
								<p>Ai đó đã bình luận bài viết của bạn: "Tôi yêu bạn "</p>
							</div>
						</div>
						<div class="notify_content_child">
							<img
								src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"
								alt="" />
							<div class="child_content">
								<p>Ai đó đã thích bài viết của bạn</p>
							</div>
						</div>
						<div class="notify_content_child">
							<img
								src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"
								alt="" />
							<div class="child_content">
								<p>Ai đó đã bình luận bài viết của bạn: "Bạn ở đâu "</p>
							</div>
						</div>
						<div class="notify_content_child">
							<img
								src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"
								alt="" />
							<div class="child_content">
								<p>Ai đó đã bình luận bài viết của bạn: "Tôi yêu bạn "</p>
							</div>
						</div>
						<div class="notify_content_child">
							<img
								src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"
								alt="" />
							<div class="child_content">
								<p>Ai đó đã thích bài viết của bạn</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="header_item-action">
				<button class="btn " style="padding: 9px;">
					<div class="icon" style="margin: 0;">
						<svg xmlns="http://www.w3.org/2000/svg" height="1em"
							viewBox="0 0 512 512">
								<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
								<path
								d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" /></svg>
					</div>
				</button>
			</div>

			<div class="header_item-action header_item-action-setting">
				<button id="btnHeaderShowSetting" class="btn "
					style="padding: 0; width: 35.6px; height: 35.6px">
					<div class="icon"
						style="margin: 0; border-radius: 999px; overflow: hidden">
						<img style="width: 35.6px; height: 35.6px;"
							src="<%=originalDataImg%>" alt="" />
					</div>

					<div class="user_setting-box_setting">
						<div class="user_setting-setting_header">
							<div class="user_setting-img_profile">
								<img src="<%=originalDataImg%>" alt="" />
							</div>
							<div class="user_setting-setting_name">
								<p><%=fullName%></p>
							</div>
						</div>
						<hr />
						<div class="user_setting-setting_content">
							<div class="user_setting-setting_child">
								<div class="user_setting-img_setting user_setting-screen"></div>
								<div class="user_setting-setting_name">
									<p>Màn hình & trợ năng</p>
								</div>
							</div>
							<a href="/SGU_SOCIAL_NETWORK/Logout.jsp">
								<div class="user_setting-setting_child">
									<div class="user_setting-img_setting user_setting-logout"></div>
									<div class="user_setting-setting_name">
										<p>Đăng xuất</p>
									</div>
								</div>
							</a>
						</div>
					</div>
				</button>
			</div>
		</div>
	</div>
</div>