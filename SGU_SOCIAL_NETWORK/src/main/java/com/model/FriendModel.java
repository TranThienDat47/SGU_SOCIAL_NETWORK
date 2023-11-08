package com.model;

public class FriendModel {
	private int id;
	private int userID;
	private int friendID;
	public String image;
	public String firstName;
	public String lastName;
	public int coutRoomate;

	public int getCoutRoomate() {
		return coutRoomate;
	}

	public void setCoutRoomate(int coutRoomate) {
		this.coutRoomate = coutRoomate;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
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
