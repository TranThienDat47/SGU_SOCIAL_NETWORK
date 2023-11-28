<%@page import="com.util.CookieUtils"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>
<%@page import="com.dao.FriendDAO"%>
<%@page import="com.model.FriendModel"%>
<%@page import="com.dao.UserDAO, com.model.UserModel"%>


<%
String cookieValue = CookieUtils.get("email", request);
List<FriendModel> listFriends = null;
List<UserModel> lists = null;

if (cookieValue.length() <= 0) {
	response.sendRedirect("AuthUser.jsp");
} else {
	String cookieValueID = CookieUtils.get("id", request);

	FriendDAO friendDAO = new FriendDAO();

	listFriends = friendDAO.searchFriendOfUser(0, 6, Integer.parseInt(cookieValueID), Integer.parseInt(cookieValueID));

	request.setAttribute("listFriends", listFriends);
	request.setAttribute("userID", cookieValueID);

	UserDAO users = new UserDAO();

	lists = users.recommendFriend(0, 4, Integer.parseInt(cookieValueID));

	request.setAttribute("lists", lists);
}
%>

<div id="sidebar-right"
	style="width: 356px; position: fixed; margin-top: var(--height-default-header); right: 0px; top: 0; padding-right: 10px; height: 100vh; background-color: #fff;">
	<div class="sidebar_right-top" style="margin-top: 16px;">
		<div class="sidebar_left-follow-section">
			<p class="sidebar_left-follow-heading">Gợi ý kết bạn</p>
			<a href="/SGU_SOCIAL_NETWORK/RecommendFriend.jsp"><span
				class="sidebar_left-view-more">Xem thêm</span></a>
		</div>

		<c:forEach var="item" items="${lists}">
			<div class="sidebar_left-user-profile">
				<div class="sidebar_left-profile-image">
					<a
						href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${item.id}"><img
						src="${item.image}" alt=""></a>
				</div>
				<a
					href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${item.id}">
					<div class="sidebar_left-profile-info">
						<p class="sidebar_left-user-name">${item.firstName}
							${item.lastName}</p>
						<span class="sidebar_left-user-status">${item.countRoomate}
							bạn chung</span>
					</div>
				</a>
				<div class="sidebar_right-action-buttons">
					<button data-id="${item.id}" id="btnRecommendFriendHome"
						class="btn btnRecommendFriendHome">Thêm bạn bè</button>
				</div>
			</div>
		</c:forEach>

		<!-- 		<div class="sidebar_left-user-profile"> -->
		<!-- 			<div class="sidebar_left-profile-image"> -->
		<%-- 				<img src="${pageContext.request.contextPath}/assets/images/logo.png" --%>
		<!-- 					alt=""> -->
		<!-- 			</div> -->
		<!-- 			<div class="sidebar_left-profile-info"> -->
		<!-- 				<p class="sidebar_left-user-name">Nam Văn</p> -->
		<!-- 				<span class="sidebar_left-user-status">Bạn bè</span> -->
		<!-- 			</div> -->
		<!-- 			<div class="sidebar_right-action-buttons"> -->
		<!-- 				<button class="btn">Thêm bạn bè</button> -->
		<!-- 			</div> -->
		<!-- 		</div> -->

	</div>

	<div class="sidebar_right-bottom">

		<div class="sidebar_left-follow-section">
			<p class="sidebar_left-follow-heading">Bạn bè</p>
		</div>

		<c:forEach var="friend" items="${listFriends}">
			<a
				href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${Integer.parseInt(friend.userID) == Integer.parseInt(userID) ? friend.friendID : friend.userID }">
				<div class="sidebar_left-user-profile">
					<div class="sidebar_left-profile-image">
						<img src="${friend.image}" alt="">
					</div>
					<div class="sidebar_left-profile-info">
						<p class="sidebar_left-user-name">${friend.firstName}
							${friend.lastName}</p>
					</div>
				</div>
			</a>
		</c:forEach>
	</div>
</div>

<script type="text/javascript">
		setTimeout(async () => {
			await new RecommendFriendHome().render();
		}, 1000)
</script>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/recommentFriendHome.js"></script>
