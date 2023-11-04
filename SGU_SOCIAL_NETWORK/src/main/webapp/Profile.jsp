<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>


<%@page import="com.util.CookieUtils"%>


<%
String cookieValue = CookieUtils.get("email", request);

if (cookieValue.length() <= 0) {
	response.sendRedirect("AuthUser.jsp");
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
	href="${pageContext.request.contextPath}/css/remind_friend.css" />

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/remind_follow.css" />


</head>

<body>
	<!-- 	Start Header -->
	<jsp:include page="./layout/Header.jsp"></jsp:include>
	<!-- 	End Header -->

	<!-- Start container -->
	<div id="global_container_profile">


		<jsp:include page="./layout/ProfileIsUser.jsp"></jsp:include>
		<%-- 		<c:set var="curentPage" value="${currentURL}" /> --%>
		<%-- 		<c:if --%>
		<%-- 			test="<%=currentURL.trim().equals(tab1URL.trim()) || currentURL.trim().equals(tab1_1URL.trim())%>"> --%>

		<%-- 		</c:if> --%>
		<%-- 		<c:if test="<%=currentURL.trim().equals(tab2URL.trim())%>"> --%>
		<%-- 		</c:if> --%>


	</div>
	<!-- End container -->
	<div class="toolkit_message-wrapper"></div>

</body>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/global.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/PostItem.js"></script>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/PostDetail.js"></script>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/Search.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/main.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/create_post.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/profile_user.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/post.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/remind_friend.js"></script>


</html>