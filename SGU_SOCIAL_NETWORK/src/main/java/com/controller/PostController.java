package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import com.dao.PostDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.model.PostModel;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet({ "/api/post/search_post_value_search", "/api/post/search_post_value_with_friend", "/api/post/get_one",
		"/api/post/create_post", "/api/post/search_post_of_user" })
public class PostController extends HttpServlet {

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String uri = req.getRequestURI();
		if (uri.contains("search_post_value_search")) {
			this.doSearch(req, resp);
		} else if (uri.contains("get_one")) {
			this.doGetOne(req, resp);
		} else if (uri.contains("create_post")) {
			this.doCreate(req, resp);
		} else if (uri.contains("search_post_of_user")) {
			this.doSearchOfUser(req, resp);
		} else if (uri.contains("search_post_value_with_friend")) {
			this.doSearchWithFriend(req, resp);
		}

	}

	protected void doSearchWithFriend(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String limitValue = jsonNode.get("limitValue").asText();
		String offsetValue = jsonNode.get("offsetValue").asText();
		String searchValue = jsonNode.get("searchValue").asText();
		String userID = jsonNode.get("userID").asText();

		PostDAO posts = new PostDAO();

		String jsonResponse = objectMapper.writeValueAsString(posts.searchPostWithFriend(Integer.parseInt(offsetValue),
				Integer.parseInt(limitValue), searchValue, Integer.parseInt(userID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doSearch(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String limitValue = jsonNode.get("limitValue").asText();
		String offsetValue = jsonNode.get("offsetValue").asText();
		String searchValue = jsonNode.get("searchValue").asText();

		PostDAO posts = new PostDAO();

		String jsonResponse = objectMapper.writeValueAsString(
				posts.searchPost(Integer.parseInt(offsetValue), Integer.parseInt(limitValue), searchValue));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doSearchOfUser(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String limitValue = jsonNode.get("limitValue").asText();
		String offsetValue = jsonNode.get("offsetValue").asText();
		String userID = jsonNode.get("userID").asText();

		PostDAO posts = new PostDAO();

		String jsonResponse = objectMapper.writeValueAsString(posts.searchPostOfUser(Integer.parseInt(offsetValue),
				Integer.parseInt(limitValue), Integer.parseInt(userID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doGetOne(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String postID = jsonNode.get("postID").asText();

		PostDAO post = new PostDAO();

		String jsonResponse = objectMapper.writeValueAsString(post.getOnePost(Integer.parseInt(postID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);

	}

	protected void doCreate(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String authorID = "";
		String privacySettingID = "";
		String content = "";
		String image1 = "";
		String image2 = "";
		String image3 = "";
		String image4 = "";

		if (jsonNode.has("authorID") && !jsonNode.get("authorID").isNull()) {
			authorID = jsonNode.get("authorID").asText();
		}

		if (jsonNode.has("privacySettingID") && !jsonNode.get("privacySettingID").isNull()) {
			privacySettingID = jsonNode.get("privacySettingID").asText();
		}

		if (jsonNode.has("content") && !jsonNode.get("content").isNull()) {
			content = jsonNode.get("content").asText();
		}

		if (jsonNode.has("image1") && !jsonNode.get("image1").isNull()) {
			image1 = jsonNode.get("image1").asText();
		}

		if (jsonNode.has("image2") && !jsonNode.get("image2").isNull()) {
			image2 = jsonNode.get("image2").asText();
		}

		if (jsonNode.has("image3") && !jsonNode.get("image3").isNull()) {
			image3 = jsonNode.get("image3").asText();
		}

		if (jsonNode.has("image4") && !jsonNode.get("image4").isNull()) {
			image4 = jsonNode.get("image4").asText();
		}

		if (authorID.length() <= 0 && privacySettingID.length() <= 0) {
			String jsonResponse = objectMapper
					.writeValueAsString("{success: false, message: Bạn cần xác thực tài khoản!}");
			PrintWriter out = resp.getWriter();
			out.println(jsonResponse);
			return;
		}

		PostModel post = new PostModel();
		post.setAuthorID(Integer.parseInt(authorID));
		post.setPrivacySettingID(Integer.parseInt(privacySettingID));
		post.setContent(content);
		post.setImage1(image1);
		post.setImage2(image2);
		post.setImage3(image3);
		post.setImage4(image4);

		PostDAO postDAO = new PostDAO();

		int tempRefID = postDAO.createPost(post);

		if (tempRefID > 0) {
			String jsonResponse = objectMapper
					.writeValueAsString("{\"success\": true, \"refID\": \"" + tempRefID + "\", \"message\": \"Tạo bài viết thành công!\"}");
			PrintWriter out = resp.getWriter();
			out.println(jsonResponse);

			return;
		} else {
			String jsonResponse = objectMapper.writeValueAsString("{success: false, message: Tạo bài viết thất bại!}");
			PrintWriter out = resp.getWriter();
			out.println(jsonResponse);
			return;
		}

	}
}

//	@Override
//	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//		resp.setContentType("application/json; charset=UTF-8");
//
//		ObjectMapper objectMapper = new ObjectMapper();
//		JsonNode jsonNode = objectMapper.readTree(req.getReader());
//
//		String action = jsonNode.get("action").asText();
//		if (action.trim().equals("getOnePost")) {
//			String postID = jsonNode.get("postID").asText();
//
//			PostDAO post = new PostDAO();
//
//			String jsonResponse = objectMapper.writeValueAsString(post.getOnePost(Integer.parseInt(postID)));
//			PrintWriter out = resp.getWriter();
//			out.println(jsonResponse);
//
//			return;
//		} else if (action.trim().equals("searchPost")) {
//			String limitValue = jsonNode.get("limitValue").asText();
//			String offsetValue = jsonNode.get("offsetValue").asText();
//			String searchValue = jsonNode.get("searchValue").asText();
//
//			PostDAO posts = new PostDAO();
//
//			String jsonResponse = objectMapper.writeValueAsString(
//					posts.searchPost(Integer.parseInt(offsetValue), Integer.parseInt(limitValue), searchValue));
//			PrintWriter out = resp.getWriter();
//			out.println(jsonResponse);
//
//			return;
//		}
//
//	}

//	@Override
//	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//		resp.setContentType("application/json; charset=UTF-8");
//		ObjectMapper objectMapper = new ObjectMapper();
//		JsonNode jsonNode = objectMapper.readTree(req.getReader());
//		String authorID = jsonNode.get("authorID").asText();
//
//		String privacySettingID = jsonNode.get("privacySettingID").asText();
//		String content = jsonNode.get("content").asText();
//		String image1 = jsonNode.get("image1").asText();
//		String image2 = jsonNode.get("image2").asText();
//		String image3 = jsonNode.get("image3").asText();
//		String image4 = jsonNode.get("image4").asText();
//
//	}
