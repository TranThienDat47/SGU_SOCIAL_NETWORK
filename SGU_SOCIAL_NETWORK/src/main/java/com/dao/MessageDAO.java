package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.ConversationModel;
import com.model.FollowModel;
import com.model.MessageModel;
import com.util.DatabaseGlobal;

public class MessageDAO {
	public MessageDAO() {

	}

	public boolean readMessage(int conversationID, int userID) {
		DatabaseGlobal conn = new DatabaseGlobal();

		try {
			System.out.println(conversationID);
			conn.getConnection();
			String sql = "UPDATE messages SET isRead = true WHERE userID = ? and conversationID = ?";

			try (PreparedStatement pstmt = conn.getConn().prepareStatement(sql)) {
				pstmt.setInt(1, userID);
				pstmt.setInt(2, conversationID);

				int rowsAffected = pstmt.executeUpdate();
				return rowsAffected > 0;
			}

		} catch (SQLException ex) {
			ex.printStackTrace();
			return false;
		} finally {
			conn.closeDB();
		}
	}

//	userID1 is check
	public int getCountNewMessage(int userID1, int userID2) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT count(*) as count_message FROM messages WHERE conversationID IN (SELECT c.id FROM conversations c WHERE (c.userID1 = "
				+ userID1 + " AND c.userID2 = " + userID2 + ") OR (c.userID1 = " + userID2 + " AND c.userID2 = "
				+ userID1 + ")) AND userID = " + userID2 + " and isRead = false;";

		MessageModel message = new MessageModel();

		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			int count = 0;
			while (rs.next()) {
				count = rs.getInt("count_message");
			}
			rs.close();
			stmt.close();
			conn.closeDB();

			return count;
		} catch (Exception ex) {
			ex.printStackTrace();
			conn.closeDB();
			return 0;
		}
	}

	public List<MessageModel> getMessageOfConversation(int offset, int limit, int conversationID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT *  FROM messages" + " WHERE conversationID = " + conversationID
				+ " ORDER BY createAt DESC " + " LIMIT " + limit + " OFFSET " + offset + ";";

		List<MessageModel> listMessage = new ArrayList<MessageModel>();
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				MessageModel message = new MessageModel();

				message.setId(Integer.parseInt(rs.getString("id")));
				message.setUserID(Integer.parseInt(rs.getString("userID")));
				message.setConversationID(rs.getInt("conversationID"));
				message.setContent(rs.getString("content"));
				message.setRead(rs.getBoolean("isRead"));
				message.setCreateAt(rs.getString("createAt"));

				listMessage.add(message);
			}
			rs.close();
			stmt.close();
			conn.closeDB();

			return listMessage;
		} catch (Exception ex) {
			ex.printStackTrace();
			conn.closeDB();
			return null;
		}
	}

	public boolean createMessage(MessageModel message) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "INSERT INTO messages (conversationID, userID, content) VALUES (?, ?, ?)";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, message.getConversationID());
			pstmt.setInt(2, message.getUserID());
			pstmt.setString(3, message.getContent());

			int rowsAffected = pstmt.executeUpdate();
			pstmt.close();
			return rowsAffected > 0;
		} catch (SQLException ex) {
			ex.printStackTrace();
			return false;
		} finally {
			conn.closeDB();
		}
	}

}
