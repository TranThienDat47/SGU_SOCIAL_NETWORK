package com.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.security.*;
import java.util.Base64;

import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;

public class CookieUtils {
	private static final String ENCRYPTION_KEY = "1234567890123456";

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

	// Set cookie with encrypted value
	public static Cookie addPlus(String name, String value, int hours, HttpServletResponse resp)
			throws UnsupportedEncodingException {
		try {
			// Create and initialize the encryption key
			Key key = new SecretKeySpec(ENCRYPTION_KEY.getBytes("UTF-8"), "AES");

			// Initialize the cipher
			Cipher cipher = Cipher.getInstance("AES");
			cipher.init(Cipher.ENCRYPT_MODE, key);

			// Encrypt the value
			byte[] encryptedValue = cipher.doFinal(value.getBytes("UTF-8"));

			// Encode the encrypted value using Base64
			String encodedValue = Base64.getEncoder().encodeToString(encryptedValue);

			Cookie cookie = new Cookie(name, encodedValue);
			cookie.setMaxAge(hours * 60 * 60);
			cookie.setPath("/");
			resp.addCookie(cookie);

			return cookie;
		} catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException | BadPaddingException
				| IllegalBlockSizeException e) {
			throw new RuntimeException("Error encrypting cookie value", e);
		}
	}

	// Get cookie and decrypt the value
	public static String getPlus(String name, HttpServletRequest req) throws UnsupportedEncodingException {
		try {
			Cookie[] cookies = req.getCookies();

			if (cookies != null) {
				for (Cookie cookie : cookies) {
					if (cookie.getName().equalsIgnoreCase(name)) {
						// Decode the encrypted value using Base64
						byte[] encryptedValue = Base64.getDecoder().decode(cookie.getValue());

						// Create and initialize the encryption key
						Key key = new SecretKeySpec(ENCRYPTION_KEY.getBytes("UTF-8"), "AES");

						// Initialize the cipher
						Cipher cipher = Cipher.getInstance("AES");
						cipher.init(Cipher.DECRYPT_MODE, key);

						// Decrypt the value
						byte[] decryptedValue = cipher.doFinal(encryptedValue);

						return new String(decryptedValue, "UTF-8");
					}
				}
			}
			return "";
		} catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException | BadPaddingException
				| IllegalBlockSizeException e) {
			throw new RuntimeException("Error decrypting cookie value", e);
		}
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
