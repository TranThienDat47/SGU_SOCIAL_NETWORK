package com.util;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.IOException;
import io.jsonwebtoken.security.SignatureException;

public class AuthorizationToken {
	public static boolean authorizationToken(String token) {
		if (token == null || token.isEmpty()) {
			return false;
		} else {
			try {
				boolean email = JwtUtil.verifyToken(token);

				return email;
			} catch (ExpiredJwtException eje) {
				// Token hết hạn, chuyển hướng hoặc xử lý theo yêu cầu của bạn
				return false;
			} catch (UnsupportedJwtException | MalformedJwtException | SignatureException | IOException e) {
				// Các lỗi xác thực khác, xử lý theo yêu cầu của bạn
				return false;
			}
		}
	}
}
