package com.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

public class JwtUtil {
	private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	public static String generateToken(String userId) {
		return Jwts.builder().setSubject(userId).signWith(SECRET_KEY).compact();
	}

	public static boolean verifyToken(String token) {
		try {
			System.out.println(Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token));
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
