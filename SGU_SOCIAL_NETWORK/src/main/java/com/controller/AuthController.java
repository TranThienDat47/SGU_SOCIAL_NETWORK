package com.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import com.dao.UserDAO;
import com.model.UserModel;
import com.util.CookieUtils;
import com.util.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@WebServlet(urlPatterns = { "/auth" })
public class AuthController extends HttpServlet {
	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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
			String dateTemp = req.getParameter("dateOfBirth");
			String dateOfBirth = dateTemp;
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

				String encodedBase64Img = URLEncoder.encode(newUser.getImage(), "UTF-8");

				CookieUtils.add("email", email, hours, resp);
				CookieUtils.add("id", String.valueOf(newUser.getId()), hours, resp);
				CookieUtils.add("phoneNumber", newUser.getPhoneNumber(), hours, resp);
				CookieUtils.add("firstName", newUser.getFirstName(), hours, resp);
				CookieUtils.add("lastName", newUser.getLastName(), hours, resp);
				CookieUtils.add("dateOfBirth", newUser.getDateOfBirth(), hours, resp);
				CookieUtils.add("createAt", newUser.getCreateAt(), hours, resp);
				CookieUtils.add("biography", newUser.getBiography(), hours, resp);
				CookieUtils.add("gender", String.valueOf(newUser.isGender()), hours, resp);
				CookieUtils.add("address", newUser.getAddress(), hours, resp);

				String token = JwtUtil.generateToken(email);

				req.setAttribute("background", encodedBase64Img);
				req.setAttribute("image", encodedBase64Img);
				req.setAttribute("token", token);

				req.getRequestDispatcher("SaveImageAndBackground.jsp").forward(req, resp);
			}
		} else if (action.trim().equals("login")) {
			String email = req.getParameter("email");
			String password = req.getParameter("password");

			UserDAO userDAO = new UserDAO();
			UserModel user = new UserModel();
			user = userDAO.login(email, password);

			if (user != null) {
				System.out.println("huh");
				if (user.getEmail().equals(email) && passwordEncoder.matches(password, user.getPassword())) {

					String originalDataImage = URLEncoder.encode(user.getImage(), "UTF-8");

					String originalDataBackground = URLEncoder.encode(user.getBackground(), "UTF-8");

					int hours = 30 * 24;
					CookieUtils.add("email", email, hours, resp);
					CookieUtils.add("id", String.valueOf(user.getId()), hours, resp);
					CookieUtils.add("phoneNumber", user.getPhoneNumber(), hours, resp);
					CookieUtils.add("firstName", user.getFirstName(), hours, resp);
					CookieUtils.add("lastName", user.getLastName(), hours, resp);
					CookieUtils.add("dateOfBirth", user.getDateOfBirth(), hours, resp);
					CookieUtils.add("createAt", user.getCreateAt(), hours, resp);
					CookieUtils.add("biography", user.getBiography().trim(), hours, resp);
					CookieUtils.add("gender", String.valueOf(user.isGender()), hours, resp);
					CookieUtils.add("address", user.getAddress().trim(), hours, resp);

					String token = JwtUtil.generateToken(email);

					req.setAttribute("background", originalDataBackground);
					req.setAttribute("image", originalDataImage);
					req.setAttribute("token", token);

					req.getRequestDispatcher("SaveImageAndBackground.jsp").forward(req, resp);

				} else {
					req.setAttribute("message", "Thông tin đăng nhập không chính xác!");
					req.getRequestDispatcher("AuthUser.jsp").forward(req, resp);

				}
			} else {
				req.setAttribute("message", "Thông tin đăng nhập không chính xác!");
				req.getRequestDispatcher("AuthUser.jsp").forward(req, resp);
			}
		}

	}
}
