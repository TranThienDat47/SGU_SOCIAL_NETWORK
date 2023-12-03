package com.service;

import com.util.JwtUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebFilter("/api/*")
public class AuthFilter implements Filter {
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String token = httpRequest.getHeader("Authorization");

		// Check if the token is null or empty
		if (token == null || token.isEmpty() || !JwtUtil.verifyToken(token)) {
			// Token không hợp lệ, trả về lỗi 401
			HttpServletResponse httpResponse = (HttpServletResponse) response;
			httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return;
		}
		// Token hợp lệ, cho phép tiếp tục
		chain.doFilter(request, response);
	}

	public void init(FilterConfig fConfig) throws ServletException {
		// Không cần thiết cho filter này
	}

	public void destroy() {
		// Không cần thiết cho filter này
	}
}
