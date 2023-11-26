package com.model;

public class LikeCommentModel {
	private int id;
	private int commentID;
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

	public LikeCommentModel(int id, int commentID, int userID) {
		super();
		this.id = id;
		this.commentID = commentID;
		this.userID = userID;
	}

	@Override
	public String toString() {
		return "LikeCommentModel [id=" + id + ", commentID=" + commentID + ", userID=" + userID + "]";
	}

	public LikeCommentModel() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCommentID() {
		return commentID;
	}

	public void setCommentID(int commentID) {
		this.commentID = commentID;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}
}
