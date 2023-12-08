package com.model;

public class MessageModel {
	private int id;
	private int conversationID;
	private int userID;
	private String content;
	private boolean isRead;
	private String createAt;

	public MessageModel(int id, int conversationID, int userID, String content, boolean isRead, String createAt) {
		super();
		this.id = id;
		this.conversationID = conversationID;
		this.userID = userID;
		this.content = content;
		this.isRead = isRead;
		this.createAt = createAt;
	}

	public MessageModel() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getConversationID() {
		return conversationID;
	}

	public void setConversationID(int conversationID) {
		this.conversationID = conversationID;
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

	public boolean isRead() {
		return isRead;
	}

	public void setRead(boolean isRead) {
		this.isRead = isRead;
	}

	public String getCreateAt() {
		return createAt;
	}

	public void setCreateAt(String createAt) {
		this.createAt = createAt;
	}

	@Override
	public String toString() {
		return "MessageModel [id=" + id + ", conversationID=" + conversationID + ", userID=" + userID + ", content="
				+ content + ", isRead=" + isRead + ", createAt=" + createAt + "]";
	}

}
