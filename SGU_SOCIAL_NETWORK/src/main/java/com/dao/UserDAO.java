package com.dao;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import com.model.UserModel;
import com.util.DatabaseGlobal;

public class UserDAO {

	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public UserDAO() {
	}

	private static String envKey = "1234567890123456";

	private static String encrypt(String data) {
		if (data.trim().length() <= 0) {
			return "";
		}
		try {
			SecretKeySpec secretKeySpec = new SecretKeySpec(envKey.getBytes(StandardCharsets.UTF_8), "AES");
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

			// Tạo một IV ngẫu nhiên (tránh vấn đề với ECB)
			SecureRandom secureRandom = new SecureRandom();
			byte[] iv = new byte[cipher.getBlockSize()];
			secureRandom.nextBytes(iv);

			cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, new IvParameterSpec(iv));

			byte[] encryptedBytes = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));

			// Kết hợp IV và dữ liệu đã mã hóa thành một chuỗi Base64
			byte[] combined = new byte[iv.length + encryptedBytes.length];
			System.arraycopy(iv, 0, combined, 0, iv.length);
			System.arraycopy(encryptedBytes, 0, combined, iv.length, encryptedBytes.length);

			return Base64.getEncoder().encodeToString(combined);
		} catch (Exception e) {
			// Xử lý exception theo ý bạn muốn
			e.printStackTrace();
		}
		return null;
	}

	private static String decrypt(String data) {
		if (data.trim().length() <= 0) {
			return "";
		}
		try {
			byte[] combined = Base64.getDecoder().decode(data);
			byte[] iv = Arrays.copyOfRange(combined, 0, 16); // Lấy IV từ dữ liệu
			byte[] encryptedBytes = Arrays.copyOfRange(combined, 16, combined.length); // Lấy dữ liệu đã mã hóa

			SecretKeySpec secretKeySpec = new SecretKeySpec(envKey.getBytes(StandardCharsets.UTF_8), "AES");
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

			cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, new IvParameterSpec(iv));

			byte[] decryptedBytes = cipher.doFinal(encryptedBytes);

			return new String(decryptedBytes, StandardCharsets.UTF_8);
		} catch (Exception e) {
			// Xử lý exception theo ý bạn muốn
			e.printStackTrace();
			return "";
		}
	}

	public boolean isEmailAlreadyRegistered(String email) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();

		try {
			dtConnection.getConnection();

			PreparedStatement pst = dtConnection.getConn().prepareStatement("SELECT id FROM users WHERE email = ?");
			pst.setString(1, (email));

			ResultSet rs = pst.executeQuery();

			return rs.next();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			dtConnection.closeDB();
		}
	}

	public boolean checkPassword(String email, String password) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();
		UserModel user = new UserModel();

		try {
			dtConnection.getConnection();

			PreparedStatement pst = dtConnection.getConn().prepareStatement("SELECT * from users where email = ?");
			pst.setString(1, (email));
			ResultSet rs = pst.executeQuery();

			if (rs.next()) {
				user.setPassword(rs.getString("password"));
				if (passwordEncoder.matches(password, user.getPassword())) {
					return true;
				}
			}
			return false;
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
			pst.setString(1, (user.getEmail()));

			String hashedPassword = passwordEncoder.encode(user.getPassword());
			pst.setString(2, hashedPassword);

			pst.setString(3, encrypt(user.getPhoneNumber()));
			pst.setString(4, (user.getFirstName()));
			pst.setString(5, (user.getLastName()));
			pst.setString(6, (user.getDateOfBirth()));
			pst.setString(7, encrypt(user.getAddress()));
			pst.setBoolean(8, user.isGender());
			pst.setString(9, (standardized(user.getFirstName() + " " + user.getLastName())));

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
			pst.setString(1, encrypt(user.getPhoneNumber()));
			pst.setString(2, (user.getFirstName()));
			pst.setString(3, (user.getLastName()));
			pst.setString(4, user.getDateOfBirth());
			pst.setString(5, encrypt(user.getAddress()));
			pst.setBoolean(6, user.isGender());
			pst.setString(7, encrypt(user.getBiography()));
			pst.setString(8, (standardized(user.getFirstName() + " " + user.getLastName())));
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

	public boolean updatePassword(String email, String newPassword) {
		DatabaseGlobal dtConnection = new DatabaseGlobal();
		String updateSQL = "UPDATE users SET password = ? WHERE email = ?";

		try {
			dtConnection.getConnection();
			PreparedStatement pst = dtConnection.getConn().prepareStatement(updateSQL);

			String hashedPassword = passwordEncoder.encode(newPassword);

			pst.setString(1, hashedPassword);
			pst.setString(2, email);

			int rowCount = pst.executeUpdate();

			return rowCount > 0;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			dtConnection.closeDB();
		}
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

			PreparedStatement pst = dtConnection.getConn().prepareStatement("SELECT * from users where email = ?");
			pst.setString(1, (email));
			ResultSet rs = pst.executeQuery();

			if (rs.next()) {
				user.setId(rs.getInt("id"));
				user.setPassword(rs.getString("password"));
				user.setEmail((rs.getString("email")));
				user.setImage(rs.getString("image"));
				user.setPhoneNumber(decrypt(rs.getString("phoneNumber")));
				user.setFirstName((rs.getString("firstName")));
				user.setLastName((rs.getString("lastName")));
				user.setDateOfBirth(rs.getString("dateOfBirth"));
				user.setCreateAt(rs.getString("createAt"));
				user.setAddress(decrypt(rs.getString("address")));
				user.setBiography(decrypt(rs.getString("biography")));
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
				user.setEmail((rs.getString("email")));
				user.setImage(rs.getString("image"));
				user.setPhoneNumber(decrypt(rs.getString("phoneNumber")));
				user.setFirstName((rs.getString("firstName")));
				user.setLastName((rs.getString("lastName")));
				user.setDateOfBirth(rs.getString("dateOfBirth"));
				user.setCreateAt(rs.getString("createAt"));
				user.setAddress(decrypt(rs.getString("address")));
				user.setBiography(decrypt(rs.getString("biography")));
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
				user.setEmail((rs.getString("email")));
				user.setImage(rs.getString("image"));
				user.setPhoneNumber(decrypt(rs.getString("phoneNumber")));
				user.setFirstName((rs.getString("firstName")));
				user.setLastName((rs.getString("lastName")));
				user.setDateOfBirth(rs.getString("dateOfBirth"));
				user.setCreateAt(rs.getString("createAt"));
				user.setAddress(decrypt(rs.getString("address")));
				user.setBiography(decrypt(rs.getString("biography")));
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
				user.setEmail((rs.getString("email")));
				user.setImage(rs.getString("image"));
				user.setPhoneNumber(decrypt(rs.getString("phoneNumber")));
				user.setFirstName((rs.getString("firstName")));
				user.setLastName((rs.getString("lastName")));
				user.setDateOfBirth(rs.getString("dateOfBirth"));
				user.setCreateAt(rs.getString("createAt"));
				user.setAddress(decrypt(rs.getString("address")));
				user.setBiography(decrypt(rs.getString("biography")));
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
				user.setId(rs.getInt("userID") == userID ? rs.getInt("friendID") : rs.getInt("userID"));
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
