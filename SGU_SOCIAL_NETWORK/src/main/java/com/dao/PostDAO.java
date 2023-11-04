package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.PostModel;
import com.util.DatabaseGlobal;

public class PostDAO {

	public PostDAO() {
	}

	public boolean createPost(PostModel post) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "INSERT INTO POSTS (authorID, privacySettingID, content, image1, image2, image3, image4) "
				+ "VALUES (?, ?, ?, ?, ?, ?, ?)";

		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(newSQL);
			pstmt.setInt(1, post.getAuthorID());
			pstmt.setInt(2, post.getPrivacySettingID());
			pstmt.setString(3, post.getContent());
			pstmt.setString(4, post.getImage1());
			pstmt.setString(5, post.getImage2());
			pstmt.setString(6, post.getImage3());
			pstmt.setString(7, post.getImage4());

			int rowsAffected = pstmt.executeUpdate();
			pstmt.close();

			return rowsAffected > 0;
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		} finally {
			conn.closeDB();
		}
	}

	public List<PostModel> searchPostOfUser(int offset, int limit, int userID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "";

		if (offset != -1 && limit != -1 && userID != -1) {
			newSQL = "SELECT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
					+ "INNER JOIN USERS u ON p.authorID = u.id " + "WHERE p.authorID = " + userID + " LIMIT " + limit
					+ " OFFSET " + offset;
		} else if (offset != -1 && limit != -1 && userID == -1) {
			newSQL = "SELECT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
					+ "INNER JOIN USERS u ON p.authorID = u.id " + "LIMIT " + limit + " OFFSET " + offset;
		} else if (offset == -1 && limit == -1 && userID != -1) {
			newSQL = "SELECT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
					+ "INNER JOIN USERS u ON p.authorID = u.id " + "WHERE p.authorID = " + userID;
		} else {
			newSQL = "SELECT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
					+ "INNER JOIN USERS u ON p.authorID = u.id";
		}

		List<PostModel> listPost = new ArrayList<PostModel>();
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				PostModel post = new PostModel(rs.getInt("id"), rs.getInt("authorID"), rs.getInt("privacySettingID"),
						rs.getString("title"), rs.getString("content"), rs.getString("image1"), rs.getString("image2"),
						rs.getString("image3"), rs.getString("image4"), rs.getInt("likes"), rs.getInt("replies"),
						rs.getString("createAt"), rs.getString("updateAt"));

				post.setImage(rs.getString("image"));
				post.setFirstName(rs.getString("firstName"));
				post.setLastName(rs.getString("lastName"));

				listPost.add(post);
			}
			rs.close();
			conn.closeDB();

			return listPost;
		} catch (Exception ex) {
			ex.printStackTrace();
			conn.closeDB();
			return null;
		}
	}

	public List<PostModel> searchPost(int offset, int limit, String keySearch) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "";

		if (offset != -1 && limit != -1 && !keySearch.trim().equals("")) {
			newSQL = "SELECT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
					+ "INNER JOIN USERS u ON p.authorID = u.id " + "WHERE p.content LIKE '%" + keySearch + "%' LIMIT "
					+ limit + " OFFSET " + offset;
		} else if (offset != -1 && limit != -1 && keySearch.trim().equals("")) {
			newSQL = "SELECT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
					+ "INNER JOIN USERS u ON p.authorID = u.id " + "LIMIT " + limit + " OFFSET " + offset;
		} else if (offset == -1 && limit == -1 && !keySearch.trim().equals("")) {
			newSQL = "SELECT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
					+ "INNER JOIN USERS u ON p.authorID = u.id " + "WHERE p.content LIKE '%" + keySearch + "%'";
		} else {
			newSQL = "SELECT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
					+ "INNER JOIN USERS u ON p.authorID = u.id";
		}

		List<PostModel> listPost = new ArrayList<PostModel>();
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				PostModel post = new PostModel(rs.getInt("id"), rs.getInt("authorID"), rs.getInt("privacySettingID"),
						rs.getString("title"), rs.getString("content"), rs.getString("image1"), rs.getString("image2"),
						rs.getString("image3"), rs.getString("image4"), rs.getInt("likes"), rs.getInt("replies"),
						rs.getString("createAt"), rs.getString("updateAt"));

				post.setImage(rs.getString("image"));
				post.setFirstName(rs.getString("firstName"));
				post.setLastName(rs.getString("lastName"));

				listPost.add(post);
			}
			rs.close();
			conn.closeDB();

			return listPost;
		} catch (Exception ex) {
			ex.printStackTrace();
			conn.closeDB();
			return null;
		}
	}

	public PostModel getOnePost(int id) {

		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT * FROM POSTS where id = " + id;

		PostModel post = null;
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				post = new PostModel(rs.getInt("id"), rs.getInt("authorID"), rs.getInt("privacySettingID"),
						rs.getString("title"), rs.getString("content"), rs.getString("image1"), rs.getString("image2"),
						rs.getString("image3"), rs.getString("image4"), rs.getInt("likes"), rs.getInt("replies"),
						rs.getString("createAt"), rs.getString("updateAt"));
			}
			rs.close();
			return post;
		} catch (Exception ex) {
			ex.printStackTrace();
			return post;
		} finally {
			conn.closeDB();
		}

	}

}
