package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.LikeCommentModel;
import com.util.DatabaseGlobal;

public class LikeCommentDAO {
	public LikeCommentDAO() {
	}

	public boolean likeComment(int userID, int commentID) {

		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "INSERT INTO likecomments (userID, commentID) VALUES (?, ?)";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, commentID);
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

	public boolean disLikeComment(int userID, int commentID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "DELETE FROM likecomments WHERE userID = ? and commentID = ?";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, userID);
			pstmt.setInt(2, commentID);

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

	public List<LikeCommentModel> getLikeComment(int id) {

		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT DISTINCT p.*, u.image, u.firstName, u.lastName FROM LIKECOMMENTS p "
				+ "INNER JOIN USERS u ON p.userID = u.id where p.commentID = " + id;

		List<LikeCommentModel> like_comments = new ArrayList<LikeCommentModel>();

		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				LikeCommentModel like_comment = new LikeCommentModel();
				like_comment = new LikeCommentModel();
				like_comment.setId(rs.getInt("id"));
				like_comment.setCommentID(rs.getInt("commentID"));
				like_comment.setUserID(rs.getInt("userID"));
				like_comment.setFirstName(rs.getString("firstName"));
				like_comment.setLastName(rs.getString("lastName"));
				like_comment.setImage(rs.getString("image"));

				like_comments.add(like_comment);
			}

			rs.close();
			return like_comments;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		} finally {
			conn.closeDB();
		}
	}

	public boolean checkLikeComment(int userID, int commentID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT * FROM LIKECOMMENTS where userID = " + userID + " and commentID = " + commentID;

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
