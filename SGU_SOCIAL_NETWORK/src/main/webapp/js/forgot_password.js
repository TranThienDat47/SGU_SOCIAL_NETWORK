class ForgotPassword {
	constructor() {
		this.isValid = false;
	}

	render() {
		const that = this;
		const wrapperMessage = document.querySelector("#message_response")

		async function submitForm() {
			var emailValue = document.getElementById("email").value;

			console.log("Email: " + emailValue);

			var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			if (emailRegex.test(emailValue)) {
				const handleCheckEmail = async () => {
					const url = "/SGU_SOCIAL_NETWORK/auth/check_email";
					const send_data = {
						email: emailValue,
					};

					return new Promise((resolve, reject) => {
						const xhr = new XMLHttpRequest();
						xhr.open("POST", url, true);

						xhr.setRequestHeader("Content-Type", "application/json");

						xhr.onreadystatechange = function() {
							if (xhr.readyState === 4) {
								if (xhr.status === 200) {
									try {
										const data = JSON.parse(xhr.responseText);
										if (!data) {
											wrapperMessage.innerHTML = "Địa chỉ email không khớp với bất kỳ người dùng nào!"
										} else {
											that.isValid = true;
										}
										resolve(data);
									} catch (error) {
										console.log("JSON parsing error:", error);
										reject(error);
									}
								} else {
									console.log("Request failed with status:", xhr.status);
									reject(new Error(`Error: ${xhr.statusText}`));
								}
							}
						}.bind(this);

						xhr.send(JSON.stringify(send_data));
					});
				}

				const handleForgotPassword = async () => {
					const url = "/SGU_SOCIAL_NETWORK/auth/forgot_password";
					const send_data = {
						email: emailValue,
					};

					return new Promise((resolve, reject) => {
						const xhr = new XMLHttpRequest();
						xhr.open("POST", url, true);

						xhr.setRequestHeader("Content-Type", "application/json");

						xhr.onreadystatechange = function() {
							if (xhr.readyState === 4) {
								if (xhr.status === 200) {
									try {
										const data = JSON.parse(xhr.responseText);

										if (data) {
											wrapperMessage.innerHTML = "Đã cấp lại mật khẩu thành công!"
											alert("Chúng tôi đã gửi mật khẩu mới đến email của bạn, hãy sử dụng mật khẩu đó để đăng nhập tài khoản (lưu ý nếu không thấy email được gửi hãy kiểm tra thư rác)")
											window.location.href = "/SGU_SOCIAL_NETWORK/AuthUser.jsp?page=login";
										}

										resolve(data);
									} catch (error) {
										console.log("JSON parsing error:", error);
										reject(error);
									}
								} else {
									console.log("Request failed with status:", xhr.status);
									reject(new Error(`Error: ${xhr.statusText}`));
								}
							}
						}.bind(this);

						xhr.send(JSON.stringify(send_data));
					});
				}

				await handleCheckEmail().then(async () => {
					if (that.isValid) {
						wrapperMessage.innerHTML = "Vui lòng đợi..."
						await handleForgotPassword();
					}
				});

			} else {
				wrapperMessage.innerHTML = "Định dạng email không hợp lệ, vui lòng bao gồm @ trong địa chỉ email!"
			}
		}


		const btnSubmit = document.querySelector("#btnSubmitFormForgot");
		btnSubmit.onclick = () => {
			submitForm();
		}
	}
}

setTimeout(() => {
	new ForgotPassword().render();
})