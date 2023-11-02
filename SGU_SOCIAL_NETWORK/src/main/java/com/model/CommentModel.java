package com.model;

public class CommentModel {
	private int id;
	private int parentID;
	private int userID;
	private String content;
	private int likes;
	private int replies;
	private String createAt;
	public String firstName;
	public String lastName;
	public String image;

	@Override
	public String toString() {
		return "CommentModel [id=" + id + ", parentID=" + parentID + ", userID=" + userID + ", content=" + content
				+ ", likes=" + likes + ", replies=" + replies + ", createAt=" + createAt + "]";
	}

	public CommentModel(int id, int parentID, int userID, String content, int likes, int replies, String createAt) {
		this.id = id;
		this.parentID = parentID;
		this.userID = userID;
		this.content = content;
		this.likes = likes;
		this.replies = replies;
		this.createAt = createAt;
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

	public CommentModel() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getParentID() {
		return parentID;
	}

	public void setParentID(int parentID) {
		this.parentID = parentID;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	public int getReplies() {
		return replies;
	}

	public void setReplies(int replies) {
		this.replies = replies;
	}

	public String getCreateAt() {
		return createAt;
	}

	public void setCreateAt(String createAt) {
		this.createAt = createAt;
	}

}
