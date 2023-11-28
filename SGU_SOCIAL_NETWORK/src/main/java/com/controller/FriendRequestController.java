package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import com.dao.FriendDAO;
import com.dao.FriendRequestDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.util.CookieUtils;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet({ "/api/friend_request/accept_friend_request", "/api/friend_request/deny_add_friend_request",
		"/api/friend_request/add_friend_request", "/api/friend_request/search_friend_reuqest",
		"/api/friend_request/search_reuqest_send", "/api/friend_request/check_send_request" })
public class FriendRequestController extends HttpServlet {
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String uri = req.getRequestURI();
		if (uri.contains("/api/friend_request/search_friend_reuqest")) {
			this.doSearch(req, resp);
		} else if (uri.contains("/api/friend_request/accept_friend_request")) {
			this.doAcceptFriend(req, resp);
		} else if (uri.contains("/api/friend_request/deny_add_friend_request")) {
			this.doDenyAddFriend(req, resp);
		} else if (uri.contains("/api/friend_request/add_friend_request")) {
			this.doAddFriend(req, resp);
		} else if (uri.contains("/api/friend_request/search_reuqest_send")) {
			this.doSearchFriendRequestSend(req, resp);
		} else if (uri.contains("/api/friend_request/check_send_request")) {
			this.doCheckSendRequest(req, resp);
		}
	}

	protected void doCheckSendRequest(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String valueID = jsonNode.get("valueID").asText();
		String userID = jsonNode.get("userID").asText();

		FriendRequestDAO friends = new FriendRequestDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(friends.checkIsSendRequest(Integer.parseInt(valueID), Integer.parseInt(userID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doSearch(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String limitValue = jsonNode.get("limitValue").asText();
		String offsetValue = jsonNode.get("offsetValue").asText();
		String userID = jsonNode.get("userID").asText();

		FriendRequestDAO friends = new FriendRequestDAO();

		String jsonResponse = objectMapper.writeValueAsString(friends.searchFriendOfUser(Integer.parseInt(offsetValue),
				Integer.parseInt(limitValue), Integer.parseInt(userID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doSearchFriendRequestSend(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String limitValue = jsonNode.get("limitValue").asText();
		String offsetValue = jsonNode.get("offsetValue").asText();
		String userID = jsonNode.get("userID").asText();

		FriendRequestDAO friends = new FriendRequestDAO();

		String jsonResponse = objectMapper.writeValueAsString(friends.searchFriendRequestSend(
				Integer.parseInt(offsetValue), Integer.parseInt(limitValue), Integer.parseInt(userID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doAcceptFriend(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String friendRequestID = jsonNode.get("friendRequestID").asText();
		String requestID = jsonNode.get("requestID").asText();
		String userID = jsonNode.get("userID").asText();

		FriendRequestDAO friendRequest = new FriendRequestDAO();
		FriendDAO friend = new FriendDAO();

		boolean result = false;

		if (friendRequest.acceptRequest(Integer.parseInt(userID), Integer.parseInt(requestID))) {
			result = friend.addFriend(Integer.parseInt(userID), Integer.parseInt(requestID));
		}

		String jsonResponse = objectMapper.writeValueAsString(result);
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doAddFriend(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String requestID = jsonNode.get("requestID").asText();
		String userID = jsonNode.get("userID").asText();

		FriendRequestDAO friendRequest = new FriendRequestDAO();

		if (!friendRequest.checkIsSendRequest(Integer.parseInt(userID), Integer.parseInt(requestID))) {
			String jsonResponse = objectMapper.writeValueAsString(
					friendRequest.addFriendRequest(Integer.parseInt(userID), Integer.parseInt(requestID)));
			PrintWriter out = resp.getWriter();
			out.println(jsonResponse);
		} else {
			PrintWriter out = resp.getWriter();
			out.println(true);
		}
	}

	protected void doDenyAddFriend(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String requestID = jsonNode.get("requestID").asText();
		String userID = jsonNode.get("userID").asText();

		FriendRequestDAO friendRequest = new FriendRequestDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(friendRequest.denyAddFriend(Integer.parseInt(userID), Integer.parseInt(requestID)));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}
}
