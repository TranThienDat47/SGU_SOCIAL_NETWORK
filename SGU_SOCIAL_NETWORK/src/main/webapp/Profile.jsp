<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>


<%@page import="com.util.CookieUtils"%>
<%@page import="com.dao.UserDAO, com.model.UserModel"%>
<%@page import="java.net.URLDecoder, java.net.URLEncoder"%>



<%
boolean isNotUser = false;
UserModel user = null;

String cookieValue = CookieUtils.get("email", request);

if (cookieValue.length() <= 0) {
	response.sendRedirect("AuthUser.jsp");
}

String cookieValueID = CookieUtils.get("id", request);
%>

<%
String queryString = request.getQueryString();
String currentURL = request.getRequestURI();
String idParameterValue = null;

if (queryString != null && !queryString.isEmpty()) {
	String[] queryParams = queryString.split("&");
	String targetParamValue = null;
	boolean hasIdParameter = false;

	for (String param : queryParams) {
		String[] paramParts = param.split("=");
		if (paramParts.length == 2 && paramParts[0].equals("page")) {
	targetParamValue = paramParts[1];
		}

		if (paramParts.length == 2 && paramParts[0].equals("id")) {
	hasIdParameter = true;
	idParameterValue = paramParts[1];
		}
	}

	if (targetParamValue != null) {
		currentURL += "?page=" + targetParamValue;
	}
	if (hasIdParameter) {
		UserDAO users = new UserDAO();

		try {
	String idParameter = request.getParameter("id");
	if (idParameter != null && idParameter.matches("\\d+")) {
		int id = Integer.parseInt(idParameter);
		user = users.getOneUser(id);
	} else {
		String tempURL = "/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=" + cookieValueID;
		response.sendRedirect(tempURL);
		return;
	}
		} catch (NumberFormatException e) {
		}

		if (user == null) {
	String tempURL = "/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=" + cookieValueID;
	response.sendRedirect(tempURL);
	return;
		} else if (user.getId() == Integer.parseInt(cookieValueID)) {

		} else {
	isNotUser = true;
	System.out.println(isNotUser);
		}
	} else {
		String tempURL = "/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=" + cookieValueID;
		response.sendRedirect(tempURL);
		return;
	}
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


<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/comment.css" />



</head>

<body>
	<!-- 	Start Header -->
	<jsp:include page="./layout/Header.jsp"></jsp:include>
	<!-- 	End Header -->

	<!-- Start container -->
	<div id="global_container_profile">

		<c:if test="<%=idParameterValue.equals(cookieValueID)%>">
			<jsp:include page="./layout/ProfileIsUser.jsp"></jsp:include>
		</c:if>

		<%
		// Lấy dữ liệu từ user hoặc bất kỳ nguồn dữ liệu nào khác
		int userId = user.getId();
		String fullName = user.getFirstName() + " " + user.getLastName();
		String encodedValueFullName = URLEncoder.encode(fullName, "UTF-8");

		String address = user.getAddress();
		String encodedValueAddress = URLEncoder.encode(address, "UTF-8");

		String biography = user.getBiography();
		String encodedValueBiography = URLEncoder.encode(biography, "UTF-8");

		boolean gender = user.isGender();

		String dateOfBirth = user.getDateOfBirth();

		String createAt = user.getCreateAt();
		String encodedValueCreateAt = URLEncoder.encode(createAt, "UTF-8");

		String image = user.getImage();
		String background = user.getBackground();
		%>
		<c:if test="<%=isNotUser%>">
			<jsp:include page="./layout/ProfileIsOther.jsp">
				<jsp:param name="id" value="<%=userId%>" />
				<jsp:param name="name" value="<%=encodedValueFullName%>" />
				<jsp:param name="address" value="<%=encodedValueAddress%>" />
				<jsp:param name="biography" value="<%=encodedValueBiography%>" />
				<jsp:param name="gender" value="<%=gender%>" />
				<jsp:param name="birth_date" value="<%=dateOfBirth%>" />
				<jsp:param name="createAT" value="<%=encodedValueCreateAt%>" />
				<jsp:param name="image" value="<%=image%>" />
				<jsp:param name="background" value="<%=background%>" />
			</jsp:include>
		</c:if>
	</div>
	<!-- End container -->
	<div class="toolkit_message-wrapper"></div>
	<div id="showPostDetailGloabal"></div>

</body>



</html>