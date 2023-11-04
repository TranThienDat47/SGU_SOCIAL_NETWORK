package com.model;

public class FriendRequestModel {
	private int id;
	private int userID;
	private int requestID;

	@Override
	public String toString() {
		return "FriendRequestModel [id=" + id + ", userID=" + userID + ", requestID=" + requestID + "]";
	}

	public FriendRequestModel(int id, int userID, int requestID) {
		this.id = id;
		this.userID = userID;
		this.requestID = requestID;
	}

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

	public int getRequestID() {
		return requestID;
	}

	public void setRequestID(int requestID) {
		this.requestID = requestID;
	}

	public FriendRequestModel() {
	}

}
