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
		} else {
			formRegister.style.display = 'none';
			formLogin.style.display = 'block';
		}

		const selectNgay = document.getElementById("day");
		const selectThang = document.getElementById("month");
		const selectNam = document.getElementById("year");

		const addOptions = (select, start, end) => {
			for (let i = start; i <= end; i++) {
				const option = document.createElement("option");
				option.value = i;
				option.text = i;
				select.appendChild(option);
			}
		};

		const getDaysInMonth = (month, year) => {
			return new Date(year, month, 0).getDate();
		};

		addOptions(selectThang, 1, 12);
		const currentYear = new Date().getFullYear();
		addOptions(selectNam, 1900, currentYear);

		selectThang.addEventListener('change', () => {
			const selectedMonth = parseInt(selectThang.value);
			const selectedYear = parseInt(selectNam.value);

			while (selectNgay.options.length > 0) {
				selectNgay.remove(0);
			}

			const daysInSelectedMonth = getDaysInMonth(selectedMonth, selectedYear);
			addOptions(selectNgay, 1, daysInSelectedMonth);
		});

		const currentMonth = new Date().getMonth() + 1;
		const daysInCurrentMonth = getDaysInMonth(currentMonth, currentYear);
		addOptions(selectNgay, 1, daysInCurrentMonth);
	}
}

await new AuthUser().render();
