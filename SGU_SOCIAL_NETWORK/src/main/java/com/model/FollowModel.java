package com.model;

public class FollowModel {
	private int id;
	private int userID;
	private int followID;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public int getFollowID() {
		return followID;
	}

	public void setFollowID(int followID) {
		this.followID = followID;
	}

	@Override
	public String toString() {
		return "FollowModel [id=" + id + ", userID=" + userID + ", followID=" + followID + "]";
	}

	public FollowModel(int id, int userID, int followID) {
		this.id = id;
		this.userID = userID;
		this.followID = followID;
	}

	public FollowModel() {
	}

}
