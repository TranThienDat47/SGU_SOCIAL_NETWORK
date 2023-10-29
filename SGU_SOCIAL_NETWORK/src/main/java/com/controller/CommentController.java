package com.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.dao.CommentDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet({ "/api/comment" })
public class CommentController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String parentID = jsonNode.get("parentID").asText();

		CommentDAO listComment = new CommentDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(listComment.getCommentWithParentID(Integer.parseInt(parentID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);

	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		int parentID = Integer.parseInt(jsonNode.get("parentID").asText());
		int userID = Integer.parseInt(jsonNode.get("userID").asText());
		String content = jsonNode.get("content").asText();

		CommentDAO comment = new CommentDAO();

		String responseJson = objectMapper.writeValueAsString(comment.addComment(parentID, userID, content));
		PrintWriter out = resp.getWriter();
		out.println(responseJson);
	}

}
