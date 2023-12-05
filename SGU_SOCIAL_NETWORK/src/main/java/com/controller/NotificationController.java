package com.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Pattern;

import com.dao.NotificationDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.model.NotificationModel;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet({ "/api/notification/read", "/api/notification/create_post_notifiation", "/api/notification/delete",
		"/api/notification/get", "/api/notification/like_post", "/api/notification/send_friend_request",
		"/api/notification/accept_friend", "/api/notification/comment", "/api/notification/like_comment",
		"/api/notification/reply_comment", })
public class NotificationController extends HttpServlet {

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String uri = req.getRequestURI();
		if (uri.contains("/api/notification/read")) {
			this.doRead(req, resp);
		} else if (uri.contains("/api/notification/create_post_notifiation")) {
			this.doCreatePostNotification(req, resp);
		} else if (uri.contains("/api/notification/delete")) {
			this.doDeleteNotification(req, resp);
		} else if (uri.contains("/api/notification/get")) {
			this.doGetNotification(req, resp);
		} else if (uri.contains("/api/notification/like_post")) {
			this.likePost(req, resp);
		} else if (uri.contains("/api/notification/send_friend_request")) {
			this.sendFriendRequest(req, resp);
		} else if (uri.contains("/api/notification/accept_friend")) {
			this.acceptFriend(req, resp);
		} else if (uri.contains("/api/notification/comment")) {
			this.comment(req, resp);
		} else if (uri.contains("/api/notification/reply_comment")) {
			this.replyComment(req, resp);
		} else if (uri.contains("/api/notification/like_comment")) {
			this.likeComment(req, resp);
		}

	}

	protected void doRead(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String userID = jsonNode.get("userID").asText();

		NotificationDAO notification = new NotificationDAO();

		String jsonResponse = objectMapper.writeValueAsString(notification.readNotification(Integer.parseInt(userID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doCreatePostNotification(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String refID = jsonNode.get("refID").asText();
		String userID = jsonNode.get("userID").asText();
		String rootID = jsonNode.get("rootID").asText();
		String title = jsonNode.get("title").asText();
		String firstName = jsonNode.get("firstName").asText();
		String lastName = jsonNode.get("lastName").asText();

		NotificationDAO notification = new NotificationDAO();

		NotificationModel notifyModel = new NotificationModel();
		notifyModel.setContent(firstName.replaceAll(Pattern.quote("+"), " ") + " "
				+ lastName.replaceAll(Pattern.quote("+"), " ") + " người mà bạn theo dõi đã thêm bài viết mới");
		notifyModel.setTitle(title);
		notifyModel.setRefID(Integer.parseInt(refID));
		notifyModel.setUserID(Integer.parseInt(userID));
		notifyModel.setRootID(Integer.parseInt(rootID));

		String jsonResponse = objectMapper.writeValueAsString(notification.createPostNotification(notifyModel));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void likePost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String refID = jsonNode.get("refID").asText();
		String userID = jsonNode.get("userID").asText();
		String rootID = jsonNode.get("rootID").asText();
		String title = jsonNode.get("title").asText();
		String firstName = jsonNode.get("firstName").asText();
		String lastName = jsonNode.get("lastName").asText();

		NotificationDAO notification = new NotificationDAO();

		NotificationModel notifyModel = new NotificationModel();
		notifyModel.setContent(firstName.replaceAll(Pattern.quote("+"), " ") + " "
				+ lastName.replaceAll(Pattern.quote("+"), " ") + " yêu thích bài viết của bạn.");
		notifyModel.setTitle(title);
		notifyModel.setRefID(Integer.parseInt(refID));
		notifyModel.setUserID(Integer.parseInt(userID));
		notifyModel.setRootID(Integer.parseInt(rootID));

		String jsonResponse = objectMapper.writeValueAsString(notification.createNotification(notifyModel));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void sendFriendRequest(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String refID = jsonNode.get("refID").asText();
		String userID = jsonNode.get("userID").asText();
		String rootID = jsonNode.get("rootID").asText();
		String title = jsonNode.get("title").asText();
		String firstName = jsonNode.get("firstName").asText();
		String lastName = jsonNode.get("lastName").asText();

		NotificationDAO notification = new NotificationDAO();

		NotificationModel notifyModel = new NotificationModel();
		notifyModel.setContent(firstName.replaceAll(Pattern.quote("+"), " ") + " "
				+ lastName.replaceAll(Pattern.quote("+"), " ") + " đã gửi lời mời kết bạn.");
		notifyModel.setTitle(title);
		notifyModel.setRefID(Integer.parseInt(refID));
		notifyModel.setUserID(Integer.parseInt(userID));
		notifyModel.setRootID(Integer.parseInt(rootID));

		String jsonResponse = objectMapper.writeValueAsString(notification.createNotification(notifyModel));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void acceptFriend(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String refID = jsonNode.get("refID").asText();
		String userID = jsonNode.get("userID").asText();
		String rootID = jsonNode.get("rootID").asText();
		String title = jsonNode.get("title").asText();
		String firstName = jsonNode.get("firstName").asText();
		String lastName = jsonNode.get("lastName").asText();

		NotificationDAO notification = new NotificationDAO();

		NotificationModel notifyModel = new NotificationModel();
		notifyModel.setContent(firstName.replaceAll(Pattern.quote("+"), " ") + " "
				+ lastName.replaceAll(Pattern.quote("+"), " ") + " và bạn đã trở thành bạn bè.");
		notifyModel.setTitle(title);
		notifyModel.setRefID(Integer.parseInt(refID));
		notifyModel.setUserID(Integer.parseInt(userID));
		notifyModel.setRootID(Integer.parseInt(rootID));

		String jsonResponse = objectMapper.writeValueAsString(notification.createNotification(notifyModel));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void comment(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String refID = jsonNode.get("refID").asText();
		String userID = jsonNode.get("userID").asText();
		String rootID = jsonNode.get("rootID").asText();
		String title = jsonNode.get("title").asText();
		String firstName = jsonNode.get("firstName").asText();
		String lastName = jsonNode.get("lastName").asText();
		String content = jsonNode.get("content").asText();

		NotificationDAO notification = new NotificationDAO();

		NotificationModel notifyModel = new NotificationModel();
		notifyModel.setContent(
				firstName.replaceAll(Pattern.quote("+"), " ") + " " + lastName.replaceAll(Pattern.quote("+"), " ")
						+ " đã bình luận về bài viết của bạn: `" + content + "`");
		notifyModel.setTitle(title);
		notifyModel.setRefID(Integer.parseInt(refID));
		notifyModel.setUserID(Integer.parseInt(userID));
		notifyModel.setRootID(Integer.parseInt(rootID));

		String jsonResponse = objectMapper.writeValueAsString(notification.createNotification(notifyModel));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void replyComment(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String refID = jsonNode.get("refID").asText();
		String userID = jsonNode.get("userID").asText();
		String rootID = jsonNode.get("rootID").asText();
		String title = jsonNode.get("title").asText();
		String firstName = jsonNode.get("firstName").asText();
		String lastName = jsonNode.get("lastName").asText();

		NotificationDAO notification = new NotificationDAO();

		NotificationModel notifyModel = new NotificationModel();
		notifyModel.setContent(firstName.replaceAll(Pattern.quote("+"), " ") + " "
				+ lastName.replaceAll(Pattern.quote("+"), " ") + " đã trả lời bình luận của bạn.");
		notifyModel.setTitle(title);
		notifyModel.setRefID(Integer.parseInt(refID));
		notifyModel.setUserID(Integer.parseInt(userID));
		notifyModel.setRootID(Integer.parseInt(rootID));

		String jsonResponse = objectMapper.writeValueAsString(notification.createNotification(notifyModel));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void likeComment(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String refID = jsonNode.get("refID").asText();
		String userID = jsonNode.get("userID").asText();
		String rootID = jsonNode.get("rootID").asText();
		String title = jsonNode.get("title").asText();
		String firstName = jsonNode.get("firstName").asText();
		String lastName = jsonNode.get("lastName").asText();

		NotificationDAO notification = new NotificationDAO();

		NotificationModel notifyModel = new NotificationModel();
		notifyModel.setContent(firstName.replaceAll(Pattern.quote("+"), " ") + " "
				+ lastName.replaceAll(Pattern.quote("+"), " ") + " đã thích bình luận của bạn.");
		notifyModel.setTitle(title);
		notifyModel.setRefID(Integer.parseInt(refID));
		notifyModel.setUserID(Integer.parseInt(userID));
		notifyModel.setRootID(Integer.parseInt(rootID));

		String jsonResponse = objectMapper.writeValueAsString(notification.createNotification(notifyModel));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doDeleteNotification(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String notifyID = jsonNode.get("notifyID").asText();

		NotificationDAO notification = new NotificationDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(notification.deleteNotification(Integer.parseInt(notifyID)));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doGetNotification(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String userID = jsonNode.get("userID").asText();

		NotificationDAO notification = new NotificationDAO();

		String jsonResponse = objectMapper.writeValueAsString(notification.getNotification(Integer.parseInt(userID)));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}
}
