package com.model;

public class FriendRequestModel {
	private int id;
	private int userID;
	private int requestID;
	public String firstName;
	public String lastName;
	public String image;
	public int countRoomate;

	public int getCountRoomate() {
		return countRoomate;
	}

	public void setCountRoomate(int coutRoomate) {
		this.countRoomate = coutRoomate;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

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
