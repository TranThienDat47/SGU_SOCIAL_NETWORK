<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@page import="com.util.CookieUtils"%>
<%@page
	import="java.util.Base64, java.nio.charset.StandardCharsets, java.net.URLDecoder"%>
<%@page import="java.util.List"%>


<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>
<%@page import="com.dao.FriendDAO"%>
<%@page import="com.model.FriendModel"%>


<%
String valueName = URLDecoder.decode(request.getParameter("name"), "UTF-8");
String valueAddress = URLDecoder.decode(request.getParameter("address"), "UTF-8");
String valueBiography = URLDecoder.decode(request.getParameter("biography"), "UTF-8");

String valueGender = request.getParameter("gender").equals("false") ? "Nữ" : "Nam";

String valueCreateAT = URLDecoder.decode(request.getParameter("createAT"), "UTF-8");

String valueBirthDate = request.getParameter("birth_date");
%>

<%
FriendDAO friendDAO = new FriendDAO();
List<FriendModel> listFriends = null;

listFriends = friendDAO.searchFriendOfUser(0, 6, Integer.parseInt(request.getParameter("id")),
		Integer.parseInt(CookieUtils.get("id", request)));

request.setAttribute("listFriends", listFriends);
request.setAttribute("userID", request.getParameter("id"));
%>

<div class="profile_user-container">
	<div class="profile_user-container_left">
		<div class="wrapper_of_block">

			<div class="profile_introduce">
				<h2>Giới thiệu</h2>
				<div class="name_introduce">
					<p><%=valueBiography%></p>
				</div>
				<div>
					<div class="profile_info">
						<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19"
							viewBox="0 0 13 19" fill="none">
			            	<path
								d="M7.30234 18.5731C9.03906 16.1845 13 10.3953 13 7.14349C13 3.19969 10.0885 0 6.5 0C2.91146 0 0 3.19969 0 7.14349C0 10.3953 3.96094 16.1845 5.69766 18.5731C6.11406 19.1423 6.88594 19.1423 7.30234 18.5731ZM6.5 4.76232C7.07464 4.76232 7.62574 5.0132 8.03207 5.45975C8.43839 5.9063 8.66667 6.51196 8.66667 7.14349C8.66667 7.77501 8.43839 8.38067 8.03207 8.82722C7.62574 9.27378 7.07464 9.52465 6.5 9.52465C5.92536 9.52465 5.37426 9.27378 4.96794 8.82722C4.56161 8.38067 4.33333 7.77501 4.33333 7.14349C4.33333 6.51196 4.56161 5.9063 4.96794 5.45975C5.37426 5.0132 5.92536 4.76232 6.5 4.76232Z"
								fill="black" />
			          	</svg>
						<p>
							Vị trí:
							<%=valueAddress%></p>
					</div>

					<div class="profile_info">
						<svg xmlns="http://www.w3.org/2000/svg" height="1em"
							viewBox="0 0 640 512">
							<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
							<path
								d="M176 288a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM352 176c0 86.3-62.1 158.1-144 173.1V384h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H208v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V448H112c-17.7 0-32-14.3-32-32s14.3-32 32-32h32V349.1C62.1 334.1 0 262.3 0 176C0 78.8 78.8 0 176 0s176 78.8 176 176zM271.9 360.6c19.3-10.1 36.9-23.1 52.1-38.4c20 18.5 46.7 29.8 76.1 29.8c61.9 0 112-50.1 112-112s-50.1-112-112-112c-7.2 0-14.3 .7-21.1 2c-4.9-21.5-13-41.7-24-60.2C369.3 66 384.4 64 400 64c37 0 71.4 11.4 99.8 31l20.6-20.6L487 41c-6.9-6.9-8.9-17.2-5.2-26.2S494.3 0 504 0H616c13.3 0 24 10.7 24 24V136c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L545 140.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176c-50.5 0-96-21.3-128.1-55.4z" /></svg>
						<p>
							Giới tính:
							<%=valueGender%></p>
					</div>

					<div class="profile_info">
						<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19"
							viewBox="0 0 19 19" fill="none">
			            	<path
								d="M4.07143 1.1875V2.375H2.03571C0.91183 2.375 0 3.17285 0 4.15625V5.9375H19V4.15625C19 3.17285 18.0882 2.375 16.9643 2.375H14.9286V1.1875C14.9286 0.530664 14.3221 0 13.5714 0C12.8208 0 12.2143 0.530664 12.2143 1.1875V2.375H6.78571V1.1875C6.78571 0.530664 6.17924 0 5.42857 0C4.6779 0 4.07143 0.530664 4.07143 1.1875ZM19 7.125H0V17.2188C0 18.2021 0.91183 19 2.03571 19H16.9643C18.0882 19 19 18.2021 19 17.2188V7.125Z"
								fill="black" />
			          	</svg>
						<p>
							Ngày sinh:
							<%=valueBirthDate%></p>
					</div>
					<div class="profile_info">
						<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19"
							viewBox="0 0 19 19" fill="none">
				            <path
								d="M9.5 0C12.0196 0 14.4359 1.00089 16.2175 2.78249C17.9991 4.56408 19 6.98044 19 9.5C19 12.0196 17.9991 14.4359 16.2175 16.2175C14.4359 17.9991 12.0196 19 9.5 19C6.98044 19 4.56408 17.9991 2.78249 16.2175C1.00089 14.4359 0 12.0196 0 9.5C0 6.98044 1.00089 4.56408 2.78249 2.78249C4.56408 1.00089 6.98044 0 9.5 0ZM8.60938 4.45312V9.5C8.60938 9.79688 8.75781 10.0752 9.00644 10.2422L12.5689 12.6172C12.9771 12.8918 13.5301 12.7805 13.8047 12.3686C14.0793 11.9566 13.968 11.4074 13.5561 11.1328L10.3906 9.025V4.45312C10.3906 3.95957 9.99356 3.5625 9.5 3.5625C9.00644 3.5625 8.60938 3.95957 8.60938 4.45312Z"
								fill="black" />
				          </svg>
						<p>
							Tham gia ngày:
							<%=valueCreateAT%></p>
					</div>
				</div>
			</div>
		</div>

		<!-- 		<div class="wrapper_of_block"> -->
		<!-- 			<div class="Profile_friend-component"> -->
		<!-- 				<div class="Profile_friend-header"> -->
		<!-- 					<div class="Profile_friend-title">Ảnh</div> -->
		<!-- 					<a class="Profile_friend-read-more" href="#">Xem thêm</a> -->
		<!-- 				</div> -->
		<!-- 				<div class="Profile_friend-images"> -->
		<!-- 					<div class="Profile_friend-image"></div> -->
		<!-- 					<div class="Profile_friend-image"></div> -->
		<!-- 					<div class="Profile_friend-image"></div> -->
		<!-- 					<div class="Profile_friend-image"></div> -->
		<!-- 					<div class="Profile_friend-image"></div> -->
		<!-- 					<div class="Profile_friend-image"></div> -->
		<!-- 					<div class="Profile_friend-image"></div> -->
		<!-- 					<div class="Profile_friend-image"></div> -->
		<!-- 					<div class="Profile_friend-image"></div> -->
		<!-- 				</div> -->
		<!-- 			</div> -->
		<!-- 		</div> -->

		<div class="wrapper_of_block">
			<div class="Profile_friend-component">
				<div class="Profile_friend-header">
					<div class="Profile_friend-title">Bạn bè</div>
					<a class="Profile_friend-read-more"
						href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=friend&id=<%=request.getParameter("id")%>">Xem
						thêm</a>
				</div>
				<div class="Profile_friend-images">




					<c:forEach var="friend" items="${listFriends}">
						<div class="Profile_friend-wrapper-friend">
							<a
								href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${Integer.parseInt(friend.userID) == Integer.parseInt(userID) ? friend.friendID : friend.userID }"><img
								class="Profile_friend-image" src="${friend.image}" alt="" /></a> <a
								href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${Integer.parseInt(friend.userID) == Integer.parseInt(userID) ? friend.friendID : friend.userID }"><div
									class="Profile_friend-name">${friend.firstName}
									${friend.lastName}</div></a>
						</div>
					</c:forEach>


				</div>
			</div>
		</div>
	</div>
	<div class="profile_user-container_right">
		<!-- 		<div class="wrapper_of_block"> -->
		<%-- 			<jsp:include page="../CreatePost.jsp"></jsp:include> --%>
		<!-- 		</div> -->

		<div id=render_list_post_profile_other_user></div>

		<script>
							window.onload = () => {
								new GloabPost().renderListPostProfileOtherUser(<%=request.getParameter("id")%>);
							}
		</script>
	</div>

</div>

<div id="showCreatePostGloabal" style="display: none;">
	<jsp:include page="../CreatePostAfter.jsp"></jsp:include>
</div>