<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/base.css" />

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/auth_user.css" />
</head>
<body>
	<div id="wrapper">
		<form id="form-login" method="post">
			<input type="hidden" name="action" value="forgotPassword" />

			<h1 class="form-heading">Quên mật khẩu</h1>
			<div class="form-group">
				<input id="email" class="form-input" type="email" name="email"
					placeholder="Email" value="${email}" />
			</div>
			<div id="message_response" style="color: #f75959;"></div>
			<button type="button" id="btnSubmitFormForgot"
				style="margin-top: 6px;" class="form-submit">Gửi lại mật
				khẩu</button>
			<br>
			<div class="form-bottom">
				<a class="form-register"
					href="/SGU_SOCIAL_NETWORK/AuthUser.jsp?page=login">Đăng nhập</a> /
				<a class="form-register"
					href="/SGU_SOCIAL_NETWORK/AuthUser.jsp?page=login">Đăng ký</a>
			</div>
		</form>
	</div>
</body>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/forgot_password.js"></script>
</html>