package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.FollowModel;
import com.model.LikeCommentModel;
import com.model.LikePostModel;
import com.model.NotificationModel;
import com.util.DatabaseGlobal;

public class NotificationDAO {
	public NotificationDAO() {
	}

	public List<NotificationModel> getNotification(int userID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT DISTINCT n.*, u.image, u.firstName, u.lastName FROM notifications n "
				+ "inner JOIN USERS u ON n.userID = u.id  WHERE n.userID = " + userID + " ORDER BY n.createAT DESC;";

		List<NotificationModel> notifications = new ArrayList<NotificationModel>();

		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				NotificationModel createdNotification = new NotificationModel();
				createdNotification.setId(rs.getInt("id"));
				createdNotification.setRefID(rs.getInt("refID"));
				createdNotification.setUserID(rs.getInt("userID"));
				createdNotification.setRootID(rs.getInt("rootID"));
				createdNotification.setTitle(rs.getString("title"));
				createdNotification.setContent(rs.getString("content"));
				createdNotification.setCreateAT(rs.getString("createAT"));
				createdNotification.setRead(rs.getBoolean("isRead"));
				createdNotification.setFirstName(rs.getString("firstName"));
				createdNotification.setLastName(rs.getString("lastName"));
				createdNotification.setImage(rs.getString("image"));

				notifications.add(createdNotification);
			}

			rs.close();
			return notifications;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		} finally {
			conn.closeDB();
		}
	}

	public List<FollowModel> searchUserFollow(int userID) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String newSQL = "SELECT * FROM follows WHERE followID = " + userID;
		List<FollowModel> listPost = new ArrayList<FollowModel>();
		try {
			Statement stmt = conn.getConn().createStatement();
			ResultSet rs = stmt.executeQuery(newSQL);
			while (rs.next()) {
				FollowModel follow = new FollowModel();

				follow.setId(Integer.parseInt(rs.getString("id")));
				follow.setUserID(Integer.parseInt(rs.getString("userID")));
				follow.setFollowID(Integer.parseInt(rs.getString("followID")));

				listPost.add(follow);
			}
//			rs.close();
//			stmt.close();

			return listPost;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public List<Integer> createPostNotification(NotificationModel notify) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		List<Integer> listReturn = new ArrayList<>();

		try {
			List<FollowModel> userFollowList = this.searchUserFollow(notify.getRootID());

			if (userFollowList != null) {
				String sql = "INSERT INTO notifications (refID, userID, title, content, rootID) VALUES (?, ?, ?, ?, ?)";

				for (FollowModel temp : userFollowList) {

					PreparedStatement pstmt = conn.getConn().prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
					pstmt.setInt(1, notify.getRefID());
					pstmt.setInt(2, temp.getUserID());
					pstmt.setString(3, notify.getTitle());
					pstmt.setString(4, notify.getContent());
					pstmt.setInt(5, notify.getRootID());

					int rowsAffected = pstmt.executeUpdate();

					pstmt.close();

					listReturn.add(temp.getUserID());
				}
			}

			return listReturn;

		} catch (SQLException ex) {
			ex.printStackTrace();
			return null;
		} finally {
			conn.closeDB();
		}
	}

	public boolean createNotification(NotificationModel notify) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "INSERT INTO notifications (refID, userID, title, content, rootID) VALUES (?, ?, ?, ?, ?)";

		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql);
			pstmt.setInt(1, notify.getRefID());
			pstmt.setInt(2, notify.getUserID());
			pstmt.setString(3, notify.getTitle());
			pstmt.setString(4, notify.getContent());
			pstmt.setInt(5, notify.getRootID());

			int rowsAffected = pstmt.executeUpdate();

			boolean result = rowsAffected > 0;

			pstmt.close();

			return result;
		} catch (SQLException ex) {
			ex.printStackTrace();
			return false;
		} finally {
			conn.closeDB();
		}
	}

	public NotificationModel addFriendNotification(NotificationModel notify) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "INSERT INTO notifications (refID, userID, title, content, rootID) VALUES (?, ?, ?, ?, ?)";
		try {
			PreparedStatement pstmt = conn.getConn().prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, notify.getRefID());
			pstmt.setInt(2, notify.getUserID());
			pstmt.setString(3, notify.getTitle());
			pstmt.setString(4, notify.getContent());
			pstmt.setInt(5, notify.getRootID());

			int rowsAffected = pstmt.executeUpdate();

			if (rowsAffected > 0) {
				ResultSet generatedKeys = pstmt.getGeneratedKeys();
				if (generatedKeys.next()) {
					int generatedId = generatedKeys.getInt(1);

					String selectSql = "SELECT DISTINCT n.*, u.image, u.firstName, u.lastName FROM notifications n "
							+ "inner JOIN USERS u ON n.userID = u.id  WHERE n.id = ?";
					PreparedStatement selectStmt = conn.getConn().prepareStatement(selectSql);
					selectStmt.setInt(1, generatedId);
					ResultSet resultSet = selectStmt.executeQuery();

					if (resultSet.next()) {
						NotificationModel createdNotification = new NotificationModel();
						createdNotification.setId(resultSet.getInt("id"));
						createdNotification.setRefID(resultSet.getInt("refID"));
						createdNotification.setUserID(resultSet.getInt("userID"));
						createdNotification.setRootID(resultSet.getInt("rootID"));

						createdNotification.setTitle(resultSet.getString("title"));
						createdNotification.setContent(resultSet.getString("content"));
						createdNotification.setCreateAT(resultSet.getString("createAT"));
						createdNotification.setFirstName(resultSet.getString("firstName"));
						createdNotification.setLastName(resultSet.getString("lastName"));
						createdNotification.setImage(resultSet.getString("image"));
						createdNotification.setRead(resultSet.getBoolean("isRead"));

						resultSet.close();
						selectStmt.close();
						pstmt.close();

						return createdNotification;
					}
				}
			}

			pstmt.close();
			return null;
		} catch (SQLException ex) {
			ex.printStackTrace();
			return null;
		} finally {
			conn.closeDB();
		}
	}

	public boolean readNotification(int id) {
		DatabaseGlobal conn = new DatabaseGlobal();

		try {
			conn.getConnection();
			String sql = "UPDATE notifications SET isRead = true WHERE userID = ?";

			try (PreparedStatement pstmt = conn.getConn().prepareStatement(sql)) {
				pstmt.setInt(1, id);

				int rowsAffected = pstmt.executeUpdate();
				return rowsAffected > 0;
			}

		} catch (SQLException ex) {
			ex.printStackTrace();
			return false;
		} finally {
			conn.closeDB();
		}
	}

	public boolean deleteNotification(int id) {
		DatabaseGlobal conn = new DatabaseGlobal();
		conn.getConnection();

		String sql = "DELETE FROM notifications WHERE id = ?";
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
