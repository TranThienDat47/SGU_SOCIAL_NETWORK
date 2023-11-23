package com.model;

public class LikeCommentModel {
	private int id;
	private int commentID;
	private int userID;

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
