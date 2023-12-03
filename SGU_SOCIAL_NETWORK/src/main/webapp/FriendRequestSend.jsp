<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@page import="com.util.AuthorizationToken"%>
<%@page import="com.util.CookieUtils"%>


<%
String token = CookieUtils.getPlus("token", request);

if (!AuthorizationToken.authorizationToken(token)) {
	response.sendRedirect("AuthUser.jsp");
	return;
}
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Trang chủ</title>

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/base.css" />

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/post.css" />

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/notify.css" />

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/friend_request.css" />
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>

</head>
<body>
	<!-- 	Start Header -->
	<jsp:include page="./layout/Header.jsp"></jsp:include>
	<!-- 	End Header -->

	<!-- 	Start Sidebar left -->
	<jsp:include page="./layout/SidebarLeft.jsp"></jsp:include>
	<!-- 	End Sidebar leftr -->

	<!-- Start container -->
	<div id="global_container">
		<div class="wrapper_of_block">
			<div class="friend_request">
				<div class="friend_request-recommnend_header">
					<p class="friend_request-recommend_title">Yêu cầu kết bạn đã
						gửi</p>
				</div>
				<div id="wrapperFriendRequestRender"
					class="friend_request-recommend_member"></div>
			</div>
		</div>
	</div>
	<!-- End container -->


	<!-- 	Start Sidebar right -->
	<jsp:include page="./layout/SideBarRight.jsp"></jsp:include>
	<!-- 	End Sidebar right -->
</body>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/global.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/Search.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/main.js"></script>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/friend_request/FriendRequestSendItem.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/friend_request/friend_request_send.js"></script>

</html>