<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/base.css" />

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/global.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/notify.css" />
</head>

<style>
.body {
	overflow: hidden;
}

.container_message {
	padding-top: calc(var(--height-default-header));
	width: 1165px;
	margin: auto;
	display: flex;
	height: calc(100vh);
}

.message_left {
	border-right: 1px solid var(--border-color);
	border-left: 1px solid var(--border-color);
	padding: 16px;
	width: 330px;
}

.message_right {
	flex: 1;
	overflow: hidden;
}

.message_left_header {
	margin-bottom: 23px;
}

.message_left_list {
	overflow-y: auto;
	overflow-x: hidden;
	max-height: 99%;
}

.message_left_item, .message_right_item {
	display: flex;
	align-items: center;
	margin-bottom: 9px;
	cursor: pointer;
	border-radius: 9px;
	padding: 9px 16px;
	width: 296px;
	max-width: 296px;
	position: relative;
}

.message_left_item:hover {
	background-color: var(--hover-color);
}

.message_left_item_name, .message_right_item_name {
	margin-left: 9px;
}

.message_left_item_image, .message_right_item_image {
	width: 43px;
	height: 43px;
	border-radius: 999px;
	border: 1px solid var(--border-color);
}

.message_right {
	border-right: 1px solid var(--border-color);
}

.message_right_header {
	border-bottom: 1px solid var(--border-color);
}

.message_right_chat {
	display: flex;
	flex-direction: column;
	height: 629px;
}

.message_right_chat_message {
	flex: 1;
}

.message_right_chat_write {
	height: 39px;
}

.message_right_chat_write_content {
	white-space: pre-wrap;
	overflow-wrap: anywhere;
	outline: none;
	border-bottom: 2px solid var(--border-color-with-background-grey);
	padding: 3px 0px;
	outline: none;
	max-height: 39px;
	overflow-y: auto;
}

.message_right_chat_write_content:empty:before {
	content: 'Soạn tin nhắn...';
	color: var(--text-bland);
	cursor: text;
	outline: none;
}

.message_right_chat_write {
	position: relative;
}

.message_right_chat_write_message {
	width: 100%;
	height: 100%;
	border: 1px solid var(--border-color);
	padding: 3px 16px;
	font-size: 1.6rem;
	line-height: 1.6rem;
	padding-right: 46px;
}

.message_right_chat_write_send {
	position: absolute;
	right: 0px;
	bottom: 0px;
	cursor: pointer;
	height: 39px;
	width: 33px;
	display: flex;
	align-items: center;
	bottom: 0px;
	cursor: pointer;
	height: 39px;
	width: 33px;
	display: flex;
	cursor: pointer;
	height: 39px;
	width: 33px;
	display: flex;
	height: 39px;
	width: 33px;
	display: flex;
}

.message_right_chat_message {
	position: relative;
	position: relative;
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	height: 100%;
	overflow-y: auto;
}

.message_right_chat_message_other {
	width: fit-content;
	padding: 6px 16px;
	background-color: #4fbbe3;
	color: #fff;
	border-radius: 999px;
	margin: 16px;
	max-width: 416px;
}

.message_right_chat_message_my_wrapper {
	display: flex;
	margin: 16px;
	justify-content: end;
}

.message_right_chat_message_my {
	width: fit-content;
	background-color: #b7b8b9;
	color: #fff;
	padding: 6px 16px;
	border-radius: 999px;
	right: 0;
	max-width: 416px;
}

.countNewMessage {
	position: absolute;
	background-color: #ed2626;
	color: #fff;
	border-radius: 999px;
	width: 19px;
	height: 19px;
	font-size: 1.4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 600;
	right: 10px;
	bottom: 23px;
}
</style>

<body>
	<!-- 	Start Header -->
	<jsp:include page="./layout/Header.jsp"></jsp:include>
	<!-- 	End Header -->

	<div class="container_message">
		<div class="message_left">
			<h3 class="message_left_header">Người dùng</h3>
			<div id="message_left_list" class="message_left_list">
				<!-- 				<div class="message_left_item"> -->
				<!-- 					<img class="message_left_item_image" alt="" -->
				<!-- 						src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"> -->
				<!-- 					<div class="message_left_item_name">Nam Văn</div> -->
				<!-- 				</div> -->
			</div>
		</div>
		<div id="message_right" class="message_right">

			<div
				style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; font-size: 2.3rem; flex-direction: column;">
				<img style="width: 130px; margin-bottom: 16px;" alt=""
					src="/SGU_SOCIAL_NETWORK/assets/images/logo.png">
				<div>Chào mừng bạn đến với trò chuyện qua mạng xã hội SGU.</div>
			</div>

			<!-- 			<div class="message_right_header"> -->
			<!-- 				<div class="message_right_item"> -->
			<!-- 					<img class="message_right_item_image" alt="" -->
			<!-- 						src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg"> -->
			<!-- 					<div class="message_right_item_name">Nam Văn</div> -->
			<!-- 				</div> -->
			<!-- 			</div> -->

			<!-- 			<div class="message_right_chat"> -->
			<!-- 				<div class="message_right_chat_message"> -->
			<!-- 					<div class="message_right_chat_message_other">ê mày</div> -->
			<!-- 					<div class="message_right_chat_message_other">ê mày</div> -->

			<!-- 					<div class="message_right_chat_message_my_wrapper"> -->
			<!-- 						<div class="message_right_chat_message_my">sao thế</div> -->
			<!-- 					</div> -->
			<!-- 				</div> -->
			<!-- 				<div class="message_right_chat_write"> -->
			<!-- 					<input class="message_right_chat_write_message" type="text" -->
			<!-- 						value="" placeholder="Soạn tin nhắn..." /> -->
			<!-- 					<div class="message_right_chat_write_send"> -->
			<!-- 						<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" -->
			<!-- 							viewBox="0 0 512 512"> -->
			<!-- 						!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc. -->
			<!-- 						<path -->
			<!-- 								d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" /></svg> -->
			<!-- 					</div> -->
			<!-- 				</div> -->
			<!-- 			</div> -->
		</div>
	</div>
</body>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/Search.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/main.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/message/MessageBox.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/message/message.js"></script>

</html>