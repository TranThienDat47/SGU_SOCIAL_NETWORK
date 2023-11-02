package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.CommentModel;
import com.util.DatabaseGlobal;

public class CommentDAO {

	public CommentDAO() {
	}

	public List<CommentModel> getCommentWithParentID(int parentID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT c.*, u.image, u.firstName, u.lastName FROM comment c "
				+ "INNER JOIN users u ON c.userID = u.id " + "WHERE c.parentID = " + parentID;

		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);

			List<CommentModel> list = new ArrayList<CommentModel>();
			while (rs.next()) {
				CommentModel cmt = new CommentModel(rs.getInt("id"), rs.getInt("parentID"), rs.getInt("userID"),
						rs.getString("content"), rs.getInt("likes"), rs.getInt("replies"), rs.getString("createAt"));

				cmt.setImage(rs.getString("image"));
				cmt.setFirstName(rs.getString("firstName"));
				cmt.setLastName(rs.getString("lastName"));

				list.add(cmt);
			}

			rs.close();

			return list;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public CommentModel addCommentPost(int parentID, int userID, String content) {
		DatabaseGlobal conn = new DatabaseGlobal();

		conn.getConnection();

		String newSQL = "INSERT INTO comment (parentID, userID, content) VALUES (?, ?, ?)";
		CommentModel newComment = null;

		try {
			PreparedStatement stmt = conn.getConn().prepareStatement(newSQL, Statement.RETURN_GENERATED_KEYS);
			stmt.setInt(1, parentID);
			stmt.setInt(2, userID);
			stmt.setString(3, content);

			int rowsAffected = stmt.executeUpdate();

			if (rowsAffected > 0) {
				ResultSet generatedKeys = stmt.getGeneratedKeys();
				int newCommentID = -1;
				if (generatedKeys.next()) {
					newCommentID = generatedKeys.getInt(1);
				}
				generatedKeys.close();

				String query = "SELECT c.*, u.firstName, u.lastName, u.image FROM comment c "
						+ "INNER JOIN users u ON c.userID = u.id WHERE c.id = ?";
				PreparedStatement selectStmt = conn.getConn().prepareStatement(query);
				selectStmt.setInt(1, newCommentID);
				ResultSet rs = selectStmt.executeQuery();

				if (rs.next()) {
					newComment = new CommentModel(rs.getInt("id"), rs.getInt("parentID"), rs.getInt("userID"),
							rs.getString("content"), rs.getInt("likes"), rs.getInt("replies"),
							rs.getString("createAt"));

					newComment.setFirstName(rs.getString("firstName"));
					newComment.setLastName(rs.getString("lastName"));
					newComment.setImage(rs.getString("image"));
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (newComment != null) {
				try {
					String updatePostSQL = "UPDATE POSTS SET replies = replies + 1 WHERE id = ?";

					PreparedStatement updateStmt = conn.getConn().prepareStatement(updatePostSQL);
					updateStmt.setInt(1, parentID);

					int rowsAffected = updateStmt.executeUpdate();
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}
			conn.closeDB();
		}

		return newComment;
	}

	public CommentModel addCommentReply(int parentID, int userID, String content) {
		DatabaseGlobal conn = new DatabaseGlobal();

		conn.getConnection();

		String newSQL = "INSERT INTO comment (parentID, userID, content) VALUES (?, ?, ?)";
		CommentModel newComment = null;

		try {
			PreparedStatement stmt = conn.getConn().prepareStatement(newSQL, Statement.RETURN_GENERATED_KEYS);
			stmt.setInt(1, parentID);
			stmt.setInt(2, userID);
			stmt.setString(3, content);

			int rowsAffected = stmt.executeUpdate();

			if (rowsAffected > 0) {
				ResultSet generatedKeys = stmt.getGeneratedKeys();
				int newCommentID = -1;
				if (generatedKeys.next()) {
					newCommentID = generatedKeys.getInt(1);
				}
				generatedKeys.close();

				String query = "SELECT c.*, u.firstName, u.lastName, u.image FROM comment c "
						+ "INNER JOIN users u ON c.userID = u.id WHERE c.id = ?";
				PreparedStatement selectStmt = conn.getConn().prepareStatement(query);
				selectStmt.setInt(1, newCommentID);
				ResultSet rs = selectStmt.executeQuery();

				if (rs.next()) {
					newComment = new CommentModel(rs.getInt("id"), rs.getInt("parentID"), rs.getInt("userID"),
							rs.getString("content"), rs.getInt("likes"), rs.getInt("replies"),
							rs.getString("createAt"));

					// Lấy thông tin từ bảng Users thông qua INNER JOIN và thêm vào CommentModel
					newComment.setFirstName(rs.getString("firstName"));
					newComment.setLastName(rs.getString("lastName"));
					newComment.setImage(rs.getString("image"));
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (newComment != null) {
				try {
					String updateCommentSQL = "UPDATE comment SET replies = replies + 1 WHERE id = ?";

					PreparedStatement updateStmt = conn.getConn().prepareStatement(updateCommentSQL);
					updateStmt.setInt(1, parentID);

					int rowsAffected = updateStmt.executeUpdate();

					if (rowsAffected > 0) {
						String updatePostsSQL = "UPDATE posts SET replies = replies + 1 WHERE id = (SELECT parentID FROM comment WHERE id = ?)";

						PreparedStatement updatePostsStmt = conn.getConn().prepareStatement(updatePostsSQL);
						updatePostsStmt.setInt(1, parentID);

						int postsRowsAffected = updatePostsStmt.executeUpdate();
					}

				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}
			conn.closeDB();
		}

		return newComment;
	}
}
