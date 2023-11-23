package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.LikePostModel;
import com.util.DatabaseGlobal;

public class LikePostDAO {
	public LikePostDAO() {
	}

	public boolean likePost(int userID, int postID) {

		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "INSERT INTO likeposts (userID, postID) VALUES (?, ?)";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, postID);
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

	public boolean disLikePost(int userID, int postID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "DELETE FROM likeposts WHERE userID = ? and postID = ?";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, postID);

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

	public List<LikePostModel> getLikePost(int id) {

		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT DISTINCT p.*, u.image, u.firstName, u.lastName FROM LIKEPOSTS p "
				+ "INNER JOIN USERS u ON p.userID = u.id where p.postID = " + id;

		List<LikePostModel> like_posts = new ArrayList<LikePostModel>();

		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				LikePostModel post = new LikePostModel();
				post = new LikePostModel();
				post.setId(rs.getInt("id"));
				post.setPostID(rs.getInt("postID"));
				post.setUserID(rs.getInt("userID"));
				post.setFirstName(rs.getString("firstName"));
				post.setLastName(rs.getString("lastName"));
				post.setImage(rs.getString("image"));

				like_posts.add(post);
			}

			rs.close();
			return like_posts;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		} finally {
			conn.closeDB();
		}
	}

	public boolean checkLikePost(int userID, int postID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT * FROM LIKEPOSTS where userID = " + userID + " and postID = " + postID;

		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);

			boolean isLike = rs.next();

			rs.close();

			return isLike;
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		} finally {
			conn.closeDB();
		}
	}

}
