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

String tab1_1URL = "/SGU_SOCIAL_NETWORK/Profile.jsp";
String tab1URL = "/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend";
String tab2URL = "/SGU_SOCIAL_NETWORK/Profile.jsp?page=friend";
String tab3URL = "/SGU_SOCIAL_NETWORK/Profile.jsp?page=follow";
String tab4URL = "/SGU_SOCIAL_NETWORK/Profile.jsp?page=image";

if (!currentURL.equals(tab1URL) && !currentURL.equals(tab1_1URL) && !currentURL.equals(tab2URL)
		&& !currentURL.equals(tab3URL) && !currentURL.equals(tab4URL)) {
	response.sendRedirect("/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend");
}
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/profile.css" />


</head>


<body>

	<div class="profile_user">
		<div class="profile_user-header_profile">
			<img id="profile_user-img_background"
				src="/SGU_SOCIAL_NETWORK/assets/images/logo.png" alt="" />
			<div id="profile_user-tabs-update_picture_background"
				class="profile_user-tabs-update_picture">
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="22"
					viewBox="0 0 21 22" fill="none">
		            <path
						d="M6.11543 2.8751L5.68887 4.15479H2.625C1.17715 4.15479 0 5.33193 0 6.77979V17.2798C0 18.7276 1.17715 19.9048 2.625 19.9048H18.375C19.8229 19.9048 21 18.7276 21 17.2798V6.77979C21 5.33193 19.8229 4.15479 18.375 4.15479H15.3111L14.8846 2.8751C14.618 2.07119 13.8674 1.52979 13.0184 1.52979H7.98164C7.13262 1.52979 6.38203 2.07119 6.11543 2.8751ZM10.5 8.09229C11.5443 8.09229 12.5458 8.50713 13.2842 9.24555C14.0227 9.98398 14.4375 10.9855 14.4375 12.0298C14.4375 13.0741 14.0227 14.0756 13.2842 14.814C12.5458 15.5524 11.5443 15.9673 10.5 15.9673C9.45571 15.9673 8.45419 15.5524 7.71577 14.814C6.97734 14.0756 6.5625 13.0741 6.5625 12.0298C6.5625 10.9855 6.97734 9.98398 7.71577 9.24555C8.45419 8.50713 9.45571 8.09229 10.5 8.09229Z"
						fill="black" />
		          </svg>

				<div
					style="display: flex; flex: 1; margin-left: 16px; align-items: center;">
					Cập nhật ảnh bìa</div>
			</div>
			<input type="file" style="visibility: hidden; position: absolute;"
				type="file" accept=".png, .jpg, .jpeg"
				id="profile_user-background_file" />
		</div>
		<div class="profile_user-body_profile">
			<div class="profile_user-picture_main">
				<img id="profile_user-img_avata"
					src="/SGU_SOCIAL_NETWORK/assets/images/logo.png" alt="" />
				<div id="profile_user-tabs-update_picture_avata"
					class="profile_user-screen_picture">
					<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19"
						viewBox="0 0 19 19" fill="none">
		              <path
							d="M5.53301 2.40469L5.14707 3.5625H2.375C1.06504 3.5625 0 4.62754 0 5.9375V15.4375C0 16.7475 1.06504 17.8125 2.375 17.8125H16.625C17.935 17.8125 19 16.7475 19 15.4375V5.9375C19 4.62754 17.935 3.5625 16.625 3.5625H13.8529L13.467 2.40469C13.2258 1.67734 12.5467 1.1875 11.7785 1.1875H7.22148C6.45332 1.1875 5.77422 1.67734 5.53301 2.40469ZM9.5 7.125C10.4448 7.125 11.351 7.50033 12.0191 8.16843C12.6872 8.83653 13.0625 9.74267 13.0625 10.6875C13.0625 11.6323 12.6872 12.5385 12.0191 13.2066C11.351 13.8747 10.4448 14.25 9.5 14.25C8.55517 14.25 7.64903 13.8747 6.98093 13.2066C6.31283 12.5385 5.9375 11.6323 5.9375 10.6875C5.9375 9.74267 6.31283 8.83653 6.98093 8.16843C7.64903 7.50033 8.55517 7.125 9.5 7.125Z"
							fill="black" />
		            </svg>
				</div>
				<input type="file" style="visibility: hidden; position: absolute;"
					type="file" accept=".png, .jpg, .jpeg" id="profile_user-avata_file" />
			</div>
			<div class="profile_user-name_profile">
				<h1>Danh Võ</h1>
				<p>1000 bạn bè - 500 bạn chung</p>
			</div>
			<div id="profile_user-tabs-update_profile"
				class="profile_user-tabs-update_profile">
				<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"
					viewBox="0 0 23 23" fill="none">
					            <g clip-path="url(#clip0_75_2657)">
					              <path
						d="M11.5 11.5C13.2429 11.5 14.9143 10.8942 16.1467 9.81586C17.3791 8.73753 18.0714 7.27499 18.0714 5.75C18.0714 4.22501 17.3791 2.76247 16.1467 1.68414C14.9143 0.605802 13.2429 0 11.5 0C9.75715 0 8.08568 0.605802 6.8533 1.68414C5.62092 2.76247 4.92857 4.22501 4.92857 5.75C4.92857 7.27499 5.62092 8.73753 6.8533 9.81586C8.08568 10.8942 9.75715 11.5 11.5 11.5ZM9.1538 13.6562C4.09688 13.6562 0 17.241 0 21.6658C0 22.4025 0.682813 23 1.52478 23H21.4752C22.3172 23 23 22.4025 23 21.6658C23 17.241 18.9031 13.6562 13.8462 13.6562H9.1538Z"
						fill="black" />
					            </g>
					            <defs>
					              <clipPath id="clip0_75_2657">
					                <rect width="23" height="23" fill="white" />
					              </clipPath>
					            </defs>
		         </svg>
				<div
					style="display: flex; flex: 1; margin-left: 16px; align-items: center;">
					Cập nhật hồ sơ</div>
			</div>
		</div>
		<div class="profile_user-navigation">
			<ul class="profile_user-menu-tabs">
				<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend"><li
					class="profile_user-tabs-item <%=currentURL.trim().equals(tab1URL.trim()) || currentURL.trim().equals(tab1_1URL.trim())
		? "profile_user-tabs-item_active"
		: ""%>">
						Bài đăng</li></a>
				<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=friend">
					<li
					class="profile_user-tabs-item <%=currentURL.trim().equals(tab2URL.trim()) ? "profile_user-tabs-item_active" : ""%>">Bạn
						bè</li>
				</a>
				<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=follow">
					<li
					class="profile_user-tabs-item <%=currentURL.trim().equals(tab3URL.trim()) ? "profile_user-tabs-item_active" : ""%>">Theo
						dõi</li>
				</a>
				<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=image">
					<li
					class="profile_user-tabs-item <%=currentURL.trim().equals(tab4URL.trim()) ? "profile_user-tabs-item_active" : ""%>">Ảnh</li>
				</a>
			</ul>
		</div>
	</div>

	<c:set var="curentPage" value="${currentURL}" />
	<c:if
		test="<%=currentURL.trim().equals(tab1URL.trim()) || currentURL.trim().equals(tab1_1URL.trim())%>">
		<jsp:include page="../component/profile_user/ProfileUserIntroduce.jsp"></jsp:include>
	</c:if>
	<c:if test="<%=currentURL.trim().equals(tab2URL.trim())%>">
		<div class="wrapper_of_block"
			style="border: 1px solid var(--border-color); margin-top: 16px;">
			<jsp:include page="../component/profile_user/ProfileUserFriend.jsp"></jsp:include>
		</div>
	</c:if>
	<c:if test="<%=currentURL.trim().equals(tab3URL.trim())%>">
		<div class="wrapper_of_block"
			style="border: 1px solid var(--border-color); margin-top: 16px;">
			<jsp:include page="../component/profile_user/ProfileUserFollow.jsp"></jsp:include>
		</div>
	</c:if>
	<c:if test="<%=currentURL.trim().equals(tab4URL.trim())%>">
	</c:if>

</body>

</html>