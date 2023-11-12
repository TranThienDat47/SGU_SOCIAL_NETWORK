package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.FriendRequestModel;
import com.util.DatabaseGlobal;

public class FriendRequestDAO {

	public FriendRequestDAO() {
	}

	public List<FriendRequestModel> searchFriendOfUser(int offset, int limit, int userID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT f.*, u.image, u.firstName, u.lastName FROM friendrequests f INNER JOIN USERS u ON f.userID = u.id"
				+ " WHERE requestID = " + userID + " LIMIT " + limit + " OFFSET " + offset;
		;

		List<FriendRequestModel> listPost = new ArrayList<FriendRequestModel>();
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				FriendRequestModel friend = new FriendRequestModel();

				friend.setId(Integer.parseInt(rs.getString("id")));
				friend.setUserID(Integer.parseInt(rs.getString("userID")));
				friend.setRequestID(Integer.parseInt(rs.getString("requestID")));
				friend.setImage(rs.getString("image"));
				friend.setFirstName(rs.getString("firstName"));
				friend.setLastName(rs.getString("lastName"));

				// Lấy số lượng bạn chung
				int friendID = Integer.parseInt(rs.getString("userID"));
				int commonFriendCount = 0;

				// Truy vấn để lấy số lượng bạn chung
				String commonFriendCountSQL = "SELECT COUNT(DISTINCT f1.friendID) AS friendCount "
						+ "FROM friends f1 JOIN friends f2 ON f1.friendID = f2.friendID " + "WHERE f1.userID = "
						+ userID + " AND f2.userID = " + friendID;

				Statement stmt1 = conn.getConn().createStatement();
				ResultSet rs1 = stmt1.executeQuery(commonFriendCountSQL);

				if (rs1.next()) {
					commonFriendCount = rs1.getInt("friendCount");
				}

				rs1.close();
				stmt1.close();

				friend.setCountRoomate(commonFriendCount);
				listPost.add(friend);
			}
			rs.close();
			stmt.close();
			conn.closeDB();

			return listPost;
		} catch (Exception ex) {
			ex.printStackTrace();
			conn.closeDB();
			return null;
		}
	}

	public boolean addFriendRequest(int userID, int requestID) {

		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "INSERT INTO friendrequests (userID, requestID) VALUES (?, ?)";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, requestID);
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

	public boolean acceptRequest(int userID, int requestID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "DELETE FROM friendrequests WHERE (userID = ? and requestID = ?) or (userID = ? and requestID = ?)";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, requestID);
			pstmt.setInt(3, requestID);
			pstmt.setInt(4, userID);
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

	public boolean denyAddFriend(int userID, int requestID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "DELETE FROM friendrequests WHERE (userID = ? and requestID = ?) or (userID = ? and requestID = ?)";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, requestID);
			pstmt.setInt(3, requestID);
			pstmt.setInt(4, userID);

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

	public boolean checkIsSendRequest(int userID, int friendID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "SELECT * FROM friendrequests WHERE userID = ? AND requestID = ?";

		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, friendID);

			ResultSet resultSet = pstmt.executeQuery();
			boolean isFriend = resultSet.next(); // Kiểm tra xem có dòng dữ liệu nào khớp hay không
			pstmt.close();

			return isFriend;
		} catch (SQLException ex) {
			ex.printStackTrace();
			return false;
		} finally {
			conn.closeDB();
		}
	}

}
