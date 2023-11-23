<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>

<%@page import="com.util.CookieUtils"%>
<%@page import="com.dao.FollowDAO, com.model.FollowModel"%>

<%
String cookieValueID = CookieUtils.get("id", request);
%>
<%
String cookieValue = CookieUtils.get("email", request);
List<FollowModel> lists = null;

if (cookieValue.length() <= 0) {
	response.sendRedirect("AuthUser.jsp");
} else {
	FollowDAO follows = new FollowDAO();

	lists = follows.searchUserFollow(0, 4, Integer.parseInt(cookieValueID));

	request.setAttribute("lists", lists);
}
%>

<div id="sidebar-left"
	style="width: 356px; position: fixed; margin-top: var(--height-default-header); top: 0; height: 100vh; background-color: #fff;">
	<div class="sidebar_left-wrapper">
		<div class="sidebar_left-top">
			<ul class="sidebar_left-menu">
				<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend"><li
					class="sidebar_left-menu-item"><i> <svg
								xmlns="http://www.w3.org/2000/svg" height="1em"
								viewBox="0 0 448 512">
                                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
									d="M224 256A128 128 0 1 0 224
                                    0a128 128 0 1 0 0 256zm-45.7
                                    48C79.8 304 0 383.8 0 482.3C0
                                    498.7 13.3 512 29.7
                                    512H418.3c16.4 0 29.7-13.3
                                    29.7-29.7C448 383.8 368.2 304
                                    269.7 304H178.3z" />
                                </svg>
					</i>
						<div>Hồ sơ</div></li></a>
				<a href="/SGU_SOCIAL_NETWORK/index.jsp?page=home"><li
					class="sidebar_left-menu-item"><i> <svg
								xmlns="http://www.w3.org/2000/svg" height="1em"
								viewBox="0 0 576
                                    512">
                                    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                    <path
									d="M575.8 255.5c0 18-15
                                        32.1-32 32.1h-32l.7 160.2c0
                                        2.7-.2 5.4-.5 8.1V472c0
                                        22.1-17.9 40-40 40H456c-1.1
                                        0-2.2 0-3.3-.1c-1.4 .1-2.8
                                        .1-4.2 .1H416 392c-22.1
                                        0-40-17.9-40-40V448
                                        384c0-17.7-14.3-32-32-32H256c-17.7
                                        0-32 14.3-32 32v64 24c0
                                        22.1-17.9 40-40 40H160
                                        128.1c-1.5
                                        0-3-.1-4.5-.2c-1.2 .1-2.4
                                        .2-3.6 .2H104c-22.1
                                        0-40-17.9-40-40V360c0-.9
                                        0-1.9 .1-2.8V287.6H32c-18
                                        0-32-14-32-32.1c0-9 3-17
                                        10-24L266.4 8c7-7 15-8
                                        22-8s15 2 21 7L564.8 231.5c8
                                        7 12 15 11 24z" />
                                    </svg>
					</i>
						<div>Trang chủ</div></li></a>
				<a
					href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=follow&id=<%=cookieValueID%>"><li
					class="sidebar_left-menu-item"><i><svg
								xmlns="http://www.w3.org/2000/svg" height="1em"
								viewBox="0 0 448 512">
								<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
								<path
									d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>
					</i>
						<div>Theo dõi</div></li></a>
				<a
					href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=friend&id=<%=cookieValueID%>"><li
					class="sidebar_left-menu-item"><i> <svg
								xmlns="http://www.w3.org/2000/svg" height="1em"
								viewBox="0
                                            0
                                            640
                                            512">
                                            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                            <path
									d="M96 128a128 128 0
                                                1 1
                                                256
                                                0A128 128 0 1 1 96
                                                128zM0
                                                482.3C0 383.8 79.8
                                                304
                                                178.3
                                                304h91.4C368.2 304
                                                448
                                                383.8
                                                448 482.3c0
                                                16.4-13.3
                                                29.7-29.7
                                                29.7H29.7C13.3
                                                512
                                                0 498.7 0
                                                482.3zM609.3
                                                512H471.4c5.4-9.4
                                                8.6-20.3
                                                8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1
                                                4.7-.2
                                                7.1-.2h61.4C567.8
                                                320
                                                640 392.2 640
                                                481.3c0
                                                17-13.8 30.7-30.7
                                                30.7zM432
                                                256c-31
                                                0-59-12.6-79.3-32.9C372.4
                                                196.5 384 163.6 384
                                                128c0-26.8-6.6-52.1-18.3-74.3C384.3
                                                40.1 407.2 32 432
                                                32c61.9 0
                                                112 50.1 112
                                                112s-50.1
                                                112-112 112z" />
                                            </svg>
					</i>
						<div>Bạn bè</div></li></a>

				<a href="/SGU_SOCIAL_NETWORK/FriendRequest.jsp"><li
					class="sidebar_left-menu-item"><i><svg
								xmlns="http://www.w3.org/2000/svg" height="1em"
								viewBox="0 0 640 512">
								<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
								<path
									d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg></i>
						<div>Lời mời kết bạn</div></li></a>

				<a href="/SGU_SOCIAL_NETWORK/FriendRequestSend.jsp"><li
					class="sidebar_left-menu-item"><i> <svg
								xmlns="http://www.w3.org/2000/svg" height="1em"
								viewBox="0 0 640 512">
								<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
								<path
									d="M224 0a128 128 0 1 1 0 256A128 128 0 1 1 224 0zM178.3 304h91.4c20.6 0 40.4 3.5 58.8 9.9C323 331 320 349.1 320 368c0 59.5 29.5 112.1 74.8 144H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM352 368a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-80c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H512V304c0-8.8-7.2-16-16-16z" /></svg>
					</i>
						<div>Yêu cầu kết bạn đã gửi</div></li></a>
			</ul>
		</div>

		<div class="sidebar_left-center">
			<div class="sidebar_left-follow-section">
				<p class="sidebar_left-follow-heading">Đang theo dõi</p>
				<a
					href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=follow&id=<%=cookieValueID%>"><span
					class="sidebar_left-view-more">Xem thêm</span></a>
			</div>


			<c:forEach var="item" items="${lists}">
				<a
					href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${item.followID}">
					<div class="sidebar_left-user-profile">
						<div class="sidebar_left-profile-image">
							<img src="${item.image}" alt="" />
						</div>
						<div class="sidebar_left-profile-info">
							<p class="sidebar_left-user-name">${item.firstName}
								${item.lastName}</p>
							<span class="sidebar_left-user-status">${item.coutRoomate}
								bạn chung</span>
						</div>
					</div>
				</a>


			</c:forEach>

			<!-- <div class="Profile_friend-wrapper-friend"> -->
			<!-- 					<img -->
			<!-- 						class="Profile_friend-image" src="" alt="" /></a> <a -->
			<%-- 						href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${Integer.parseInt(friend.userID) == Integer.parseInt(userID) ? friend.friendID : friend.userID }"><div --%>
			<!-- 							class="Profile_friend-name"> -->
			<!-- 							</div></a> -->
			<!-- 				</div> -->

			<!-- 			<div class="sidebar_left-user-profile"> -->
			<!-- 				<div class="sidebar_left-profile-image"> -->
			<!-- 					<img -->
			<%-- 						src="${pageContext.request.contextPath}/assets/images/logo.png" --%>
			<!-- 						alt="" /> -->
			<!-- 				</div> -->
			<!-- 				<div class="sidebar_left-profile-info"> -->
			<!-- 					<p class="sidebar_left-user-name">Nam Văn</p> -->
			<!-- 					<span class="sidebar_left-user-status">Đang theo dõi</span> -->
			<!-- 				</div> -->
			<!-- 			</div> -->
			<!-- 			<div class="sidebar_left-user-profile"> -->
			<!-- 				<div class="sidebar_left-profile-image"> -->
			<!-- 					<img -->
			<%-- 						src="${pageContext.request.contextPath}/assets/images/logo.png" --%>
			<!-- 						alt="" /> -->
			<!-- 				</div> -->
			<!-- 				<div class="sidebar_left-profile-info"> -->
			<!-- 					<p class="sidebar_left-user-name">Nam Văn</p> -->
			<!-- 					<span class="sidebar_left-user-status">Bạn bè</span> -->
			<!-- 				</div> -->
			<!-- 			</div> -->
			<!-- 			<div class="sidebar_left-user-profile"> -->
			<!-- 				<div class="sidebar_left-profile-image"> -->
			<!-- 					<img -->
			<%-- 						src="${pageContext.request.contextPath}/assets/images/logo.png" --%>
			<!-- 						alt="" /> -->
			<!-- 				</div> -->
			<!-- 				<div class="sidebar_left-profile-info"> -->
			<!-- 					<p class="sidebar_left-user-name">Nam Văn</p> -->
			<!-- 					<span class="sidebar_left-user-status">Bạn bè</span> -->
			<!-- 				</div> -->
			<!-- 			</div> -->
		</div>

		<div class="sidebar_left-bottom">
			<div class="sidebar_left-create-post">
				<button class="btn sidebar_left-create-post-button">Tạo bài
					viết</button>
			</div>
		</div>
	</div>
</div>
<div class="toolkit_message-wrapper"></div>

