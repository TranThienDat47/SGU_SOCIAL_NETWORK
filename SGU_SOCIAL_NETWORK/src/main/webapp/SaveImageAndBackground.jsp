<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@page import="com.util.CookieUtils"%>

<%
String token = (String) request.getAttribute("token");
CookieUtils.addPlus("token", token, 26, response);
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<script>
		localStorage
				.setItem(
						'image',
						JSON
								.stringify((
										decodeURIComponent(`${image}`)
		)
								));

		localStorage
				.setItem(
						'background',
						JSON
								.stringify((
										decodeURIComponent(`${background}`))));
	
		window.onload = () => {
			window.location.href = "/SGU_SOCIAL_NETWORK/index.jsp"
		}
	</script>
</body>
</html>