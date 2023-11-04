package com.model;

public class FriendModel {
	private int id;
	private int userID;
	private int friendID;

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

	public int getFriendID() {
		return friendID;
	}

	public void setFriendID(int friendID) {
		this.friendID = friendID;
	}

	public FriendModel(int id, int userID, int friendID) {
		this.id = id;
		this.userID = userID;
		this.friendID = friendID;
	}

	public FriendModel() {
	}

	@Override
	public String toString() {
		return "FriendModel [id=" + id + ", userID=" + userID + ", friendID=" + friendID + "]";
	}

}
