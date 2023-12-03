<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.util.Arrays"%>
<%@page import="com.util.CookieUtils"%>
<%@ page import="java.net.URLDecoder, java.nio.charset.StandardCharsets"%>
<%@page import="com.util.AuthorizationToken"%>


<%
String token = CookieUtils.getPlus("token", request);

if (AuthorizationToken.authorizationToken(token)) {
	response.sendRedirect("index.jsp");
	return;
}

%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>SGU Social Network</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/base.css" />

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/auth_user.css" />
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
</head>
<body>
	<div id="wrapper">
		<form id="form-login" method="post" action="auth">
			<input type="hidden" name="action" value="login" />

			<h1 class="form-heading">Đăng nhập</h1>
			<div style="color: #e03e3e;">${message}</div>
			<div class="form-group">
				<i class="fa-solid fa-user"></i> <input class="form-input"
					type="email" name="email" placeholder="Email" value="${email}" />
			</div>
			<div class="form-group">
				<i class="fa-solid fa-key"></i> <input class="form-input"
					type="password" name="password" placeholder="Mật khẩu"
					value="${password}" />
				<div id="eye">
					<i class="fa-regular fa-eye"></i>
				</div>
			</div>
			<a href="/SGU_SOCIAL_NETWORK/ForgotPassword.jsp"
				style="color: #bafb00;">Quên mật khẩu?</a> <input type="submit"
				value="Đăng nhập" class="form-submit" /> <br>
			<div class="form-bottom">
				<a class="form-register"
					href="/SGU_SOCIAL_NETWORK/AuthUser.jsp?page=register">Đăng ký</a>
			</div>
		</form>

		<form id="form-register" method="post" action="auth">
			<input type="hidden" name="action" value="register" />
			<h1 class="form-heading-register">Đăng ký tài khoản</h1>
			<div class="form-group-register">
				<p class="form-text">First name</p>
				<input class="form-input-register" type="text" name="firstname" />
			</div>
			<div class="form-group-register">
				<p class="form-text">Last name</p>
				<input class="form-input-register" type="text" name="lastname" />
			</div>
			<div class="form-group-register">
				<p class="form-text">Giới tính:</p>
				<input type="radio" name="gender" value="true" /> Nam <input
					type="radio" name="gender" value="false" /> Nữ
			</div>
			<div class="form-group-register">
				<p class="form-text">Ngày tháng năm sinh</p>
				<div class="date-of-birth">
					<select name="day" id="day">
						<!-- Thêm các option từ 1 đến 31 -->
					</select> <select name="month" id="month">
						<!-- Thêm các option từ 1 đến 12 -->
					</select> <select name="year" id="year">
						<!-- Thêm các option từ 1900 đến 2023 (hoặc năm hiện tại) -->
					</select>
				</div>
			</div>

			<div class="form-group-register">
				<p class="form-text">Email</p>
				<input class="form-input-register" type="email" name="email" />
			</div>
			<div class="form-group-register">
				<p class="form-text">Mật khẩu</p>
				<input class="form-input-register" type="password" name="password" />
			</div>
			<div class="form-group-register">
				<p class="form-text">Xác nhận mật khẩu</p>
				<input class="form-input-register" type="password" name="repassword" />
			</div>
			<div class="form-group-register">
				<p class="form-text">Số điện thoại</p>
				<input class="form-input-register" type="text" name="phone" />
			</div>
			<div class="form-group-register">
				<p class="form-text">Nhập địa chỉ</p>
				<input class="form-input-register" type="text" name="address" />
			</div>
			<%
			String message = request.getParameter("message");
			if (message != null) {
				String decodedMessage = URLDecoder.decode(message, StandardCharsets.UTF_8.toString());
			%>
			<div class="auth_user-message" style="margin-top: 9px; color: red;">
				<%=decodedMessage%>
			</div>
			<%
			}
			%>
			<input type="submit" value="Đăng ký" class="form-submit" />

			<div class="form-bottom">
				<a class="form-login"
					href="/SGU_SOCIAL_NETWORK/AuthUser.jsp?page=login">Đăng nhập</a>
			</div>
		</form>
	</div>
</body>

<script>
	window.onload = async () => {
		await new AuthUser().render();
	}
</script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/auth_user.js"></script>
</html>