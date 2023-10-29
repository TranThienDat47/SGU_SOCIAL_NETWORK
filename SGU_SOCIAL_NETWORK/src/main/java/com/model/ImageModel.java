package com.model;

public class ImageModel {
	private int id;
	private int userID;
	private int parentID;
	private String image;

	@Override
	public String toString() {
		return "ImageModel [id=" + id + ", userID=" + userID + ", parentID=" + parentID + ", image=" + image + "]";
	}

	public ImageModel(int id, int userID, int parentID, String image) {
		this.id = id;
		this.userID = userID;
		this.parentID = parentID;
		this.image = image;
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

	public int getParentID() {
		return parentID;
	}

	public void setParentID(int parentID) {
		this.parentID = parentID;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

}
