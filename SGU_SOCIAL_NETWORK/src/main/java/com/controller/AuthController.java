package com.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import com.dao.UserDAO;
import com.model.UserModel;
import com.util.CookieUtils;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = { "/auth" })
public class AuthController extends HttpServlet {

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String action = req.getParameter("action");

		if (action.trim().equals("register")) {
			UserDAO register = new UserDAO();
			String email = req.getParameter("email");

			boolean isEmailExists = register.isEmailAlreadyRegistered(email);

			if (isEmailExists) {
				String encodedMessage = URLEncoder.encode("Email đã tồn tại", StandardCharsets.UTF_8.toString());
				resp.sendRedirect("AuthUser.jsp?page=register&message=" + encodedMessage);
				return;
			}

			String firstName = req.getParameter("firstname");
			String lastName = req.getParameter("lastname");
			String genderParam = req.getParameter("gender");
			Boolean gender = Boolean.parseBoolean(genderParam);
			String password = req.getParameter("password");
			String phone = req.getParameter("phone");
			String address = req.getParameter("address");

			String day = req.getParameter("day");
			String month = req.getParameter("month");
			String year = req.getParameter("year");
			String dateOfBirth = year + "-" + month + "-" + day;

			UserModel user = new UserModel();
			user.setEmail(email);
			user.setFirstName(firstName);
			user.setLastName(lastName);
			user.setPassword(password);
			user.setPhoneNumber(phone);
			user.setAddress(address);
			user.setDateOfBirth(dateOfBirth);
			user.setGender(gender);

			UserModel newUser = null;

			newUser = register.addUser(user);

			if (newUser != null) {
				int hours = 30 * 24;

				String encodedBase64Img = Base64.getEncoder().encodeToString(newUser.getImage().getBytes());

				CookieUtils.add("email", email, hours, resp);
				CookieUtils.add("id", String.valueOf(newUser.getId()), hours, resp);
				CookieUtils.add("image", encodedBase64Img, hours, resp);
				CookieUtils.add("phoneNumber", newUser.getPhoneNumber(), hours, resp);
				CookieUtils.add("firstName", newUser.getFirstName(), hours, resp);
				CookieUtils.add("lastName", newUser.getLastName(), hours, resp);
				CookieUtils.add("dateOfBirth", newUser.getDateOfBirth(), hours, resp);
				CookieUtils.add("createAt", newUser.getCreateAt(), hours, resp);
				CookieUtils.add("biography", newUser.getBiography(), hours, resp);
				CookieUtils.add("gender", String.valueOf(newUser.isGender()), hours, resp);
				CookieUtils.add("background", encodedBase64Img, hours, resp);
				CookieUtils.add("address", newUser.getAddress(), hours, resp);

				resp.sendRedirect("index.jsp");
			}
		} else if (action.trim().equals("login")) {
			String email = req.getParameter("email");
			String password = req.getParameter("password");

			UserDAO userDAO = new UserDAO();
			UserModel user = new UserModel();
			user = userDAO.login(email, password);
			if (user != null) {
				if (user.getEmail().equals(email) && user.getPassword().equals(password)) {

					String encodedBase64Img = Base64.getEncoder().encodeToString(user.getImage().getBytes());
					String encodedBase64Background = Base64.getEncoder()
							.encodeToString(user.getBackground().getBytes());

					byte[] decodedImg = Base64.getDecoder().decode(encodedBase64Img);

					String originalData = new String(decodedImg, StandardCharsets.UTF_8);

					System.out.println(encodedBase64Img);

					System.out.println(originalData);

					int hours = 30 * 24;
					CookieUtils.add("email", email, hours, resp);
					CookieUtils.add("id", String.valueOf(user.getId()), hours, resp);
					CookieUtils.add("image", encodedBase64Img, hours, resp);
					CookieUtils.add("phoneNumber", user.getPhoneNumber(), hours, resp);
					CookieUtils.add("firstName", user.getFirstName(), hours, resp);
					CookieUtils.add("lastName", user.getLastName(), hours, resp);
					CookieUtils.add("dateOfBirth", user.getDateOfBirth(), hours, resp);
					CookieUtils.add("createAt", user.getCreateAt().replace(" ", "_=_"), hours, resp);
					CookieUtils.add("biography", user.getBiography().trim(), hours, resp);
					CookieUtils.add("gender", String.valueOf(user.isGender()), hours, resp);
					CookieUtils.add("background", encodedBase64Background.trim(), hours, resp);
					CookieUtils.add("address", user.getAddress().trim(), hours, resp);

					resp.sendRedirect("index.jsp");
				}
			}
		}

	}
}
