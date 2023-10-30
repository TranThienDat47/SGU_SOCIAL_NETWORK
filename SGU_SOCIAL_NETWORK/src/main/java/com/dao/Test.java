package com.dao;

public class Test {

	public static void main(String[] args) {
		PostDAO posts = new PostDAO();

		posts.searchPost(0, 0, "la").forEach(c -> System.out.println(c.toString()));

	}

}
