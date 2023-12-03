package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import com.dao.UserDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.service.SendMailler;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet({ "/auth/forgot_password", "/auth/check_email", "/auth/check_password", "/auth/update_password" })
public class ForgotPassword extends HttpServlet {

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String uri = req.getRequestURI();
		if (uri.contains("/auth/forgot_password")) {
			this.forGotPassword(req, resp);
		} else if (uri.contains("/auth/check_email")) {
			this.checkEmail(req, resp);
		} else if (uri.contains("/auth/check_password")) {
			this.checkPassword(req, resp);
		} else if (uri.contains("/auth/update_password")) {
			this.updatePassword(req, resp);
		}
	}

	protected void forGotPassword(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String email = jsonNode.get("email").asText();

		String newPassword = generateRandomPassword(6);

		SendMailler.sendMail(email, "Cấp lại mật khẩu", newPassword);

		UserDAO user = new UserDAO();

		String jsonResponse = objectMapper.writeValueAsString(user.updatePassword(email, newPassword));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void updatePassword(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String email = jsonNode.get("email").asText();
		String newPassword = jsonNode.get("newPassword").asText();

		UserDAO user = new UserDAO();

		String jsonResponse = objectMapper.writeValueAsString(user.updatePassword(email, newPassword));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void checkEmail(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String email = jsonNode.get("email").asText();

		UserDAO user = new UserDAO();

		String jsonResponse = objectMapper.writeValueAsString(user.isEmailAlreadyRegistered(email));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void checkPassword(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String email = jsonNode.get("email").asText();
		String password = jsonNode.get("password").asText();

		UserDAO user = new UserDAO();

		String jsonResponse = objectMapper.writeValueAsString(user.checkPassword(email, password));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	private String generateRandomPassword(int length) {
		String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		StringBuilder password = new StringBuilder();

		for (int i = 0; i < length; i++) {
			int index = (int) (Math.random() * characters.length());
			password.append(characters.charAt(index));
		}

		return password.toString();
	}
}
