package com.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CookieUtils {
	// Tạo và gửi cookie về client để lưu
	public static Cookie add(String name, String value, int hours, HttpServletResponse resp) {

		Cookie cookie = new Cookie(name, value);

		cookie.setMaxAge(hours * 60 * 60);
		cookie.setPath("/");
		resp.addCookie(cookie);
		return cookie;
	}

	// Đọc giá trị cookie gửi từ client
	public static String get(String name, HttpServletRequest req) {
		Cookie[] cookies = req.getCookies();

		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equalsIgnoreCase(name)) {
					return cookie.getValue();
				}
			}
		}
		return "";
	}

	// Xóa toàn bộ cookies
	public static void deleteAllCookies(HttpServletRequest req, HttpServletResponse resp) {
		Cookie[] cookies = req.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				cookie.setMaxAge(0);
				cookie.setPath("/");
				resp.addCookie(cookie);
			}
		}
	}
}
