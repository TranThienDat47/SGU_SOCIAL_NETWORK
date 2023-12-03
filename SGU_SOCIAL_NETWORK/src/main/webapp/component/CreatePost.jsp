<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@page import="com.util.CookieUtils"%>


<%
// String originalDataImg = CookieUtils.get("image", request);

String fullName = CookieUtils.get("firstName", request) + " " + CookieUtils.get("lastName", request);
%>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/create_post.css" />

<script
	src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
</head>
<body>
	<div class="create_post-content-wrapper">
		<div class="create_post-content-wrapper-title">
			<div class="sidebar_left-user-profile">
				<div class="sidebar_left-profile-image">
					<img class="globalImageOfUser" src="" alt="avata" />
				</div>
				<div class="create_post-profile-name">
					<p><%=fullName%></p>
				</div>
				<div class="create_post-profile-select"
					id="create_post-profile-select_before">
					<select>
						<option>Tất cả mọi người</option>
						<option>Bạn bè</option>
						<option>Chỉ mình tôi</option>
					</select>
				</div>
			</div>
			<div class="create_post-content-wrapper-text">
				<div contenteditable="true" id="create_post-content_before"
					class="create_post-content"></div>
			</div>

		</div>
	</div>
</body>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/renderImageAndBackground.js"></script>

</html>