<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>

<%@page import="com.util.CookieUtils"%>
<%@page import="com.dao.FriendDAO"%>
<%@page import="com.dao.FriendRequestDAO"%>


<%@page import="java.net.URLDecoder"%>


<%
String valueID = request.getParameter("id");
%>

<%
String valueName = URLDecoder.decode(request.getParameter("name"), "UTF-8");

String valueAddress = request.getParameter("address");
String valueBiography = request.getParameter("biography");

String valueGender = request.getParameter("gender");

String valueCreateAT = request.getParameter("createAT");

String valueBirthDate = request.getParameter("birth_date");

String originalDataImage = request.getParameter("image");

String originalDataBackground = request.getParameter("background");
%>

<%
String queryString = request.getQueryString();
String currentURL = request.getRequestURI();

if (queryString != null && !queryString.isEmpty()) {
	String[] queryParams = queryString.split("&");
	String targetParamValue = null;

	for (String param : queryParams) {
		String[] paramParts = param.split("=");
		if (paramParts.length == 2 && paramParts[0].equals("page")) {
	targetParamValue = paramParts[1];
	break; // Nếu đã tìm thấy tham số "page", thoát khỏi vòng lặp
		}
	}

	if (targetParamValue != null) {
		currentURL += "?page=" + targetParamValue;
	}

}

String tab1URL = "/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend";
String tab2URL = "/SGU_SOCIAL_NETWORK/Profile.jsp?page=friend";
String tab3URL = "/SGU_SOCIAL_NETWORK/Profile.jsp?page=follow";
String tab4URL = "/SGU_SOCIAL_NETWORK/Profile.jsp?page=image";
%>

<%
FriendDAO friendDAO = new FriendDAO();
FriendRequestDAO friendRequestDAO = new FriendRequestDAO();

int countFriend = friendDAO.getQuantityFriend(Integer.parseInt(valueID));

boolean isFriend = friendDAO.checkIsFriend(Integer.parseInt(CookieUtils.get("id", request)), Integer.parseInt(valueID));

boolean userIsSendRequest = friendRequestDAO.checkIsSendRequest(Integer.parseInt(CookieUtils.get("id", request)),
		Integer.parseInt(valueID));

boolean otherIsSendRequest = friendRequestDAO.checkIsSendRequest(Integer.parseInt(valueID),
		Integer.parseInt(CookieUtils.get("id", request)));
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
			<img src="<%=originalDataBackground%>" alt="" />
		</div>
		<div class="profile_user-body_profile">
			<div class="profile_user-picture_main">
				<img src="<%=originalDataImage%>" alt="" />
			</div>
			<div class="profile_user-name_profile">
				<h1><%=valueName%></h1>
				<p><%=countFriend%>
					bạn bè - 500 bạn chung
				</p>
			</div>



			<div class="profile_user-profile_public">

				<c:if test="<%=isFriend%>">
					<div style="position: relative">
						<button type="button" class="global_post-status_profile"
							data-bs-toggle="dropdown">
							<svg xmlns="http://www.w3.org/2000/svg" width="29" height="21"
								viewBox="-1 0 21 21" fill="none">
			              <path
									d="M3.8197 5.25C3.8197 3.85761 4.35627 2.52226 5.31138 1.53769C6.26649 0.553123 7.5619 0 8.91263 0C10.2634 0 11.5588 0.553123 12.5139 1.53769C13.469 2.52226 14.0056 3.85761 14.0056 5.25C14.0056 6.64239 13.469 7.97775 12.5139 8.96231C11.5588 9.94688 10.2634 10.5 8.91263 10.5C7.5619 10.5 6.26649 9.94688 5.31138 8.96231C4.35627 7.97775 3.8197 6.64239 3.8197 5.25ZM0 19.7818C0 15.7418 3.17512 12.4688 7.09429 12.4688H10.731C14.6501 12.4688 17.8253 15.7418 17.8253 19.7818C17.8253 20.4545 17.2961 21 16.6435 21H1.18172C0.529187 21 0 20.4545 0 19.7818ZM24.8678 7.25977L19.7749 12.5098C19.4009 12.8953 18.7961 12.8953 18.4261 12.5098L15.8796 9.88477C15.5056 9.49922 15.5056 8.87578 15.8796 8.49434C16.2536 8.11289 16.8584 8.10879 17.2284 8.49434L19.0985 10.4221L23.515 5.86523C23.889 5.47969 24.4938 5.47969 24.8638 5.86523C25.2339 6.25078 25.2379 6.87422 24.8638 7.25566L24.8678 7.25977Z"
									fill="black" />
			            </svg>
							<p>Bạn bè</p>
						</button>
						<ul style="padding: 0; margin: 0; width: 140px"
							class="profile_user-dropdown-menu">
							<li>
								<div class="profile_user-dropdown-item">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"
										fill="none">
				                  <g clip-path="url(#clip0_133_1173)">
				                    <path
											d="M3.15 5.25C3.15 3.85761 3.5925 2.52226 4.38015 1.53769C5.1678 0.553123 6.23609 0 7.35 0C8.46391 0 9.5322 0.553123 10.3198 1.53769C11.1075 2.52226 11.55 3.85761 11.55 5.25C11.55 6.64239 11.1075 7.97775 10.3198 8.96231C9.5322 9.94688 8.46391 10.5 7.35 10.5C6.23609 10.5 5.1678 9.94688 4.38015 8.96231C3.5925 7.97775 3.15 6.64239 3.15 5.25ZM0 19.7818C0 15.7418 2.61844 12.4688 5.85047 12.4688H8.84953C12.0816 12.4688 14.7 15.7418 14.7 19.7818C14.7 20.4545 14.2636 21 13.7255 21H0.974531C0.436406 21 0 20.4545 0 19.7818ZM15.4547 5.86523C15.7631 5.47969 16.2619 5.47969 16.567 5.86523L18.1092 7.79297L19.6514 5.86523C19.9598 5.47969 20.4586 5.47969 20.7637 5.86523C21.0689 6.25078 21.0722 6.87422 20.7637 7.25566L19.2216 9.1834L20.7637 11.1111C21.0722 11.4967 21.0722 12.1201 20.7637 12.5016C20.4553 12.883 19.9566 12.8871 19.6514 12.5016L18.1092 10.5738L16.567 12.5016C16.2586 12.8871 15.7598 12.8871 15.4547 12.5016C15.1495 12.116 15.1462 11.4926 15.4547 11.1111L16.9969 9.1834L15.4547 7.25566C15.1462 6.87012 15.1462 6.24668 15.4547 5.86523Z"
											fill="black" />
				                  </g>
				                  <defs>
				                    <clipPath id="clip0_133_1173">
				                      <rect width="21" height="21" fill="white" />
				                    </clipPath>
				                  </defs>
				                </svg>
									<div>Hủy kết bạn</div>
								</div>
							</li>
						</ul>
					</div>
				</c:if>
				<c:if
					test="<%=!isFriend && !userIsSendRequest && !otherIsSendRequest%>">
					<button id="btnAddFriendInProfile" type="button"
						class="global_post-status_profile">
						<svg xmlns="http://www.w3.org/2000/svg" height="21" width="23"
							viewBox="0 0 640 512">
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<path
								d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>
						<p>Thêm bạn bè</p>
					</button>
				</c:if>
				<c:if test="<%=userIsSendRequest%>">
					<button type="button" class="global_post-status_profile">
						<p>Đã gửi yêu cầu kết bạn</p>
					</button>
				</c:if>
				<c:if test="<%=otherIsSendRequest%>">
					<button id="btnAcceptFriendReuestProfile" type="button"
						class="global_post-status_profile">
						<p>Chấp nhận yêu cầu kết bạn</p>
					</button>

					<button id="btnAcceptFriendReuestProfile" type="button"
						class="global_post-status_profile">
						<p>Từ chối</p>
					</button>
				</c:if>




				<button type="button" class="global_post-status_profile">
					<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"
						viewBox="0 0 23 23" fill="none">
			            <g clip-path="url(#clip0_73_1783)">
			              <path
							d="M11.5 20.125C17.852 20.125 23 15.9428 23 10.7812C23 5.61973 17.852 1.4375 11.5 1.4375C5.14806 1.4375 1.45249e-05 5.61973 1.45249e-05 10.7812C1.45249e-05 12.8072 0.795132 14.6805 2.14279 16.2123C2.05744 17.3129 1.63068 18.2922 1.18146 19.0379C0.93439 19.4512 0.682827 19.7836 0.498647 20.0082C0.404311 20.1205 0.332436 20.2059 0.27853 20.2643C0.251577 20.2912 0.233608 20.3137 0.220132 20.3271L0.206655 20.3406C1.45258e-05 20.5473 -0.0583839 20.8527 0.0539208 21.1223C0.166225 21.3918 0.426772 21.567 0.718765 21.567C2.00802 21.567 3.30626 21.1672 4.38439 20.7C5.4131 20.2508 6.28908 19.7162 6.82365 19.3254C8.25216 19.842 9.83341 20.1295 11.5 20.1295V20.125ZM5.75001 9.34375C6.13126 9.34375 6.4969 9.4952 6.76648 9.76478C7.03606 10.0344 7.18751 10.4 7.18751 10.7812C7.18751 11.1625 7.03606 11.5281 6.76648 11.7977C6.4969 12.0673 6.13126 12.2188 5.75001 12.2188C5.36877 12.2188 5.00313 12.0673 4.73355 11.7977C4.46396 11.5281 4.31251 11.1625 4.31251 10.7812C4.31251 10.4 4.46396 10.0344 4.73355 9.76478C5.00313 9.4952 5.36877 9.34375 5.75001 9.34375ZM11.5 9.34375C11.8813 9.34375 12.2469 9.4952 12.5165 9.76478C12.7861 10.0344 12.9375 10.4 12.9375 10.7812C12.9375 11.1625 12.7861 11.5281 12.5165 11.7977C12.2469 12.0673 11.8813 12.2188 11.5 12.2188C11.1188 12.2188 10.7531 12.0673 10.4835 11.7977C10.214 11.5281 10.0625 11.1625 10.0625 10.7812C10.0625 10.4 10.214 10.0344 10.4835 9.76478C10.7531 9.4952 11.1188 9.34375 11.5 9.34375ZM15.8125 10.7812C15.8125 10.4 15.964 10.0344 16.2335 9.76478C16.5031 9.4952 16.8688 9.34375 17.25 9.34375C17.6313 9.34375 17.9969 9.4952 18.2665 9.76478C18.5361 10.0344 18.6875 10.4 18.6875 10.7812C18.6875 11.1625 18.5361 11.5281 18.2665 11.7977C17.9969 12.0673 17.6313 12.2188 17.25 12.2188C16.8688 12.2188 16.5031 12.0673 16.2335 11.7977C15.964 11.5281 15.8125 11.1625 15.8125 10.7812Z"
							fill="black" />
			            </g>
			            <defs>
			              <clipPath id="clip0_73_1783">
			                <rect width="23" height="23" fill="white" />
			              </clipPath>
			            </defs>
			          </svg>
					<p>Nhắn tin</p>
				</button>
				<button type="button" class="global_post-status_profile">
					<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21"
						viewBox="0 0 21 21" fill="none">
			            <path
							d="M3 1.3125C1.34531 1.3125 0 2.48965 0 3.9375V17.0625C0 18.5104 1.34531 19.6875 3 19.6875H18C19.6547 19.6875 21 18.5104 21 17.0625V3.9375C21 2.48965 19.6547 1.3125 18 1.3125H3ZM9.375 14.1094V11.4844H6.375C5.75156 11.4844 5.25 11.0455 5.25 10.5C5.25 9.95449 5.75156 9.51562 6.375 9.51562H9.375V6.89062C9.375 6.34512 9.87656 5.90625 10.5 5.90625C11.1234 5.90625 11.625 6.34512 11.625 6.89062V9.51562H14.625C15.2484 9.51562 15.75 9.95449 15.75 10.5C15.75 11.0455 15.2484 11.4844 14.625 11.4844H11.625V14.1094C11.625 14.6549 11.1234 15.0938 10.5 15.0938C9.87656 15.0938 9.375 14.6549 9.375 14.1094Z"
							fill="black" />
			          </svg>
					<p>Theo dõi</p>
				</button>
			</div>
		</div>
		<div class="profile_user-navigation">
			<ul class="profile_user-menu-tabs">
				<a
					href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=<%=valueID%>"><li
					class="profile_user-tabs-item <%=currentURL.trim().equals(tab1URL.trim()) ? "profile_user-tabs-item_active" : ""%>">
						Bài đăng</li></a>
				<a
					href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=friend&id=<%=valueID%>">
					<li
					class="profile_user-tabs-item <%=currentURL.trim().equals(tab2URL.trim()) ? "profile_user-tabs-item_active" : ""%>">Bạn
						bè</li>
				</a>
				<a
					href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=follow&id=<%=valueID%>">
					<li
					class="profile_user-tabs-item <%=currentURL.trim().equals(tab3URL.trim()) ? "profile_user-tabs-item_active" : ""%>">Theo
						dõi</li>
				</a>
				<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=image&id=<%=valueID%>">
					<li
					class="profile_user-tabs-item <%=currentURL.trim().equals(tab4URL.trim()) ? "profile_user-tabs-item_active" : ""%>">Ảnh</li>
				</a>
			</ul>
		</div>
	</div>

	<c:set var="curentPage" value="${currentURL}" />
	<c:if test="<%=currentURL.trim().equals(tab1URL.trim())%>">
		<jsp:include
			page="../component/profile_other_user/ProfileOtherUserIntroduce.jsp">
			<jsp:param name="id" value='<%=request.getParameter("id")%>' />
			<jsp:param name="name" value='<%=request.getParameter("name")%>' />
			<jsp:param name="address" value="<%=valueAddress%>" />
			<jsp:param name="biography" value="<%=valueBiography%>" />
			<jsp:param name="gender" value="<%=valueGender%>" />
			<jsp:param name="birth_date" value="<%=valueBirthDate%>" />
			<jsp:param name="createAT" value="<%=valueCreateAT%>" />
		</jsp:include>
	</c:if>
	<%-- 	<c:if test="<%=currentURL.trim().equals(tab2URL.trim())%>"> --%>
	<!-- 		<div class="wrapper_of_block" -->
	<!-- 			style="border: 1px solid var(--border-color); margin-top: 16px;"> -->
	<%-- 			<jsp:include page="../component/profile_user/ProfileUserFriend.jsp"></jsp:include> --%>
	<!-- 		</div> -->
	<%-- 	</c:if> --%>
	<%-- 	<c:if test="<%=currentURL.trim().equals(tab3URL.trim())%>"> --%>
	<!-- 		<div class="wrapper_of_block" -->
	<!-- 			style="border: 1px solid var(--border-color); margin-top: 16px;"> -->
	<%-- 			<jsp:include page="../component/profile_user/ProfileUserFollow.jsp"></jsp:include> --%>
	<!-- 		</div> -->
	<%-- 	</c:if> --%>
	<%-- 	<c:if test="<%=currentURL.trim().equals(tab4URL.trim())%>"> --%>
	<%-- 	</c:if> --%>

</body>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/global.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/profile_user/UserFriendItem.js"></script>

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

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/main.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/profile_other_friend/profile_other_user.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/post.js"></script>


<script>
	new ProfileOtherUser({
		id :
<%=valueID%>
	}).render();
</script>

</html>