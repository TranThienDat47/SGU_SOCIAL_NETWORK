package com.model;

import java.sql.Date;

public class PostModel {
	private int id;
	private int authorID;
	private int privacySettingID;
	private String title;
	private String content;
	private String image1;
	private String image2;
	private String image3;
	private String image4;
	private int likes;
	private int replies;
	private String createAt;
	private String updateAt;

	public PostModel() {
	}

	public PostModel(int id, int authorID, int privacySettingID, String title, String content, String image1,
			String image2, String image3, String image4, int likes, int replies, String createAt, String updateAt) {
		this.id = id;
		this.authorID = authorID;
		this.privacySettingID = privacySettingID;
		this.title = title;
		this.content = content;
		this.image1 = image1;
		this.image2 = image2;
		this.image3 = image3;
		this.image4 = image4;
		this.likes = likes;
		this.replies = replies;
		this.createAt = createAt;
		this.updateAt = updateAt;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getAuthorID() {
		return authorID;
	}

	public void setAuthorID(int authorID) {
		this.authorID = authorID;
	}

	public int getPrivacySettingID() {
		return privacySettingID;
	}

	public void setPrivacySettingID(int privacySettingID) {
		this.privacySettingID = privacySettingID;
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

	public String getImage1() {
		return image1;
	}

	public void setImage1(String image1) {
		this.image1 = image1;
	}

	public String getImage2() {
		return image2;
	}

	public void setImage2(String image2) {
		this.image2 = image2;
	}

	public String getImage3() {
		return image3;
	}

	public void setImage3(String image3) {
		this.image3 = image3;
	}

	public String getImage4() {
		return image4;
	}

	public void setImage4(String image4) {
		this.image4 = image4;
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

	public String getUpdateAt() {
		return updateAt;
	}

	public void setUpdateAt(String updateAt) {
		this.updateAt = updateAt;
	}

	@Override
	public String toString() {
		return "PostModel [id=" + id + ", authorID=" + authorID + ", privacySettingID=" + privacySettingID + ", title="
				+ title + ", content=" + content + ", image1=" + image1 + ", image2=" + image2 + ", image3=" + image3
				+ ", image4=" + image4 + ", likes=" + likes + ", replies=" + replies + ", createAt=" + createAt
				+ ", updateAt=" + updateAt + "]";
	}

}
