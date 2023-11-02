
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

String queryString = request.getQueryString();
String currentURL = request.getRequestURI();

if (queryString != null && !queryString.isEmpty()) {
	currentURL += "?" + queryString;
}
String tab1URL = "/SGU_SOCIAL_NETWORK/";
String tab1_1URL = "/SGU_SOCIAL_NETWORK/index.jsp?page=home";
String tab2URL = "/SGU_SOCIAL_NETWORK/index.jsp?page=follow";
String tab3URL = "/SGU_SOCIAL_NETWORK/index.jsp?page=recommend";

if (!currentURL.equals(tab1URL) && !currentURL.equals(tab1_1URL) && !currentURL.equals(tab2URL)
		&& !currentURL.equals(tab3URL)) {
	response.sendRedirect("/SGU_SOCIAL_NETWORK/");
}
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/base.css" />

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/post.css" />

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/notify.css" />

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/comment.css" />

</head>

<style>
</style>



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
			<jsp:include page="./component/CreatePost.jsp"></jsp:include>
		</div>
		<c:set var="curentPage" value="${currentURL}" />
		<c:if
			test="<%=currentURL.trim().equals(tab1URL.trim()) || currentURL.trim().equals(tab1_1URL.trim())%>">

			<div id="render_list_post_home"></div>
		</c:if>
		<c:if test="<%=currentURL.trim().equals(tab2URL.trim())%>">
			<div>haha</div>
		</c:if>


	</div>
	<div id="showPostDetailGloabal"></div>
	<div id="showCreatePostGloabal" style="display: none;">
		<jsp:include page="./component/CreatePostAfter.jsp"></jsp:include>
	</div>
	<!-- End container -->

	<!-- 	Start Sidebar right -->
	<jsp:include page="./layout/SideBarRight.jsp"></jsp:include>
	<!-- 	End Sidebar right -->


</body>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/global.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/PostItem.js"></script>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/PostDetail.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/CommentItem.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/CommentWrite.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/Comment.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/Search.js"></script>

<!-- <script type="text/javascript" -->
<%-- 	src="${pageContext.request.contextPath}/component/CreatePost.js"></script> --%>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/main.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/create_post.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/post.js"></script>



</html>