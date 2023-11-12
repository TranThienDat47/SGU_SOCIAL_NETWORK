package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import com.dao.UserDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.model.UserModel;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet({ "/api/user/search_recommend_friend", "/api/user/update_profile_user", "/get_one_user",
		"/api/user/update_avata", "/api/user/update_background" })
public class UserController extends HttpServlet {
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String uri = req.getRequestURI();
		if (uri.contains("/api/user/search_recommend_friend")) {
			this.doSearch(req, resp);
		} else if (uri.contains("/api/user/update_profile_user")) {
			this.doUpdateProfileUser(req, resp);
		} else if (uri.contains("/get_one_user")) {
			this.doGetOneUser(req, resp);
		} else if (uri.contains("/api/user/update_avata")) {
			this.doUpdateAvata(req, resp);
		} else if (uri.contains("/api/user/update_background")) {
			this.doUpdateBackground(req, resp);
		}

	}

	protected void doSearch(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String limitValue = jsonNode.get("limitValue").asText();
		String offsetValue = jsonNode.get("offsetValue").asText();
		String userID = jsonNode.get("userID").asText();

		UserDAO users = new UserDAO();

		String jsonResponse = objectMapper.writeValueAsString(users.recommendFriend(Integer.parseInt(offsetValue),
				Integer.parseInt(limitValue), Integer.parseInt(userID)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doUpdateProfileUser(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String userID = jsonNode.get("userID").asText();
		String firstName = jsonNode.get("firstName").asText();
		String lastName = jsonNode.get("lastName").asText();
		String gender = jsonNode.get("gender").asText();
		String dayOfBirth = jsonNode.get("dayOfBirth").asText();
		String address = jsonNode.get("address").asText();
		String phoneNumber = jsonNode.get("phoneNumber").asText();
		String biography = jsonNode.get("biography").asText();

		UserDAO users = new UserDAO();
		UserModel user = new UserModel();

		user.setId(Integer.parseInt(userID));
		user.setAddress(address.trim());
		user.setBiography(biography.trim());
		user.setDateOfBirth(dayOfBirth);
		user.setGender(Boolean.parseBoolean(gender.trim()));
		user.setFirstName(firstName.trim());
		user.setLastName(lastName.trim());
		user.setPhoneNumber(phoneNumber.trim());

		String jsonResponse = objectMapper.writeValueAsString(users.updateUser(user));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doUpdateAvata(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String id = jsonNode.get("userID").asText();
		String avata = jsonNode.get("avata").asText();

		UserDAO users = new UserDAO();

		String jsonResponse = objectMapper.writeValueAsString(users.updateAvataUser(Integer.parseInt(id), avata));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doUpdateBackground(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String id = jsonNode.get("userID").asText();
		String background = jsonNode.get("background").asText();

		UserDAO users = new UserDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(users.updateBackgroundUser(Integer.parseInt(id), background));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void doGetOneUser(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

//		String userID = req.getParameter("userID");
//
//		UserDAO users = new UserDAO();
//
//		UserModel user = null;
//
//		user = users.getOneUser(Integer.parseInt(userID));
//
//		System.out.println(user);

//		PrintWriter out = resp.getWriter();
//		out.println();
	}
}
