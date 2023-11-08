package com.model;

public class FollowModel {
	private int id;
	private int userID;
	private int followID;
	public String image;
	public String firstName;
	public String lastName;
	public int coutRoomate;

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

	public int getCoutRoomate() {
		return coutRoomate;
	}

	public void setCoutRoomate(int coutRoomate) {
		this.coutRoomate = coutRoomate;
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
