package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.model.ConversationModel;
import com.util.DatabaseGlobal;

public class ConversationDAO {
	public ConversationDAO() {
	}

	public ConversationModel searchConversation(int userID1, int userID2) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT * FROM conversations WHERE (userID1 = " + userID1 + " and userID2 = " + userID2
				+ ") or (userID1 = " + userID2 + " and userID2 = " + userID1 + ")";

		ConversationModel conversation = new ConversationModel();

		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);

			while (rs.next()) {
				conversation.setId(rs.getInt("id"));
				conversation.setUserID1(rs.getInt("userID1"));
				conversation.setUserID2(rs.getInt("userID2"));
			}
			rs.close();
			stmt.close();
			conn.closeDB();

			return conversation;
		} catch (Exception ex) {
			ex.printStackTrace();
			conn.closeDB();
			return null;
		}
	}

	public boolean checkConversation(int userID1, int userID2) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT * FROM conversations WHERE (userID1 = " + userID1 + " and userID2 = " + userID2
				+ ") or (userID1 = " + userID2 + " and userID2 = " + userID1 + ")";

		ConversationModel conversation = new ConversationModel();

		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);

			boolean resultReturn = rs.next();

			rs.close();
			stmt.close();
			conn.closeDB();

			return resultReturn;
		} catch (Exception ex) {
			ex.printStackTrace();
			conn.closeDB();
			return false;
		}
	}

	public int createConversation(int userID1, int userID2) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "INSERT INTO conversations (userID1, userID2) VALUES (?, ?)";
		try {
			// Thêm tham số để lấy lại ID được sinh tự động
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, userID1);
			pstmt.setInt(2, userID2);
			int rowsAffected = pstmt.executeUpdate();

			// Lấy ID được sinh tự động từ bản ghi mới thêm vào
			if (rowsAffected > 0) {
				ResultSet generatedKeys = pstmt.getGeneratedKeys();
				if (generatedKeys.next()) {
					int conversationID = generatedKeys.getInt(1);
					pstmt.close();
					return conversationID;
				}
			}

			pstmt.close();
			return -1; // Trả về giá trị âm để chỉ ra lỗi nếu không lấy được ID
		} catch (SQLException ex) {
			ex.printStackTrace();
			return -1; // Trả về giá trị âm để chỉ ra lỗi nếu có lỗi SQL
		} finally {
			conn.closeDB();
		}
	}

}
