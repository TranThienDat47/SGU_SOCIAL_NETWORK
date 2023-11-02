package com.model;

public class UserModel {
	private int id;
	private String email;
	private String password;
	private String image;
	private String phoneNumber;
	private String firstName;
	private String lastName;
	private boolean isVerify;
	private String dateOfBirth;
	private String createAt;
	private String address;
	private String biography;
	private String background;
	private boolean gender;

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

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
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

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirh) {
		this.dateOfBirth = dateOfBirh;
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

	public boolean isGender() {
		return gender;
	}

	public void setGender(boolean gender) {
		this.gender = gender;
	}

	public UserModel(int id, String email, String password, String image, String phoneNumber, String firstName,
			String lastName, boolean isVerify, String dateOfBirh, String createAt, String address, String biography,
			String background, boolean gender) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.image = image;
		this.phoneNumber = phoneNumber;
		this.firstName = firstName;
		this.lastName = lastName;
		this.isVerify = isVerify;
		this.dateOfBirth = dateOfBirh;
		this.createAt = createAt;
		this.address = address;
		this.biography = biography;
		this.background = background;
		this.gender = gender;
	}

	public UserModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "UserModel [id=" + id + ", email=" + email + ", password=" + password + ", image=" + image
				+ ", phoneNumber=" + phoneNumber + ", firstName=" + firstName + ", lastName=" + lastName + ", isVerify="
				+ isVerify + ", dateOfBirh=" + dateOfBirth + ", createAt=" + createAt + ", address=" + address
				+ ", biography=" + biography + ", background=" + background + ", gender=" + gender + "]";
	}

}
