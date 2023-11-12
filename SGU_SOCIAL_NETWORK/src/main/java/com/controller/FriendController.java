package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import com.dao.FriendDAO;
import com.dao.UserDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.util.CookieUtils;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet({ "/api/friend/unfriend", "/api/friend/search_friend", "/api/friend/search_value_friend",
		"/api/friend/search_with_friend_value", "/api/friend/search_user" })
public class FriendController extends HttpServlet {
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String uri = req.getRequestURI();
		if (uri.contains("/api/friend/search_friend")) {
			this.doSearch(req, resp);
		} else if (uri.contains("/api/friend/unfriend")) {
			this.doUnfriend(req, resp);
		} else if (uri.contains("/api/friend/search_value_friend")) {
			this.doSearchValue(req, resp);
		} else if (uri.contains("/api/friend/search_with_friend_value")) {
			this.doSearchValueWithFriend(req, resp);
		}
	}

	protected void doSearchValueWithFriend(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String limitValue = jsonNode.get("limitValue").asText();
		String offsetValue = jsonNode.get("offsetValue").asText();
		String searchValue = jsonNode.get("searchValue").asText();

		UserDAO friends = new UserDAO();

		String jsonResponse = objectMapper.writeValueAsString(friends.searchUserWithFriend(
				Integer.parseInt(CookieUtils.get("id", req)), Integer.parseInt(offsetValue),
				Integer.parseInt(limitValue), searchValue.trim().replaceAll("\\s+", " ")));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doSearchValue(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String limitValue = jsonNode.get("limitValue").asText();
		String offsetValue = jsonNode.get("offsetValue").asText();
		String searchValue = jsonNode.get("searchValue").asText();

		UserDAO friends = new UserDAO();

		String jsonResponse = objectMapper.writeValueAsString(
				friends.searchUser(Integer.parseInt(CookieUtils.get("id", req)), Integer.parseInt(offsetValue),
						Integer.parseInt(limitValue), searchValue.trim().replaceAll("\\s+", " ")));
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

		FriendDAO friends = new FriendDAO();

		String jsonResponse = objectMapper.writeValueAsString(friends.searchFriendOfUser(Integer.parseInt(offsetValue),
				Integer.parseInt(limitValue), Integer.parseInt(userID), Integer.parseInt(CookieUtils.get("id", req))));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doUnfriend(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String friendID = jsonNode.get("friendID").asText();
		String userID = jsonNode.get("userID").asText();

		FriendDAO friend = new FriendDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(friend.unfriend(Integer.parseInt(userID), Integer.parseInt(friendID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

}
