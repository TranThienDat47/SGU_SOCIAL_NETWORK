package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.FollowModel;
import com.model.FriendModel;
import com.util.DatabaseGlobal;

public class FollowDAO {

	public FollowDAO() {
	}

	public List<FollowModel> searchUserFollow(int offset, int limit, int userID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT f.*, u.image, u.firstName, u.lastName" + " FROM follows f"
				+ " INNER JOIN USERS u ON f.followID = u.id" + " WHERE f.userID = " + userID + " LIMIT " + limit
				+ " OFFSET " + offset + ";";

		List<FollowModel> listPost = new ArrayList<FollowModel>();
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				FollowModel follow = new FollowModel();

				follow.setId(Integer.parseInt(rs.getString("id")));
				follow.setUserID(Integer.parseInt(rs.getString("userID")));
				follow.setFollowID(Integer.parseInt(rs.getString("friendID")));
				follow.setImage(rs.getString("image"));
				follow.setFirstName(rs.getString("firstName"));
				follow.setLastName(rs.getString("lastName"));

				// Lấy số lượng bạn chung
				int friendID = Integer.parseInt(rs.getString("followID"));
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

				follow.setCoutRoomate(commonFriendCount);
				listPost.add(follow);
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

	public boolean addFollow(int userID, int followID) {

		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "INSERT INTO follows (userID, followID) VALUES (?, ?)";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, followID);
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

	public boolean checkIsFollow(int userID, int followID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "SELECT * FROM follows WHERE userID = ? AND followID = ?";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, followID);

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

	public boolean unfollow(int userID, int followID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "DELETE FROM follows WHERE userID = ? and followID = ?";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, followID);

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
