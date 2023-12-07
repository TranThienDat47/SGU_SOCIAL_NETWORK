package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.PostModel;
import com.util.BlowfishUtil;
import com.util.DatabaseGlobal;

public class PostDAO {

	public PostDAO() {
	}

	public int createPost(PostModel post) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "INSERT INTO POSTS (authorID, privacySettingID, content, image1, image2, image3, image4) "
				+ "VALUES (?, ?, ?, ?, ?, ?, ?)";

		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(newSQL, Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, post.getAuthorID());
			pstmt.setInt(2, post.getPrivacySettingID());
			pstmt.setString(3, (post.getContent()));
			pstmt.setString(4, post.getImage1());
			pstmt.setString(5, post.getImage2());
			pstmt.setString(6, post.getImage3());
			pstmt.setString(7, post.getImage4());

			int rowsAffected = pstmt.executeUpdate();

			if (rowsAffected > 0) {
				ResultSet generatedKeys = pstmt.getGeneratedKeys();
				if (generatedKeys.next()) {
					int generatedId = generatedKeys.getInt(1);
					pstmt.close();
					return generatedId;
				}
			}

			pstmt.close();
			return -1; // hoặc giá trị khác thích hợp để biểu thị lỗi
		} catch (Exception ex) {
			ex.printStackTrace();
			return -1; // hoặc giá trị khác thích hợp để biểu thị lỗi
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
					+ "INNER JOIN USERS u ON p.authorID = u.id " + "WHERE p.authorID = " + userID
					+ " ORDER BY p.createAt DESC " + " LIMIT " + limit + " OFFSET " + offset;
		} else if (offset != -1 && limit != -1 && userID == -1) {
			newSQL = "SELECT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
					+ "INNER JOIN USERS u ON p.authorID = u.id " + " ORDER BY p.createAt DESC " + "LIMIT " + limit
					+ " OFFSET " + offset;
		} else if (offset == -1 && limit == -1 && userID != -1) {
			newSQL = "SELECT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
					+ "INNER JOIN USERS u ON p.authorID = u.id " + "WHERE p.authorID = " + userID
					+ " ORDER BY p.createAt DESC ";
		} else {
			newSQL = "SELECT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
					+ "INNER JOIN USERS u ON p.authorID = u.id" + " ORDER BY p.createAt DESC ";
		}

		List<PostModel> listPost = new ArrayList<PostModel>();
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				PostModel post = new PostModel(rs.getInt("id"), rs.getInt("authorID"), rs.getInt("privacySettingID"),
						rs.getString("title"), (rs.getString("content")), rs.getString("image1"),
						rs.getString("image2"), rs.getString("image3"), rs.getString("image4"), rs.getInt("likes"),
						rs.getInt("replies"), rs.getString("createAt"), rs.getString("updateAt"));

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

	public List<PostModel> searchPostWithFriend(int offset, int limit, String keySearch, int userID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "";

		newSQL = "SELECT DISTINCT p.*, u.image, u.firstName, u.lastName " + "FROM POSTS p "
				+ "INNER JOIN USERS u ON p.authorID = u.id "
				+ "INNER JOIN FRIENDS f ON (p.authorID = f.friendID AND f.userID = " + userID
				+ ") OR (p.authorID = f.userID AND f.friendID = " + userID + ") " + "WHERE '" + keySearch
				+ "' LIKE CONCAT('%', p.content, '%') OR p.content LIKE '%" + keySearch + "%' "
				+ " ORDER BY p.createAt DESC " + "LIMIT " + limit + " OFFSET " + offset;
		List<PostModel> listPost = new ArrayList<PostModel>();
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				PostModel post = new PostModel(rs.getInt("id"), rs.getInt("authorID"), rs.getInt("privacySettingID"),
						rs.getString("title"), (rs.getString("content")), rs.getString("image1"),
						rs.getString("image2"), rs.getString("image3"), rs.getString("image4"), rs.getInt("likes"),
						rs.getInt("replies"), rs.getString("createAt"), rs.getString("updateAt"));

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

		newSQL = "SELECT DISTINCT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
				+ "INNER JOIN USERS u ON p.authorID = u.id " + "WHERE '" + keySearch
				+ "' LIKE CONCAT('%', p.content, '%') or p.content LIKE '%" + keySearch + "%' "
				+ " ORDER BY p.createAt DESC " + "LIMIT " + limit + " OFFSET " + offset;

		List<PostModel> listPost = new ArrayList<PostModel>();
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				PostModel post = new PostModel(rs.getInt("id"), rs.getInt("authorID"), rs.getInt("privacySettingID"),
						rs.getString("title"), (rs.getString("content")), rs.getString("image1"),
						rs.getString("image2"), rs.getString("image3"), rs.getString("image4"), rs.getInt("likes"),
						rs.getInt("replies"), rs.getString("createAt"), rs.getString("updateAt"));

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

	public List<PostModel> searchPostHome(int userID, int offset, int limit, String keySearch) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "";

		newSQL = "SELECT DISTINCT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
				+ "INNER JOIN USERS u ON p.authorID = u.id " + "WHERE (u.id = " + userID + " or (u.id in (SELECT sub.*"
				+ "FROM (" + "SELECT f.friendID FROM FRIENDS f" + " WHERE f.userID =" + userID + " UNION"
				+ " SELECT f.userID FROM FRIENDS f" + " WHERE f.friendID = " + userID + " ) AS sub))) and ('"
				+ keySearch + "' LIKE CONCAT('%', p.content, '%') or p.content LIKE '%" + keySearch + "%') "
				+ " ORDER BY p.createAt DESC " + "LIMIT " + limit + " OFFSET " + offset;

		List<PostModel> listPost = new ArrayList<PostModel>();
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				PostModel post = new PostModel(rs.getInt("id"), rs.getInt("authorID"), rs.getInt("privacySettingID"),
						rs.getString("title"), (rs.getString("content")), rs.getString("image1"),
						rs.getString("image2"), rs.getString("image3"), rs.getString("image4"), rs.getInt("likes"),
						rs.getInt("replies"), rs.getString("createAt"), rs.getString("updateAt"));

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

	public List<PostModel> searchPostFollow(int userID, int offset, int limit, String keySearch) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "";

		newSQL = "SELECT DISTINCT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
				+ "INNER JOIN USERS u ON p.authorID = u.id " + "WHERE (u.id in (" + "SELECT f.followID FROM follows f"
				+ " WHERE f.userID =" + userID + ")) and ('" + keySearch
				+ "' LIKE CONCAT('%', p.content, '%') or p.content LIKE '%" + keySearch + "%') "
				+ " ORDER BY p.createAt DESC " + "LIMIT " + limit + " OFFSET " + offset;

		List<PostModel> listPost = new ArrayList<PostModel>();
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				PostModel post = new PostModel(rs.getInt("id"), rs.getInt("authorID"), rs.getInt("privacySettingID"),
						rs.getString("title"), (rs.getString("content")), rs.getString("image1"),
						rs.getString("image2"), rs.getString("image3"), rs.getString("image4"), rs.getInt("likes"),
						rs.getInt("replies"), rs.getString("createAt"), rs.getString("updateAt"));

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

	public List<PostModel> searchPostRecommend(int userID, int offset, int limit, String keySearch) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "";

		newSQL = "SELECT DISTINCT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
				+ "INNER JOIN USERS u ON p.authorID = u.id " + "WHERE (u.id != " + userID + " and u.id not in ("
				+ " SELECT f.followID FROM follows f" + " WHERE f.userID =" + userID + ") "
				+ " and u.id not in (SELECT sub.*" + " FROM (" + "SELECT f.friendID FROM FRIENDS f"
				+ " WHERE f.userID =" + userID + " UNION" + " SELECT f.userID FROM FRIENDS f" + " WHERE f.friendID = "
				+ userID + " ) AS sub)) and ('" + keySearch + " ' LIKE CONCAT('%', p.content, '%') or p.content LIKE '%"
				+ keySearch + "%') " + " ORDER BY p.createAt DESC " + "LIMIT " + limit + " OFFSET " + offset;

		List<PostModel> listPost = new ArrayList<PostModel>();
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				PostModel post = new PostModel(rs.getInt("id"), rs.getInt("authorID"), rs.getInt("privacySettingID"),
						rs.getString("title"), (rs.getString("content")), rs.getString("image1"),
						rs.getString("image2"), rs.getString("image3"), rs.getString("image4"), rs.getInt("likes"),
						rs.getInt("replies"), rs.getString("createAt"), rs.getString("updateAt"));

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

		String newSQL = "SELECT DISTINCT p.*, u.image, u.firstName, u.lastName FROM POSTS p "
				+ "INNER JOIN USERS u ON p.authorID = u.id " + "WHERE p.id = " + id;

		PostModel post = null;
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				post = new PostModel(rs.getInt("id"), rs.getInt("authorID"), rs.getInt("privacySettingID"),
						rs.getString("title"), (rs.getString("content")), rs.getString("image1"),
						rs.getString("image2"), rs.getString("image3"), rs.getString("image4"), rs.getInt("likes"),
						rs.getInt("replies"), rs.getString("createAt"), rs.getString("updateAt"));

				post.setImage(rs.getString("image"));
				post.setFirstName(rs.getString("firstName"));
				post.setLastName(rs.getString("lastName"));
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

	public boolean deletePost(int id) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "DELETE FROM posts WHERE id = ?";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, id);

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