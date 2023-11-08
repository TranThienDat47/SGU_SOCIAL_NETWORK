package com.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CookieUtils {
	// Tạo và gửi cookie về client để lưu
	public static Cookie add(String name, String value, int hours, HttpServletResponse resp)
			throws UnsupportedEncodingException {
		String encodedValue = URLEncoder.encode(value, "UTF-8");
		
		Cookie cookie = new Cookie(name, encodedValue);
		cookie.setMaxAge(hours * 60 * 60);
		cookie.setPath("/");
		resp.addCookie(cookie);

		return cookie;
	}

	// Đọc giá trị cookie gửi từ client
	public static String get(String name, HttpServletRequest req) throws UnsupportedEncodingException {
		Cookie[] cookies = req.getCookies();

		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equalsIgnoreCase(name)) {
					String encodedValue = cookie.getValue();
					String decodedValue = URLDecoder.decode(encodedValue, "UTF-8");
					return decodedValue;
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
