<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.util.CookieUtils"%>


<%
String cookieValueName = CookieUtils.get("firstName", request) + " " + CookieUtils.get("lastName", request);
String cookieValueBiography = CookieUtils.get("biography", request);
String cookieValueAddress = CookieUtils.get("address", request);
String cookieValueGender = CookieUtils.get("gender", request);
String cookieValueBirthDay = CookieUtils.get("dateOfBirth", request);
String cookieValueCreateAt = CookieUtils.get("createAt", request).replace("_=_", "");
System.out.println(cookieValueBirthDay);
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/update_profile.css" />

</head>
<body>
	<div class="box_update">
		<div class="box_update-header_box">
			<button id="btnCloseUpdateProfile" style="cursor: pointer;">
				<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"
					viewBox="0 0 23 23" fill="none">
		          <path
						d="M22.3193 3.92792C23.2173 3.02991 23.2173 1.57153
		                        22.3193 0.673512C21.4213 -0.224504 19.9629 -0.224504
		                        19.0649 0.673512L11.5 8.24559L3.92792 0.680696C3.02991
		                        -0.21732 1.57153 -0.21732 0.673512 0.680696C-0.224504
		                        1.57871 -0.224504 3.03709 0.673512 3.93511L8.24559
		                        11.5L0.680697 19.0721C-0.21732 19.9701 -0.21732 21.4285
		                        0.680697 22.3265C1.57871 23.2245 3.03709 23.2245 3.93511
		                        22.3265L11.5 14.7544L19.0721 22.3193C19.9701 23.2173
		                        21.4285 23.2173 22.3265 22.3193C23.2245 21.4213 23.2245
		                        19.9629 22.3265 19.0649L14.7544 11.5L22.3193 3.92792Z"
						fill="black" />
		        </svg>
			</button>
			<button id="btnSaveUpdateProfile" class="box_update-btn-save">Lưu</button>
		</div>
		<div class="box_update-content_box">
			<form id="formUpdatePrfileUser">
				<div class="box_update-form-floating">
					<label for="box_update-name">Tên</label> <input type="text"
						class="box_update-form-control" id="box_update-name" name="name"
						value="<%=cookieValueName%>" />
				</div>
				<div class="box_update-form-floating">
					<label for="box_update-story">Tiểu sử</label>
					<textarea class="box_update-form-control" id="box_update-story"
						name="story"><%=cookieValueBiography%></textarea>
				</div>

				<div class="box_update-form-floating">
					<label for="box_update-gender">Giới tính</label> <select
						class="box_update-form-control" id="box_update-gender"
						name="gender">
						<option <%=cookieValueGender.equals("false") ? "" : "selected"%>
							value="true">Nam</option>
						<option <%=cookieValueGender.equals("false") ? "selected" : ""%>
							value="false">Nữ</option>
					</select>
				</div>

				<div class="box_update-form-floating">
					<label for="box_update-local">Vị trí </label> <input type="text"
						class="box_update-form-control" id="box_update-local" name="local"
						value="<%=cookieValueAddress%>" />
				</div>
				<div class="box_update-form-floating">
					<label for="box_update-birth">Ngày sinh </label> <input type="date"
						style="margin-top: 13px" class="box_update-form-control"
						id="box_update-birth" name="birth"
						value="<%=cookieValueBirthDay%>" />
				</div>
			</form>
		</div>
	</div>
</body>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/profile_user/update_profile_user.js"></script>


</html>