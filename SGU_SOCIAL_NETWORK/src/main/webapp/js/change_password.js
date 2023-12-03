class ChangePassword {
	constructor() {
		this.isValid = false;
	}

	render() {
		const that = this;
		const listHideAndShow = document.querySelectorAll(".show_hide_password");


		const inputCurrentPass = document.querySelector("#currentPassword");

		inputCurrentPass.oninput = () => {
			listHideAndShow[0].classList.add("show_hide_password-show");

			if (inputNewPass.value === inputCurrentPass.value) {
				messgaeNew.innerHTML = "Mật khẩu mới không được trùng mới mật khẩu hiện tại"
			} else {
				messgaeNew.innerHTML = ""
			}

			listHideAndShow[0].onclick = () => {
				if (listHideAndShow[0].classList.contains("show_hide_password-show")) {
					listHideAndShow[0].classList.add("show_hide_password-hide");
					listHideAndShow[0].classList.remove("show_hide_password-show");

					inputCurrentPass.type = "text"

				} else {
					listHideAndShow[0].classList.add("show_hide_password-show");
					listHideAndShow[0].classList.remove("show_hide_password-hide");

					inputCurrentPass.type = "password"
				}
			}
		}

		const inputNewPass = document.querySelector("#newPassword");



		inputNewPass.oninput = () => {
			listHideAndShow[1].classList.add("show_hide_password-show");

			console.log(inputNewPass.value.length <= 6)

			if (inputNewPass.value.length < 6) {
				messgaeNew.innerHTML = "Mật khẩu phải có từ 6 ký tự trở lên!"
			} else if (inputNewPass.value === inputCurrentPass.value) {
				messgaeNew.innerHTML = "Mật khẩu mới không được trùng mới mật khẩu hiện tại"
			} else {
				messgaeNew.innerHTML = "";
			}

			listHideAndShow[1].onclick = () => {
				if (listHideAndShow[1].classList.contains("show_hide_password-show")) {
					listHideAndShow[1].classList.add("show_hide_password-hide");
					listHideAndShow[1].classList.remove("show_hide_password-show");

					inputNewPass.type = "text"
				} else {
					listHideAndShow[1].classList.add("show_hide_password-show");
					listHideAndShow[1].classList.remove("show_hide_password-hide");

					inputNewPass.type = "password"
				}
			}
		}
		const inputConfirmNewPass = document.querySelector("#confirmNewPassword");

		inputConfirmNewPass.oninput = () => {
			listHideAndShow[2].classList.add("show_hide_password-show");
			if (inputConfirmNewPass.value !== inputNewPass.value) {
				messgaeConfirm.innerHTML = "Nhập lại mật khẩu không khớp!"
			} else {
				messgaeConfirm.innerHTML = "";
				btnSubmitChangePassword.classList.remove('disable')
			}

			listHideAndShow[2].onclick = () => {
				if (listHideAndShow[2].classList.contains("show_hide_password-show")) {
					listHideAndShow[2].classList.add("show_hide_password-hide");
					listHideAndShow[2].classList.remove("show_hide_password-show");

					inputConfirmNewPass.type = "text"
				} else {
					listHideAndShow[2].classList.add("show_hide_password-show");
					listHideAndShow[2].classList.remove("show_hide_password-hide");

					inputConfirmNewPass.type = "password"
				}
			}
		}

		const btnSubmitChangePassword = document.querySelector("#btnSubmitChangePassword")

		const messgaeCurrent = document.querySelector("#message_current_password")
		const messgaeConfirm = document.querySelector("#message_confirm_password")
		const messgaeNew = document.querySelector("#message_new_password")

		function getCookieGlobal(name) {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].trim();
				if (cookie.indexOf(name + '=') === 0) {
					var encodedValue = cookie.substring(name.length + 1, cookie.length);
					var decodedValue = decodeURIComponent(encodedValue);
					return decodedValue;
				}
			}
			return null;
		}

		btnSubmitChangePassword.onclick = async () => {
			if (!btnSubmitChangePassword.classList.contains('disable')) {
				if (inputConfirmNewPass.value !== inputNewPass.value) {
					messgaeConfirm.innerHTML = "Nhập lại mật khẩu không khớp!"
				} else {
					messgaeConfirm.innerHTML = ""
				}

				if (inputNewPass.value.length < 6) {
					messgaeNew.innerHTML = "Mật khẩu phải có từ 6 ký tự trở lên!"
				} else if (inputNewPass.value === inputCurrentPass.value) {
					messgaeNew.innerHTML = "Mật khẩu mới không được trùng mới mật khẩu hiện tại"
				} else {
					messgaeNew.innerHTML = ""
				}

				const handleCheckPassword = async () => {
					const url = "/SGU_SOCIAL_NETWORK/auth/check_password";
					const send_data = {
						password: inputCurrentPass.value,
						email: getCookieGlobal("email"),
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
											that.oisValid = true;
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

				const handleChangePassword = async () => {
					const url = "/SGU_SOCIAL_NETWORK/auth/update_password";
					const send_data = {
						newPassword: inputConfirmNewPass.value,
						email: getCookieGlobal("email"),
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
											alert("Đổi mật khẩu thành công!");

											window.location.reload();
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

				await handleCheckPassword().then(async () => {
					await handleChangePassword();
				});
			}
		}

	}
}

new ChangePassword().render();