package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import com.dao.LikeCommentDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet({ "/api/like_comment/like", "/api/like_comment/dislike", "/api/like_comment/get_like",
		"/api/like_comment/check_like" })
public class LikeCommentController extends HttpServlet {

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String uri = req.getRequestURI();
		if (uri.contains("/api/like_comment/like")) {
			this.doLike(req, resp);
		} else if (uri.contains("/api/like_comment/dislike")) {
			this.doDisLike(req, resp);
		} else if (uri.contains("/api/like_comment/get_like")) {
			this.doGetLike(req, resp);
		} else if (uri.contains("/api/like_comment/check_like")) {
			this.doCheckLike(req, resp);
		}
	}

	protected void doLike(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String commentID = jsonNode.get("commentID").asText();
		String userID = jsonNode.get("userID").asText();

		LikeCommentDAO like_comment = new LikeCommentDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(like_comment.likeComment(Integer.parseInt(userID), Integer.parseInt(commentID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doDisLike(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String commentID = jsonNode.get("commentID").asText();
		String userID = jsonNode.get("userID").asText();

		LikeCommentDAO like_comment = new LikeCommentDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(like_comment.disLikeComment(Integer.parseInt(userID), Integer.parseInt(commentID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doGetLike(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String commentID = jsonNode.get("commentID").asText();

		LikeCommentDAO like_comment = new LikeCommentDAO();

		String jsonResponse = objectMapper.writeValueAsString(like_comment.getLikeComment(Integer.parseInt(commentID)));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doCheckLike(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String commentID = jsonNode.get("commentID").asText();
		String userID = jsonNode.get("userID").asText();

		LikeCommentDAO like_comment = new LikeCommentDAO();

		String jsonResponse = objectMapper.writeValueAsString(
				like_comment.checkLikeComment(Integer.parseInt(userID), Integer.parseInt(commentID)));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}
}
