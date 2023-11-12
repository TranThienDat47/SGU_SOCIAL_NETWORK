package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.FriendModel;
import com.util.DatabaseGlobal;

public class FriendDAO {

	public FriendDAO() {
	}

	public List<FriendModel> searchFriendOfUser(int offset, int limit, int userID, int tempID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "";

		newSQL = "SELECT sub.*" + "FROM (" + "SELECT f.*, u.image, u.firstName, u.lastName" + " FROM FRIENDS f"
				+ " INNER JOIN USERS u ON f.friendID = u.id" + " WHERE f.userID =" + userID

				+ " UNION"

				+ " SELECT f.*, u.image, u.firstName, u.lastName" + " FROM FRIENDS f"
				+ " INNER JOIN USERS u ON f.userID = u.id" + " WHERE f.friendID = " + userID + " ) AS sub LIMIT "
				+ limit + " OFFSET " + offset + ";";

		List<FriendModel> listPost = new ArrayList<FriendModel>();
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				FriendModel friend = new FriendModel();

				friend.setId(Integer.parseInt(rs.getString("id")));
				friend.setUserID(Integer.parseInt(rs.getString("userID")));
				friend.setFriendID(Integer.parseInt(rs.getString("friendID")));
				friend.setImage(rs.getString("image"));
				friend.setFirstName(rs.getString("firstName"));
				friend.setLastName(rs.getString("lastName"));

				// Lấy số lượng bạn chung
				int friendID = Integer.parseInt(rs.getString("friendID"));
				int commonFriendCount = 0;

				// Truy vấn để lấy số lượng bạn chung
				String commonFriendCountSQL = "SELECT SUM(sub.friendCount) AS totalFriendCount" + " FROM ("
						+ "    SELECT COUNT(*) AS friendCount " + "    FROM friends f1 "
						+ "    JOIN friends f2 ON f1.friendID = f2.friendID " + "    WHERE f1.userID = " + tempID
						+ " AND f2.userID = " + friendID + "" + "    UNION " + "    SELECT COUNT(*) AS friendCount "
						+ "    FROM friends f1 " + "    JOIN friends f2 ON f1.userID = f2.userID "
						+ "    WHERE f1.friendID = " + tempID + " AND f2.friendID = " + friendID + "" + ") AS sub";

				Statement stmt1 = conn.getConn().createStatement();
				ResultSet rs1 = stmt1.executeQuery(commonFriendCountSQL);

				if (rs1.next()) {
					commonFriendCount = rs1.getInt("totalFriendCount");
				}

				rs1.close();
				stmt1.close();

				friend.setCoutRoomate(commonFriendCount);
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

//	public List<FriendModel> searchFriend(int offset, int limit, String searchValue, int userID) {
//		DatabaseGlobal conn = new DatabaseGlobal();
//		conn.getConnection();
//
//		String newSQL = "";
//		System.out.println(searchValue);
//		String searchValueLower = searchValue.toLowerCase();
//
//		newSQL = "FROM (" + "    SELECT f.*, u.image, u.firstName, u.lastName " + "    FROM FRIENDS f "
//				+ "    INNER JOIN USERS u ON f.friendID = u.id "
//				+ "    WHERE CONCAT(' ', LOWER(u.keySearch), ' ') LIKE '%" + searchValueLower + "%' "
//				+ "       OR CONVERT(LOWER(CONCAT(u.lastName, ' ', u.firstName)) USING utf8) LIKE '%" + searchValueLower
//				+ "%' or POSITION(firstName IN '" + searchValueLower + "') > 0 or POSITION(lastName IN '"
//				+ searchValueLower + "') > 0" + " LIMIT " + limit + " OFFSET " + offset + ";";
//
//		List<FriendModel> listPost = new ArrayList<>();
//
//		try {
//			Statement stmt = conn.getConn().createStatement();
//			ResultSet rs = stmt.executeQuery(newSQL);
//			while (rs.next()) {
//				System.out.println("haha");
//				FriendModel friend = new FriendModel();
//
//				friend.setId(Integer.parseInt(rs.getString("id")));
//				friend.setUserID(Integer.parseInt(rs.getString("userID")));
//				friend.setFriendID(Integer.parseInt(rs.getString("friendID")));
//				friend.setImage(rs.getString("image"));
//				friend.setFirstName(rs.getString("firstName"));
//				friend.setLastName(rs.getString("lastName"));
//
//				// Lấy số lượng bạn chung
//				int friendID = Integer.parseInt(rs.getString("friendID"));
//				int commonFriendCount = 0;
//
//				// Truy vấn để lấy số lượng bạn chung
//				String commonFriendCountSQL = "SELECT SUM(sub.friendCount) AS totalFriendCount" + " FROM ("
//						+ "    SELECT COUNT(*) AS friendCount " + "    FROM friends f1 "
//						+ "    JOIN friends f2 ON f1.friendID = f2.friendID " + "    WHERE f1.userID = " + userID
//						+ " AND f2.userID = " + friendID + "" + "    UNION " + "    SELECT COUNT(*) AS friendCount "
//						+ "    FROM friends f1 " + "    JOIN friends f2 ON f1.userID = f2.userID "
//						+ "    WHERE f1.friendID = " + userID + " AND f2.friendID = " + friendID + "" + ") AS sub";
//
//				Statement stmt1 = conn.getConn().createStatement();
//				ResultSet rs1 = stmt1.executeQuery(commonFriendCountSQL);
//
//				if (rs1.next()) {
//					commonFriendCount = rs1.getInt("totalFriendCount");
//				}
//
//				rs1.close();
//				stmt1.close();
//
//				friend.setCoutRoomate(commonFriendCount);
//				listPost.add(friend);
//			}
//			rs.close();
//			stmt.close();
//			conn.closeDB();
//			return listPost;
//		} catch (Exception ex) {
//			ex.printStackTrace();
//			conn.closeDB();
//			return null;
//		}
//	}

	public boolean addFriend(int userID, int friendID) {

		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "INSERT INTO friends (userID, friendID) VALUES (?, ?)";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, friendID);
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

	public boolean checkIsFriend(int userID, int friendID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "SELECT * FROM friends WHERE (userID = ? AND friendID = ?) OR (userID = ? AND friendID = ?)";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, friendID);
			pstmt.setInt(3, friendID); // Đảo ngược friendID và userID
			pstmt.setInt(4, userID); // để kiểm tra cả hai trường hợp

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

	public int getQuantityFriend(int userID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		int friendCount = 0;

		String sql = "SELECT count(*) as friendCount FROM friends WHERE userID = ? OR friendID = ?";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, userID);

			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				friendCount = rs.getInt("friendCount");
			}

			rs.close();
			pstmt.close();
			conn.closeDB();
		} catch (SQLException ex) {
			ex.printStackTrace();
			conn.closeDB();
		}
		return friendCount;
	}

	public boolean unfriend(int userID, int friendID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "DELETE FROM friends WHERE (userID = ? and friendID = ?) or (friendID = ? and userID = ?)";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, friendID);
			pstmt.setInt(3, userID);
			pstmt.setInt(4, friendID);

			int rowsAffected = pstmt.executeUpdate();
			pstmt.close();
			conn.closeDB();
			return rowsAffected > 0;
		} catch (SQLException ex) {
			ex.printStackTrace();
			conn.closeDB();
			return false;
		}
	}

}
