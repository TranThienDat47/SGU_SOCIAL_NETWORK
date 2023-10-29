package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import com.dao.PostDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet({ "/api/post" })
public class PostServlet extends HttpServlet {
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String postID = jsonNode.get("postID").asText();

		PostDAO post = new PostDAO(null);

		post.getPost(Integer.parseInt(postID));

		String jsonResponse = objectMapper.writeValueAsString(post.getPost());
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);

	}
}
