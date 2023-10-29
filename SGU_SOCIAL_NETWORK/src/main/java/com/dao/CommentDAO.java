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

		String newSQL = "SELECT * FROM comment where parentid = " + parentID;

		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);

			List<CommentModel> list = new ArrayList<CommentModel>();

			while (rs.next()) {
				CommentModel cmt = new CommentModel(rs.getInt("id"), rs.getInt("parentID"), rs.getInt("userID"),
						rs.getString("content"), rs.getInt("likes"), rs.getInt("replies"), rs.getString("createAt"));
				list.add(cmt);
			}

			rs.close();

			return list;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public CommentModel addComment(int parentID, int userID, String content) {
		DatabaseGlobal conn = new DatabaseGlobal();

		conn.getConnection();

		String newSQL = "INSERT INTO comment (parentID, userID, content) " + "VALUES ('" + parentID + "', '" + userID
				+ "', '" + content + "')";

		CommentModel newComment = null; // Khai báo đối tượng CommentModel

		try {
			PreparedStatement stmt = conn.getConn().prepareStatement(newSQL, Statement.RETURN_GENERATED_KEYS);

			int rowsAffected = stmt.executeUpdate();

			if (rowsAffected > 0) {
				ResultSet generatedKeys = stmt.getGeneratedKeys();
				int newCommentID = -1;
				if (generatedKeys.next()) {
					newCommentID = generatedKeys.getInt(1);
				}

				generatedKeys.close();

				String query = "SELECT * FROM comment WHERE id = " + newCommentID;
				ResultSet rs = stmt.executeQuery(query);

				if (rs.next()) {
					newComment = new CommentModel(rs.getInt("id"), rs.getInt("parentID"), rs.getInt("userID"),
							rs.getString("content"), rs.getInt("likes"), rs.getInt("replies"),
							rs.getString("createAt"));
				}
			}

			conn.closeDB();

		} catch (Exception ex) {
			ex.printStackTrace();
			conn.closeDB();
		}

		System.out.println(newComment.toString());

		return newComment;
	}

}
