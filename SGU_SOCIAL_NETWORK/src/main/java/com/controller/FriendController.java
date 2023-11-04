package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet({ "/api/friend/add_friend", "/api/friend/cancle_add_friend", "/api/friend/search_friend" })
public class FriendController extends HttpServlet {
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String uri = req.getRequestURI();
		if (uri.contains("search_friend")) {
			this.doSearch(req, resp);
		} else if (uri.contains("add_friend")) {
			this.doAddFriend(req, resp);
		} else if (uri.contains("cancle_add_friend")) {
			this.doCancleAddFriend(req, resp);
		}

	}

	protected void doSearch(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");
//
//		ObjectMapper objectMapper = new ObjectMapper();
//		JsonNode jsonNode = objectMapper.readTree(req.getReader());
//
//		String limitValue = jsonNode.get("limitValue").asText();
//		String offsetValue = jsonNode.get("offsetValue").asText();
//		String searchValue = jsonNode.get("searchValue").asText();
//
//		String jsonResponse = objectMapper.writeValueAsString();
//		PrintWriter out = resp.getWriter();
//		out.println(jsonResponse);
	}

	protected void doAddFriend(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");
//
//		ObjectMapper objectMapper = new ObjectMapper();
//		JsonNode jsonNode = objectMapper.readTree(req.getReader());
//
//		String limitValue = jsonNode.get("limitValue").asText();
//		String offsetValue = jsonNode.get("offsetValue").asText();
//		String searchValue = jsonNode.get("searchValue").asText();
//
//		String jsonResponse = objectMapper.writeValueAsString();
//		PrintWriter out = resp.getWriter();
//		out.println(jsonResponse);
	}

	protected void doCancleAddFriend(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");
//
//		ObjectMapper objectMapper = new ObjectMapper();
//		JsonNode jsonNode = objectMapper.readTree(req.getReader());
//
//		String limitValue = jsonNode.get("limitValue").asText();
//		String offsetValue = jsonNode.get("offsetValue").asText();
//		String searchValue = jsonNode.get("searchValue").asText();
//
//		String jsonResponse = objectMapper.writeValueAsString();
//		PrintWriter out = resp.getWriter();
//		out.println(jsonResponse);
	}
}
