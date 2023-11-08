package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.UserModel;
import com.util.DatabaseGlobal;

public class UserDAO {

	public UserDAO() {
	}

	public boolean isEmailAlreadyRegistered(String email) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();

		try {
			dtConnection.getConnection();

			PreparedStatement pst = dtConnection.getConn().prepareStatement("SELECT id FROM users WHERE email = ?");
			pst.setString(1, email);

			ResultSet rs = pst.executeQuery();

			return rs.next();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			dtConnection.closeDB();
		}
	}

	public UserModel addUser(UserModel user) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();

		String newSQL = "INSERT INTO users (email, password, phoneNumber, firstName, lastName, dateOfBirth, address, gender) "
				+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

		try {
			dtConnection.getConnection();
			PreparedStatement pst = dtConnection.getConn().prepareStatement(newSQL, Statement.RETURN_GENERATED_KEYS);
			pst.setString(1, user.getEmail());
			pst.setString(2, user.getPassword());
			pst.setString(3, user.getPhoneNumber());
			pst.setString(4, user.getFirstName());
			pst.setString(5, user.getLastName());
			pst.setString(6, user.getDateOfBirth());
			pst.setString(7, user.getAddress());
			pst.setBoolean(8, user.isGender());

			int rowCount = pst.executeUpdate();

			if (rowCount > 0) {
				ResultSet generatedKeys = pst.getGeneratedKeys();
				if (generatedKeys.next()) {
					int userId = generatedKeys.getInt(1);

					String imgTemp = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARUAAAFiCAIAAABXq9vMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAOOSURBVHhe7dMxAQAADMOg+bdVY/OQGzxwAyp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DaHmimgSC+2qKbAAAAAElFTkSuQmCC";

					user.setId(userId);
					user.setImage(imgTemp);
					user.setBackground(imgTemp);
					return user;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			dtConnection.closeDB();
		}

		return null;
	}

	public UserModel updateUser(UserModel user) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();

		String updateSQL = "UPDATE users SET phoneNumber = ?, firstName = ?, lastName = ?, dateOfBirth = ?, address = ?, gender = ?, biography = ? WHERE id = ?";

		try {
			dtConnection.getConnection();
			PreparedStatement pst = dtConnection.getConn().prepareStatement(updateSQL);
			pst.setString(1, user.getPhoneNumber());
			pst.setString(2, user.getFirstName());
			pst.setString(3, user.getLastName());
			pst.setString(4, user.getDateOfBirth());
			pst.setString(5, user.getAddress());
			pst.setBoolean(6, user.isGender());
			pst.setString(7, user.getBiography());
			pst.setInt(8, user.getId()); // Sử dụng id để xác định người dùng cần được cập nhật

			int rowCount = pst.executeUpdate();

			if (rowCount > 0) {
				return user; // Trả về đối tượng người dùng sau khi cập nhật
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			dtConnection.closeDB();
		}

		return null;
	}

	public UserModel login(String email, String password) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();
		UserModel user = new UserModel();

		try {
			dtConnection.getConnection();

			PreparedStatement pst = dtConnection.getConn()
					.prepareStatement("SELECT * from users where email = ? and password = ?");
			pst.setString(1, email);
			pst.setString(2, password);
			ResultSet rs = pst.executeQuery();

			if (rs.next()) {
				user.setId(rs.getInt("id"));
				user.setPassword(rs.getString("password"));
				user.setEmail(rs.getString("email"));
				user.setImage(rs.getString("image"));
				user.setPhoneNumber(rs.getString("phoneNumber"));
				user.setFirstName(rs.getString("firstName"));
				user.setLastName(rs.getString("lastName"));
				user.setDateOfBirth(rs.getString("dateOfBirth"));
				user.setCreateAt(rs.getString("createAt"));
				user.setAddress(rs.getString("address"));
				user.setBiography(rs.getString("biography"));
				user.setGender(rs.getBoolean("gender"));
				user.setBackground(rs.getString("background"));
				return user;
			}

			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			dtConnection.closeDB();
		}
	}

	public List<UserModel> recommendFriend(int offset, int limit, int userID) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();
		List<UserModel> recommendedFriends = new ArrayList<UserModel>();

		String newSQL = "";

		newSQL = "SELECT u.* FROM users u WHERE u.id != " + userID
				+ " AND NOT EXISTS (SELECT 1 FROM friends f WHERE (f.userID = u.id AND f.friendID = " + userID
				+ ") OR (f.userID = " + userID
				+ " AND f.friendID = u.id)) AND NOT EXISTS ( SELECT 1 FROM friendrequests fr  WHERE (fr.userID = u.id AND fr.requestID = "
				+ userID + ")  OR (fr.requestID = u.id AND fr.userID = " + userID + ") ) LIMIT " + limit + " OFFSET "
				+ offset;

		try {
			dtConnection.getConnection();

			Statement stmt = dtConnection.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);

			while (rs.next()) {
				UserModel user = new UserModel();
				user.setId(rs.getInt("id"));
				user.setEmail(rs.getString("email"));
				user.setImage(rs.getString("image"));
				user.setPhoneNumber(rs.getString("phoneNumber"));
				user.setFirstName(rs.getString("firstName"));
				user.setLastName(rs.getString("lastName"));
				user.setDateOfBirth(rs.getString("dateOfBirth"));
				user.setCreateAt(rs.getString("createAt"));
				user.setAddress(rs.getString("address"));
				user.setBiography(rs.getString("biography"));
				user.setGender(rs.getBoolean("gender"));
				user.setBackground(rs.getString("background"));

				// Lấy số lượng bạn chung
				int friendID = rs.getInt("id");
				int commonFriendCount = 0;

				// Truy vấn để lấy số lượng bạn chung
				String commonFriendCountSQL = "SELECT COUNT(DISTINCT f1.friendID) AS friendCount "
						+ "FROM friends f1 JOIN friends f2 ON f1.friendID = f2.friendID " + "WHERE f1.userID = "
						+ userID + " AND f2.userID = " + friendID;

				Statement stmt1 = dtConnection.getConn().createStatement();
				ResultSet rs1 = stmt1.executeQuery(commonFriendCountSQL);

				if (rs1.next()) {
					commonFriendCount = rs1.getInt("friendCount");
				}

				user.setCountRoomate(commonFriendCount);

				rs1.close();
				stmt1.close();

				recommendedFriends.add(user);
			}

			return recommendedFriends;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			dtConnection.closeDB();
		}
	}

	public UserModel getOneUser(int userID) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();
		UserModel user = new UserModel();

		try {
			dtConnection.getConnection();

			PreparedStatement pst = dtConnection.getConn().prepareStatement("SELECT * from users where id = ?");
			pst.setInt(1, userID);
			ResultSet rs = pst.executeQuery();

			if (rs.next()) {
				user.setId(rs.getInt("id"));
				user.setPassword(rs.getString("password"));
				user.setEmail(rs.getString("email"));
				user.setImage(rs.getString("image"));
				user.setPhoneNumber(rs.getString("phoneNumber"));
				user.setFirstName(rs.getString("firstName"));
				user.setLastName(rs.getString("lastName"));
				user.setDateOfBirth(rs.getString("dateOfBirth"));
				user.setCreateAt(rs.getString("createAt"));
				user.setAddress(rs.getString("address"));
				user.setBiography(rs.getString("biography"));
				user.setGender(rs.getBoolean("gender"));
				user.setBackground(rs.getString("background"));
				return user;
			}

			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			dtConnection.closeDB();
		}
	}

}
