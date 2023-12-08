package com.model;

public class ConversationModel {
	private int id;
	private int userID1;
	private int userID2;
	private String createAt;

	public ConversationModel(int id, int userID1, int userID2, String createAt) {
		super();
		this.id = id;
		this.userID1 = userID1;
		this.userID2 = userID2;
		this.createAt = createAt;
	}

	public ConversationModel() {
	}

	@Override
	public String toString() {
		return "Conversation [id=" + id + ", userID1=" + userID1 + ", userID2=" + userID2 + ", createAt=" + createAt
				+ "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserID1() {
		return userID1;
	}

	public void setUserID1(int userID1) {
		this.userID1 = userID1;
	}

	public int getUserID2() {
		return userID2;
	}

	public void setUserID2(int userID2) {
		this.userID2 = userID2;
	}

	public String getCreateAt() {
		return createAt;
	}

	public void setCreateAt(String createAt) {
		this.createAt = createAt;
	}

}
