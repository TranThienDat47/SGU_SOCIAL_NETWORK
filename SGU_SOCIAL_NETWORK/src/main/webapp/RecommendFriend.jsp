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
	href="${pageContext.request.contextPath}/css/recommend_search.css" />

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
			<div class="recommend_friend">
				<div class="recommend_friend-recommnend_header">
					<p class="recommend_friend-recommend_title">Gợi ý kết bạn</p>
				</div>
				<div id="wrapperRenderListRecommnendFriend"
					class="recommend_friend-recommend_member">
					<!-- 					<div class="recommend_friend-info_friend"> -->
					<!-- 						<a href="" class="recommend_friend-img_friend"> <img -->
					<!-- 							src="https://images2.thanhnien.vn/528068263637045248/2023/5/12/3402996281807448214744715725794739163835942n-16838713649061930388403.jpeg" -->
					<!-- 							alt="" /> -->
					<!-- 						</a> -->
					<!-- 						<div class="recommend_friend-name_friend"> -->
					<!-- 							<a href="" class="recommend_friend-child_name">Danh Vo</a> -->
					<!-- 							<p class="recommend_friend-child_friend">300 bạn chung</p> -->
					<!-- 						</div> -->
					<!-- 						<button class="recommend_friend-addnew"> -->
					<!-- 							<p>Thêm bạn bè</p> -->
					<!-- 						</button> -->
					<!-- 					</div> -->
					<!-- 					<div class="recommend_friend-info_friend"> -->
					<!-- 						<a href="" class="recommend_friend-img_friend"> <img -->
					<!-- 							src="https://images2.thanhnien.vn/528068263637045248/2023/5/12/3402996281807448214744715725794739163835942n-16838713649061930388403.jpeg" -->
					<!-- 							alt="" /> -->
					<!-- 						</a> -->
					<!-- 						<div class="recommend_friend-name_friend"> -->
					<!-- 							<a href="" class="recommend_friend-child_name">Danh Vo</a> -->
					<!-- 							<p class="recommend_friend-child_friend">300 bạn chung</p> -->
					<!-- 						</div> -->
					<!-- 						<button class="recommend_friend-addnew"> -->
					<!-- 							<p>Thêm bạn bè</p> -->
					<!-- 						</button> -->
					<!-- 					</div> -->
					<!-- 					<div class="recommend_friend-info_friend"> -->
					<!-- 						<a href="" class="recommend_friend-img_friend"> <img -->
					<!-- 							src="https://images2.thanhnien.vn/528068263637045248/2023/5/12/3402996281807448214744715725794739163835942n-16838713649061930388403.jpeg" -->
					<!-- 							alt="" /> -->
					<!-- 						</a> -->
					<!-- 						<div class="recommend_friend-name_friend"> -->
					<!-- 							<a href="" class="recommend_friend-child_name">Danh Vo</a> -->
					<!-- 							<p class="recommend_friend-child_friend">300 bạn chung</p> -->
					<!-- 						</div> -->
					<!-- 						<button class="recommend_friend-addnew"> -->
					<!-- 							<p>Thêm bạn bè</p> -->
					<!-- 						</button> -->
					<!-- 					</div> -->
					<!-- 					<div class="recommend_friend-info_friend"> -->
					<!-- 						<a href="" class="recommend_friend-img_friend"> <img -->
					<!-- 							src="https://images2.thanhnien.vn/528068263637045248/2023/5/12/3402996281807448214744715725794739163835942n-16838713649061930388403.jpeg" -->
					<!-- 							alt="" /> -->
					<!-- 						</a> -->
					<!-- 						<div class="recommend_friend-name_friend"> -->
					<!-- 							<a href="" class="recommend_friend-child_name">Danh Vo</a> -->
					<!-- 							<p class="recommend_friend-child_friend">300 bạn chung</p> -->
					<!-- 						</div> -->
					<!-- 						<button class="recommend_friend-addnew"> -->
					<!-- 							<p>Thêm bạn bè</p> -->
					<!-- 						</button> -->
					<!-- 					</div> -->
				</div>
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
	src="${pageContext.request.contextPath}/component/recommend/RecommendFriendItem.js"></script>



<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/main.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/recommend/recommend_friend.js"></script>

</html>