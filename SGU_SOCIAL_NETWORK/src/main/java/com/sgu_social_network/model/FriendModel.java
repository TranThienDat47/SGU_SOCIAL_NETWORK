package com.sgu_social_network.model;

public class FriendModel {
	private int userID;
	private int friendID;

	public FriendModel(int userID, int friendID) {
		super();
		this.userID = userID;
		this.friendID = friendID;
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

	@Override
	public String toString() {
		return "FriendModel [userID=" + userID + ", friendID=" + friendID + "]";
	}
}
