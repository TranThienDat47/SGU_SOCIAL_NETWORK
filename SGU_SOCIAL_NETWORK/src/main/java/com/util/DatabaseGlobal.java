package com.util;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseGlobal {
	private static Connection conn = null;
	private static String DB_URL = "jdbc:mysql://localhost:3306/sgu_social_network";
	private static String USER_NAME = "root";
	private static String PASSWORD = "";

	public Connection getConnection() {

		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(DB_URL, USER_NAME, PASSWORD);
			System.out.println("connect successfully!");
		} catch (Exception ex) {
			System.out.println("connect failure!");
			ex.printStackTrace();
		}
		return conn;
	}

	public static Connection getConn() {
		return conn;
	}

	public static void setConn(Connection conn) {
		DatabaseGlobal.conn = conn;
	}

	public boolean closeDB() {

		try {
			conn.close();
			System.out.println("Close connect successfull!");
			return true;
		} catch (Exception ex) {
			System.out.println("Close connect failure!");
			return false;
		}
	}
}
