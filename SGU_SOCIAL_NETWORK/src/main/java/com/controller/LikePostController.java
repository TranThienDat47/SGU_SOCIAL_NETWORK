package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import com.dao.LikePostDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet({ "/api/like_post/like", "/api/like_post/dislike", "/api/like_post/get_like", "/api/like_post/check_like" })
public class LikePostController extends HttpServlet {

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String uri = req.getRequestURI();
		if (uri.contains("/api/like_post/like")) {
			this.doLike(req, resp);
		} else if (uri.contains("/api/like_post/dislike")) {
			this.doDisLike(req, resp);
		} else if (uri.contains("/api/like_post/get_like")) {
			this.doGetLike(req, resp);
		} else if (uri.contains("/api/like_post/check_like")) {
			this.doCheckLike(req, resp);
		}
	}

	protected void doLike(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String postID = jsonNode.get("postID").asText();
		String userID = jsonNode.get("userID").asText();

		System.out.println(Integer.parseInt(userID) + " " + Integer.parseInt(postID));

		LikePostDAO like_post = new LikePostDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(like_post.likePost(Integer.parseInt(userID), Integer.parseInt(postID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doDisLike(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String postID = jsonNode.get("postID").asText();
		String userID = jsonNode.get("userID").asText();

		LikePostDAO like_post = new LikePostDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(like_post.disLikePost(Integer.parseInt(userID), Integer.parseInt(postID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doGetLike(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String postID = jsonNode.get("postID").asText();

		LikePostDAO like_post = new LikePostDAO();

		String jsonResponse = objectMapper.writeValueAsString(like_post.getLikePost(Integer.parseInt(postID)));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doCheckLike(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String postID = jsonNode.get("postID").asText();
		String userID = jsonNode.get("userID").asText();

		LikePostDAO like_post = new LikePostDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(like_post.checkLikePost(Integer.parseInt(userID), Integer.parseInt(postID)));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}
}
