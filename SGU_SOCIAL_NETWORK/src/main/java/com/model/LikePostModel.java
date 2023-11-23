package com.model;

public class LikePostModel {
	private int id;
	private int postID;
	private int userID;
	public String firstName;
	public String lastName;
	public String image;

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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPostID() {
		return postID;
	}

	public void setPostID(int postID) {
		this.postID = postID;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public LikePostModel(int id, int postID, int userID) {
		super();
		this.id = id;
		this.postID = postID;
		this.userID = userID;
	}

	public LikePostModel() {
	}

	@Override
	public String toString() {
		return "LikePostModel [id=" + id + ", postID=" + postID + ", userID=" + userID + "]";
	}

}
