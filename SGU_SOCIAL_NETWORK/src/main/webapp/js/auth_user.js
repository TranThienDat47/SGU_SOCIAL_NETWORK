class AuthUser {
	constructor() {

	}

	async render() {
		const formLogin = document.querySelector("#form-login");
		const formRegister = document.querySelector("#form-register");

		const urlParams = new URLSearchParams(window.location.search);
		const pageParam = urlParams.get('page');

		if (pageParam === 'register') {
			formLogin.style.display = 'none';
			formRegister.style.display = 'block';

			const listHideAndShow = document.querySelectorAll(".show_hide_password");

			const messgaeConfirm = document.querySelector("#message_confirm_password")
			const messgaeNew = document.querySelector("#message_new_password")

			const inputNewPass = document.querySelector("#inputPassword");

			inputNewPass.oninput = () => {
				listHideAndShow[0].classList.add("show_hide_password-show");

				console.log()

				if (inputNewPass.value.length < 6) {
					messgaeNew.innerHTML = "Mật khẩu phải có từ 6 ký tự trở lên!"
				} else {
					messgaeNew.innerHTML = "";
				}

				listHideAndShow[0].onclick = () => {
					if (listHideAndShow[0].classList.contains("show_hide_password-show")) {
						listHideAndShow[0].classList.add("show_hide_password-hide");
						listHideAndShow[0].classList.remove("show_hide_password-show");

						inputNewPass.type = "text"
					} else {
						listHideAndShow[0].classList.add("show_hide_password-show");
						listHideAndShow[0].classList.remove("show_hide_password-hide");

						inputNewPass.type = "password"
					}
				}
			}

			const inputConfirmNewPass = document.querySelector("#confirmNewPassword");

			inputConfirmNewPass.oninput = () => {
				listHideAndShow[1].classList.add("show_hide_password-show");
				if (inputConfirmNewPass.value !== inputNewPass.value) {
					messgaeConfirm.innerHTML = "Nhập lại mật khẩu không khớp!"
				} else {
					messgaeConfirm.innerHTML = "";
					btnSubmitChangePassword.classList.remove('disable')
				}

				listHideAndShow[1].onclick = () => {
					if (listHideAndShow[1].classList.contains("show_hide_password-show")) {
						listHideAndShow[1].classList.add("show_hide_password-hide");
						listHideAndShow[1].classList.remove("show_hide_password-show");

						inputConfirmNewPass.type = "text"
					} else {
						listHideAndShow[1].classList.add("show_hide_password-show");
						listHideAndShow[1].classList.remove("show_hide_password-hide");

						inputConfirmNewPass.type = "password"
					}
				}
			}

		} else {
			formRegister.style.display = 'none';
			formLogin.style.display = 'block';
		}

		//
		//		const selectNgay = document.getElementById("day");
		//		const selectThang = document.getElementById("month");
		//		const selectNam = document.getElementById("year");
		//
		//		const addOptions = (select, start, end) => {
		//			for (let i = start; i <= end; i++) {
		//				const option = document.createElement("option");
		//				option.value = i;
		//				option.text = i;
		//				select.appendChild(option);
		//			}
		//		};
		//
		//		const getDaysInMonth = (month, year) => {
		//			return new Date(year, month, 0).getDate();
		//		};
		//
		//		addOptions(selectThang, 1, 12);
		//		const currentYear = new Date().getFullYear();
		//		addOptions(selectNam, 1900, currentYear);
		//
		//		selectThang.addEventListener('change', () => {
		//			const selectedMonth = parseInt(selectThang.value);
		//			const selectedYear = parseInt(selectNam.value);
		//
		//			while (selectNgay.options.length > 0) {
		//				selectNgay.remove(0);
		//			}
		//
		//			const daysInSelectedMonth = getDaysInMonth(selectedMonth, selectedYear);
		//			addOptions(selectNgay, 1, daysInSelectedMonth);
		//		});
		//
		//		const currentMonth = new Date().getMonth() + 1;
		//		const daysInCurrentMonth = getDaysInMonth(currentMonth, currentYear);
		//		addOptions(selectNgay, 1, daysInCurrentMonth);
	}
}

