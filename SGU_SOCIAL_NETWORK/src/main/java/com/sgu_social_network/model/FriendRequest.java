package com.sgu_social_network.model;

public class FriendRequest {
	private int userID;
	private int requestID;

	public FriendRequest(int userID, int requestID) {
		super();
		this.userID = userID;
		this.requestID = requestID;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public int getRequestID() {
		return requestID;
	}

	public void setRequestID(int requestID) {
		this.requestID = requestID;
	}

	@Override
	public String toString() {
		return "FriendRequest [userID=" + userID + ", requestID=" + requestID + "]";
	}

}
