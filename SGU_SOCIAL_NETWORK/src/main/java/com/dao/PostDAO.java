package com.dao;

import java.sql.ResultSet;
import java.sql.Statement;

import com.model.PostModel;
import com.util.DatabaseGlobal;

public class PostDAO {

	private PostModel post;

	public PostDAO(PostModel post) {
		this.post = post;
	}

	public PostModel getPost() {
		return post;
	}

	public void setPost(PostModel post) {
		this.post = post;
	}

	public PostModel getPost(int id) {

		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT * FROM POSTS where id = " + id;

		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);

			while (rs.next()) {
				this.setPost(new PostModel(rs.getInt("id"), rs.getInt("authorID"), rs.getString("title"),
						rs.getString("content"), rs.getString("image1"), rs.getString("image2"), rs.getString("image3"),
						rs.getString("image4"), rs.getInt("likes"), rs.getInt("replies"), rs.getString("createAt"),
						rs.getString("updateAt")));
			}
			rs.close();
			System.out.println(post);

			conn.closeDB();
			return this.getPost();
		} catch (Exception ex) {
			ex.printStackTrace();
			conn.closeDB();
			return null;
		}

	}

}
