package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import com.dao.ConversationDAO;
import com.dao.MessageDAO;
import com.dao.UserDAO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.model.MessageModel;
import com.service.SendMailler;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet({ "/api/message/create_message", "/api/message/create_conversation",
		"/api/message/get_message_of_conversation", "/api/message/get_conversation", "/api/message/get_count_new",
		"/api/message/read_mesage" })
public class MessageController extends HttpServlet {

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String uri = req.getRequestURI();
		if (uri.contains("/api/message/create_message")) {
			this.createMessage(req, resp);
		} else if (uri.contains("/api/message/create_conversation")) {
			this.createConversation(req, resp);
		} else if (uri.contains("/api/message/get_message_of_conversation")) {
			this.getMessageOfConversation(req, resp);
		} else if (uri.contains("/api/message/get_conversation")) {
			this.getConversation(req, resp);
		} else if (uri.contains("/api/message/get_count_new")) {
			this.getCountNew(req, resp);
		} else if (uri.contains("/api/message/read_mesage")) {
			this.readMessage(req, resp);
		}
	}

	protected void readMessage(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String conversationID = jsonNode.get("conversationID").asText();
		String userID = jsonNode.get("userID").asText();

		MessageDAO messageDAO = new MessageDAO();

		String jsonResponse = objectMapper
				.writeValueAsString(messageDAO.readMessage(Integer.parseInt(conversationID), Integer.parseInt(userID)));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void getCountNew(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String userID1 = jsonNode.get("userID1").asText();
		String userID2 = jsonNode.get("userID2").asText();

		MessageDAO messageDAO = new MessageDAO();

		String jsonResponse = objectMapper.writeValueAsString(
				messageDAO.getCountNewMessage(Integer.parseInt(userID1), Integer.parseInt(userID2)));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void createMessage(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String content = jsonNode.get("content").asText();
		String userID = jsonNode.get("userID").asText();
		String conversationID = jsonNode.get("conversationID").asText();

		MessageModel messageModel = new MessageModel();

		messageModel.setContent(content);
		messageModel.setConversationID(Integer.parseInt(conversationID));
		messageModel.setUserID(Integer.parseInt(userID));

		MessageDAO messageDAO = new MessageDAO();

		String jsonResponse = objectMapper.writeValueAsString(messageDAO.createMessage(messageModel));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void createConversation(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String userID1 = jsonNode.get("userID1").asText();
		String userID2 = jsonNode.get("userID2").asText();

		ConversationDAO conversationDAO = new ConversationDAO();

		String jsonResponse = objectMapper.writeValueAsString(
				conversationDAO.createConversation(Integer.parseInt(userID1), Integer.parseInt(userID2)));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void getMessageOfConversation(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String offsetValue = jsonNode.get("offsetValue").asText();
		String limitValue = jsonNode.get("limitValue").asText();
		String conversationID = jsonNode.get("conversationID").asText();

		MessageDAO messageDAO = new MessageDAO();

		String jsonResponse = objectMapper.writeValueAsString(messageDAO.getMessageOfConversation(
				Integer.parseInt(offsetValue), Integer.parseInt(limitValue), Integer.parseInt(conversationID)));

		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}

	protected void getConversation(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(req.getReader());

		String userID1 = jsonNode.get("userID1").asText();
		String userID2 = jsonNode.get("userID2").asText();

		ConversationDAO conversationDAO = new ConversationDAO();

		String jsonResponse = objectMapper.writeValueAsString(
				conversationDAO.searchConversation(Integer.parseInt(userID1), Integer.parseInt(userID2)));
		PrintWriter out = resp.getWriter();
		out.println(jsonResponse);
	}
}
