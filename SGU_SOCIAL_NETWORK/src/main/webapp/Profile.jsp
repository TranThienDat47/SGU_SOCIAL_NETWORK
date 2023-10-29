<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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

</head>
<body>
	<!-- 	Start Header -->
	<jsp:include page="./layout/Header.jsp"></jsp:include>
	<!-- 	End Header -->

	<!-- Start container -->
	<div id="global_container"></div>
	<!-- End container -->
</body>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/global.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/Search.js"></script>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/main.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/create_post.js"></script>

</html>