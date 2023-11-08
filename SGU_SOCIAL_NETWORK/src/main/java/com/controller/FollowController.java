package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import com.dao.FollowDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet({ "/api/follow/add_follow", "/api/follow/unfollow", "/api/follow/search_follow" })
public class FollowController extends HttpServlet {
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String uri = req.getRequestURI();
		if (uri.contains("/api/follow/search_follow")) {
			this.doSearch(req, resp);
		} else if (uri.contains("/api/follow/add_follow")) {
			this.doAddFollow(req, resp);
		} else if (uri.contains("/api/follow/unfollow")) {
			this.doUnfollow(req, resp);
		}
	}

	protected void doSearch(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String limitValue = jsonNode.get("limitValue").asText();
		String offsetValue = jsonNode.get("offsetValue").asText();
		String userID = jsonNode.get("userID").asText();

		FollowDAO follows = new FollowDAO();

		String jsonResponse = objectMapper.writeValueAsString(follows.searchUserFollow(Integer.parseInt(offsetValue),
				Integer.parseInt(limitValue), Integer.parseInt(userID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doAddFollow(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String followID = jsonNode.get("followID").asText();
		String userID = jsonNode.get("userID").asText();

		FollowDAO follow = new FollowDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(follow.addFollow(Integer.parseInt(userID), Integer.parseInt(followID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doUnfollow(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String followID = jsonNode.get("followID").asText();
		String userID = jsonNode.get("userID").asText();

		FollowDAO follow = new FollowDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(follow.unfollow(Integer.parseInt(userID), Integer.parseInt(followID)));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}
}
