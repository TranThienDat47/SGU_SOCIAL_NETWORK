package com.model;

public class NotificationModel {
	private int id;
	private int refID;
	private int userID;
	private int rootID;
	private String title;
	private String content;
	private boolean isRead;
	private String createAT;
	public String firstName;
	public String lastName;
	public String image;

	public NotificationModel() {
	}

	@Override
	public String toString() {
		return "NotificationModel [id=" + id + ", refID=" + refID + ", userID=" + userID + ", rootID=" + rootID
				+ ", title=" + title + ", content=" + content + ", isRead=" + isRead + ", createAT=" + createAT + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getRefID() {
		return refID;
	}

	public void setRefID(int refID) {
		this.refID = refID;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public int getRootID() {
		return rootID;
	}

	public void setRootID(int rootID) {
		this.rootID = rootID;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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

	public String getCreateAT() {
		return createAT;
	}

	public void setCreateAT(String createAT) {
		this.createAT = createAT;
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

	public NotificationModel(int id, int refID, int userID, int rootID, String title, String content, boolean isRead,
			String createAT) {
		super();
		this.id = id;
		this.refID = refID;
		this.userID = userID;
		this.rootID = rootID;
		this.title = title;
		this.content = content;
		this.isRead = isRead;
		this.createAT = createAT;
	}

}
