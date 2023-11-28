package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.model.UserModel;
import com.util.DatabaseGlobal;

public class UserDAO {

	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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

	public static String standardized(String str) {
		str = str.replaceAll("\\s+", " ");

		str = str.trim();

		str = str.replaceAll("[àáạảãâầấậẩẫăằắặẳẵ]", "a");
		str = str.replaceAll("[èéẹẻẽêềếệểễ]", "e");
		str = str.replaceAll("[ìíịỉĩ]", "i");
		str = str.replaceAll("[òóọỏõôồốộổỗơờớợởỡ]", "o");
		str = str.replaceAll("[ùúụủũưừứựửữ]", "u");
		str = str.replaceAll("[ỳýỵỷỹ]", "y");
		str = str.replaceAll("đ", "d");
		str = str.replaceAll("[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]", "A");
		str = str.replaceAll("[ÈÉẸẺẼÊỀẾỆỂỄ]", "E");
		str = str.replaceAll("[ÌÍỊỈĨ]", "I");
		str = str.replaceAll("[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]", "O");
		str = str.replaceAll("[ÙÚỤỦŨƯỪỨỰỬỮ]", "U");
		str = str.replaceAll("[ỲÝỴỶỸ]", "Y");
		str = str.replaceAll("Đ", "D");

		return str;
	}

	public UserModel addUser(UserModel user) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();

		String newSQL = "INSERT INTO users (email, password, phoneNumber, firstName, lastName, dateOfBirth, address, gender, keySearch) "
				+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

		try {
			dtConnection.getConnection();
			PreparedStatement pst = dtConnection.getConn().prepareStatement(newSQL, Statement.RETURN_GENERATED_KEYS);
			pst.setString(1, user.getEmail());

			String hashedPassword = passwordEncoder.encode(user.getPassword());
			pst.setString(2, hashedPassword);

			pst.setString(3, user.getPhoneNumber());
			pst.setString(4, user.getFirstName());
			pst.setString(5, user.getLastName());
			pst.setString(6, user.getDateOfBirth());
			pst.setString(7, user.getAddress());
			pst.setBoolean(8, user.isGender());
			pst.setString(9, standardized(user.getFirstName() + " " + user.getLastName()));

			int rowCount = pst.executeUpdate();

			if (rowCount > 0) {
				ResultSet generatedKeys = pst.getGeneratedKeys();
				if (generatedKeys.next()) {
					int userId = generatedKeys.getInt(1);

					String imgTemp = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARUAAAFiCAIAAABXq9vMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAOOSURBVHhe7dMxAQAADMOg+bdVY/OQGzxwAyp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DzBzp/oPMHOn+g8wc6f6DaHmimgSC+2qKbAAAAAElFTkSuQmCC";

					user.setId(userId);
					user.setImage(imgTemp);
					user.setBackground(imgTemp);

					String selectSQL = "SELECT * FROM users WHERE id = ?";
					PreparedStatement selectPst = dtConnection.getConn().prepareStatement(selectSQL);
					selectPst.setInt(1, userId);
					ResultSet result = selectPst.executeQuery();

					if (result.next()) {
						user.setCreateAt(result.getString("createAt"));
						user.setBiography("");
					}

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

		String updateSQL = "UPDATE users SET phoneNumber = ?, firstName = ?, lastName = ?, dateOfBirth = ?, address = ?, gender = ?, biography = ?, keySearch = ? WHERE id = ?";

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
			pst.setString(8, standardized(user.getFirstName() + " " + user.getLastName()));
			pst.setInt(9, user.getId()); // Sử dụng id để xác định người dùng cần được cập nhật

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

	public boolean updateAvataUser(int id, String avata) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();
		String updateSQL = "UPDATE users SET image = ? WHERE id = ?";

		try {
			dtConnection.getConnection();
			PreparedStatement pst = dtConnection.getConn().prepareStatement(updateSQL);
			pst.setString(1, avata);
			pst.setInt(2, id);

			int rowCount = pst.executeUpdate();

			return rowCount > 0;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			dtConnection.closeDB();
		}
	}

	public boolean updateBackgroundUser(int id, String background) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();
		String updateSQL = "UPDATE users SET background = ? WHERE id = ?";

		try {
			dtConnection.getConnection();
			PreparedStatement pst = dtConnection.getConn().prepareStatement(updateSQL);
			pst.setString(1, background);
			pst.setInt(2, id);

			int rowCount = pst.executeUpdate();

			return rowCount > 0;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			dtConnection.closeDB();
		}
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
				String commonFriendCountSQL = "SELECT SUM(sub.friendCount) AS totalFriendCount" + " FROM ("
						+ "    SELECT COUNT(*) AS friendCount " + "    FROM friends f1 "
						+ "    JOIN friends f2 ON f1.friendID = f2.friendID " + "    WHERE f1.userID = " + userID
						+ " AND f2.userID = " + friendID + "" + "    UNION " + "    SELECT COUNT(*) AS friendCount "
						+ "    FROM friends f1 " + "    JOIN friends f2 ON f1.userID = f2.userID "
						+ "    WHERE f1.friendID = " + userID + " AND f2.friendID = " + friendID + "" + ") AS sub";

				Statement stmt1 = dtConnection.getConn().createStatement();
				ResultSet rs1 = stmt1.executeQuery(commonFriendCountSQL);

				if (rs1.next()) {
					commonFriendCount = rs1.getInt("totalFriendCount");
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

	public List<UserModel> searchUser(int userID, int offset, int limit, String valueSearch) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();

		try {
			dtConnection.getConnection();

			PreparedStatement pst = dtConnection.getConn()
					.prepareStatement("SELECT * FROM users u WHERE " + "CONCAT(' ', LOWER(u.keySearch), ' ') LIKE ? OR "
							+ "CONVERT(LOWER(CONCAT(u.lastName, ' ', u.firstName)) USING utf8) LIKE ? OR "
							+ "POSITION(LOWER(u.firstName) IN LOWER(?)) > 0 OR "
							+ "POSITION(LOWER(u.lastName) IN LOWER(?)) > 0 LIMIT ? OFFSET ?");
			pst.setString(1, "%" + valueSearch + "%");
			pst.setString(2, "%" + valueSearch + "%");
			pst.setString(3, valueSearch);
			pst.setString(4, valueSearch);
			pst.setInt(5, limit);
			pst.setInt(6, offset);

			ResultSet rs = pst.executeQuery();
			List<UserModel> userList = new ArrayList<>();

			while (rs.next()) {
				UserModel user = new UserModel();
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

				// Lấy số lượng bạn chung
				int friendID = Integer.parseInt(rs.getString("id"));
				int commonFriendCount = 0;

				String commonFriendCountSQL = "SELECT SUM(sub.friendCount) AS totalFriendCount" + " FROM ("
						+ "    SELECT COUNT(*) AS friendCount " + "    FROM friends f1 "
						+ "    JOIN friends f2 ON f1.friendID = f2.friendID " + "    WHERE f1.userID = " + userID
						+ " AND f2.userID = " + friendID + "" + "    UNION " + "    SELECT COUNT(*) AS friendCount "
						+ "    FROM friends f1 " + "    JOIN friends f2 ON f1.userID = f2.userID "
						+ "    WHERE f1.friendID = " + userID + " AND f2.friendID = " + friendID + "" + ") AS sub";

				Statement stmt1 = dtConnection.getConn().createStatement();
				ResultSet rs1 = stmt1.executeQuery(commonFriendCountSQL);

				if (rs1.next()) {
					commonFriendCount = rs1.getInt("totalFriendCount");
				}

				rs1.close();
				stmt1.close();

				user.setCountRoomate(commonFriendCount);
				userList.add(user);
			}
			return userList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			dtConnection.closeDB();
		}
	}

	public List<UserModel> searchUserWithFriend(int userID, int offset, int limit, String valueSearch) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();

		try {
			dtConnection.getConnection();

			String searchFriendsSQL = "SELECT sub.* FROM (" + "    SELECT f.*, u.image, u.firstName, u.lastName "
					+ "    FROM FRIENDS f " + "    INNER JOIN USERS u ON f.friendID = u.id "
					+ "    WHERE f.userID = ?  " + "      AND (CONCAT(' ', LOWER(u.keySearch), ' ') LIKE ? OR "
					+ "           CONVERT(LOWER(CONCAT(u.lastName, ' ', u.firstName)) USING utf8) LIKE ? OR "
					+ "           POSITION(LOWER(u.firstName) IN LOWER(?)) > 0 OR "
					+ "           POSITION(LOWER(u.lastName) IN LOWER(?)) > 0) " + "    UNION "
					+ "    SELECT f.*, u.image, u.firstName, u.lastName " + "    FROM FRIENDS f "
					+ "    INNER JOIN USERS u ON f.userID = u.id " + "    WHERE f.friendID = ? "
					+ "      AND (CONCAT(' ', LOWER(u.keySearch), ' ') LIKE ? OR "
					+ "           CONVERT(LOWER(CONCAT(u.lastName, ' ', u.firstName)) USING utf8) LIKE ? OR "
					+ "           POSITION(LOWER(u.firstName) IN LOWER(?)) > 0 OR "
					+ "           POSITION(LOWER(u.lastName) IN LOWER(?)) > 0) " + ") AS sub LIMIT ? OFFSET ?";

			PreparedStatement pst = dtConnection.getConn().prepareStatement(searchFriendsSQL);
			pst.setInt(1, userID);
			pst.setString(2, "%" + valueSearch + "%");
			pst.setString(3, "%" + valueSearch + "%");
			pst.setString(4, valueSearch);
			pst.setString(5, valueSearch);
			pst.setInt(6, userID);
			pst.setString(7, "%" + valueSearch + "%");
			pst.setString(8, "%" + valueSearch + "%");
			pst.setString(9, valueSearch);
			pst.setString(10, valueSearch);
			pst.setInt(11, limit);
			pst.setInt(12, offset);

			ResultSet rs = pst.executeQuery();
			List<UserModel> userList = new ArrayList<>();

			while (rs.next()) {
				UserModel user = new UserModel();
				user.setId(rs.getInt("id"));
				user.setImage(rs.getString("image"));
				user.setFirstName(rs.getString("firstName"));
				user.setLastName(rs.getString("lastName"));

				// Lấy số lượng bạn chung
				int friendID = Integer.parseInt(rs.getString("id"));
				int commonFriendCount = 0;

				String commonFriendCountSQL = "SELECT SUM(sub.friendCount) AS totalFriendCount" + " FROM ("
						+ "    SELECT COUNT(*) AS friendCount " + "    FROM friends f1 "
						+ "    JOIN friends f2 ON f1.friendID = f2.friendID " + "    WHERE f1.userID = " + userID
						+ " AND f2.userID = " + friendID + "" + "    UNION " + "    SELECT COUNT(*) AS friendCount "
						+ "    FROM friends f1 " + "    JOIN friends f2 ON f1.userID = f2.userID "
						+ "    WHERE f1.friendID = " + userID + " AND f2.friendID = " + friendID + "" + ") AS sub";

				Statement stmt1 = dtConnection.getConn().createStatement();
				ResultSet rs1 = stmt1.executeQuery(commonFriendCountSQL);

				if (rs1.next()) {
					commonFriendCount = rs1.getInt("totalFriendCount");
				}

				rs1.close();
				stmt1.close();

				user.setCountRoomate(commonFriendCount);
				userList.add(user);
			}
			return userList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			dtConnection.closeDB();
		}
	}

}
