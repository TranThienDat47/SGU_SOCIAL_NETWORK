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
public class PostController extends HttpServlet {
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String action = jsonNode.get("action").asText();
		System.out.println(action + " " + action.trim().equals("searchPost"));
		if (action.trim().equals("getOnePost")) {
			String postID = jsonNode.get("postID").asText();

			PostDAO post = new PostDAO();

			String jsonResponse = objectMapper.writeValueAsString(post.getOnePost(Integer.parseInt(postID)));
			PrintWriter out = resp.getWriter();
			out.println(jsonResponse);

			return;
		} else if (action.trim().equals("searchPost")) {
			String limitValue = jsonNode.get("limitValue").asText();
			String offsetValue = jsonNode.get("offsetValue").asText();
			String searchValue = jsonNode.get("searchValue").asText();

			PostDAO posts = new PostDAO();

			String jsonResponse = objectMapper.writeValueAsString(
					posts.searchPost(Integer.parseInt(offsetValue), Integer.parseInt(limitValue), searchValue));
			PrintWriter out = resp.getWriter();
			out.println(jsonResponse);

			return;
		}

	}

//	@Override
//	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//		resp.setContentType("application/json; charset=UTF-8");
//
//		ObjectMapper objectMapper = new ObjectMapper();
//		JsonNode jsonNode = objectMapper.readTree(req.getReader());
//
//		String limitValue = jsonNode.get("limitValue").asText();
//		String offsetValue = jsonNode.get("offsetValue").asText();
//		String searchValue = jsonNode.get("searchValue").asText();
//
//		PostDAO posts = new PostDAO();
//
//		String jsonResponse = objectMapper.writeValueAsString(
//				posts.searchPost(Integer.parseInt(offsetValue), Integer.parseInt(limitValue), searchValue));
//		PrintWriter out = resp.getWriter();
//		out.println(jsonResponse);
//
//	}
}
