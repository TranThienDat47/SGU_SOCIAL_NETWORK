package com.model;

public class UserModel {
	private int id;
	private String email;
	private String password;
	private String image;
	private Long phoneNumber;
	private String firstName;
	private String lastName;
	private boolean isVerify;
	private String dateOfBirh;
	private String createAt;
	private String address;
	private String biography;
	private String background;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
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

	public boolean isVerify() {
		return isVerify;
	}

	public void setVerify(boolean isVerify) {
		this.isVerify = isVerify;
	}

	public String getDateOfBirh() {
		return dateOfBirh;
	}

	public void setDateOfBirh(String dateOfBirh) {
		this.dateOfBirh = dateOfBirh;
	}

	public String getCreateAt() {
		return createAt;
	}

	public void setCreateAt(String createAt) {
		this.createAt = createAt;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBiography() {
		return biography;
	}

	public void setBiography(String biography) {
		this.biography = biography;
	}

	public String getBackground() {
		return background;
	}

	public void setBackground(String background) {
		this.background = background;
	}

	public UserModel(int id, String email, String password, String image, Long phoneNumber, String firstName,
			String lastName, boolean isVerify, String dateOfBirh, String createAt, String address, String biography,
			String background) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.image = image;
		this.phoneNumber = phoneNumber;
		this.firstName = firstName;
		this.lastName = lastName;
		this.isVerify = isVerify;
		this.dateOfBirh = dateOfBirh;
		this.createAt = createAt;
		this.address = address;
		this.biography = biography;
		this.background = background;
	}

	public UserModel() {
	}

	@Override
	public String toString() {
		return "UserModel [id=" + id + ", email=" + email + ", password=" + password + ", image=" + image
				+ ", phoneNumber=" + phoneNumber + ", firstName=" + firstName + ", lastName=" + lastName + ", isVerify="
				+ isVerify + ", dateOfBirh=" + dateOfBirh + ", createAt=" + createAt + ", address=" + address
				+ ", biography=" + biography + ", background=" + background + "]";
	}

}
