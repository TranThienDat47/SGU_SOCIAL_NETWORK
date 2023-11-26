<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>

<%
String queryString = request.getQueryString();
String currentURL = request.getRequestURI();

if (queryString != null && !queryString.isEmpty()) {
	currentURL += "?" + queryString;
}
String tab1_1URL = "/SGU_SOCIAL_NETWORK/Search.jsp?page=all";
String tab2URL = "/SGU_SOCIAL_NETWORK/Search.jsp?page=post";
String tab3URL = "/SGU_SOCIAL_NETWORK/Search.jsp?page=user";

if ((!currentURL.contains(tab1_1URL) && !currentURL.contains(tab2URL) && !currentURL.contains(tab3URL))
		&& (!currentURL.contains("&value=") || !currentURL.contains("?value="))) {
	response.sendRedirect("/SGU_SOCIAL_NETWORK/");
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
	href="${pageContext.request.contextPath}/css/comment.css" />

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/notify.css" />

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/search_page.css" />
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/global.js"></script>

</head>
<body>
	<!-- 	Start Header -->
	<jsp:include page="./layout/Header.jsp"></jsp:include>
	<!-- 	End Header -->

	<!-- 	Start Sidebar left -->
	<jsp:include page="./layout/SidebarLeftSearch.jsp"></jsp:include>
	<!-- 	End Sidebar leftr -->

	<!-- Start container -->
	<div id="global_container">

		<c:if test="<%=currentURL.trim().contains(tab1_1URL.trim())%>">
			<jsp:include page="./layout/search_page/SearchAll.jsp"></jsp:include>
		</c:if>
		<c:if test="<%=currentURL.trim().contains(tab2URL.trim())%>">
			<jsp:include page="./layout/search_page/SearchPost.jsp"></jsp:include>
		</c:if>
		<c:if test="<%=currentURL.trim().contains(tab3URL.trim())%>">
			<jsp:include page="./layout/search_page/SearchUser.jsp"></jsp:include>
		</c:if>

	</div>
	<!-- End container -->
	<div id="showPostGloabal"></div>


	<!-- 	Start Sidebar right -->
	<jsp:include page="./layout/SideBarRight.jsp"></jsp:include>
	<!-- 	End Sidebar right -->

	<div id="showPostDetailGloabal"></div>

</body>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/Search.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/main.js"></script>

</html>