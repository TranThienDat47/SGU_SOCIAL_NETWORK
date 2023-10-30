package com.dao;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.PostModel;
import com.util.DatabaseGlobal;

public class PostDAO {

	public PostDAO() {
	}

	public List<PostModel> searchPost(int offset, int limit, String keySearch) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "";

		if (offset != -1 && limit != -1 && !keySearch.trim().equals("")) {
			newSQL = "SELECT * FROM POSTS where content LIKE '%" + keySearch + "%' LIMIT " + limit + " OFFSET "
					+ offset;
		} else if (offset != -1 && limit != -1 && keySearch.trim().equals("")) {
			newSQL = "SELECT * FROM POSTS LIMIT " + limit + " OFFSET " + offset;
		} else if (offset == -1 && limit == -1 && !keySearch.trim().equals("")) {
			newSQL = "SELECT * FROM POSTS where content LIKE '%" + keySearch + "%'";
		} else {
			newSQL = "SELECT * FROM POSTS";
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

			conn.closeDB();
			return post;
		} catch (Exception ex) {
			ex.printStackTrace();
			conn.closeDB();
			return post;
		}

	}

}
