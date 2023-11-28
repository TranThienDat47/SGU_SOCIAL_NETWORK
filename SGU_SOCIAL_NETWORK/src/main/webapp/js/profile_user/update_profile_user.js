class UpdateProfileUser {
	constructor() {

	}

	async render() {
		const $ = document.querySelector.bind(document);

		function splitLastWord(inputString) {
			// Tìm vị trí của từ cuối cùng trong chuỗi
			const lastSpaceIndex = inputString.lastIndexOf(' ');

			// Nếu không có khoảng trắng, trả về chuỗi ban đầu và chuỗi rỗng
			if (lastSpaceIndex === -1) {
				return ['', inputString];
			}

			// Tách chuỗi thành từ cuối cùng và các từ còn lại
			const lastWord = inputString.substring(lastSpaceIndex + 1);
			const remainingWords = inputString.substring(0, lastSpaceIndex);

			return [remainingWords, lastWord];
		}

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


		function setCookieGlobal(name, value, days) {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toUTCString();
			}
			var encodedValue = encodeURIComponent(value); // Mã hóa giá trị
			document.cookie = name + "=" + encodedValue + expires + "; path=/";
		}



		const btnSave = $("#btnSaveUpdateProfile");
		const formData = $("#formUpdatePrfileUser");

		const handleSave = () => {
			const url = "/SGU_SOCIAL_NETWORK/api/user/update_profile_user";
			const [firstName, lastName] = splitLastWord(formData.name.value);

			const send_data = {
				userID: getCookieGlobal("id"),
				firstName: firstName,
				lastName: lastName,
				gender: formData.gender.value,
				dayOfBirth: formData.birth.value,
				address: formData.local.value,
				phoneNumber: "",
				biography: formData.story.value,
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

								if (data !== null || data !== "null") {
									setCookieGlobal("firstName", send_data.firstName.trim(), 20);
									setCookieGlobal("lastName", send_data.lastName.trim(), 20);
									setCookieGlobal("gender", send_data.gender.trim(), 20);
									setCookieGlobal("dateOfBirth", send_data.dayOfBirth.trim(), 20);
									setCookieGlobal("address", send_data.address.trim(), 20);
									setCookieGlobal("phoneNumber", send_data.phoneNumber.trim(), 20);
									setCookieGlobal("biography", send_data.biography.trim(), 20);
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

		btnSave.onclick = () => {

			const wrapperUpdateBox = $("#profile_user_modal_box");
			if (wrapperUpdateBox.classList.contains("profile_user_modal_box_show")) {
				wrapperUpdateBox.classList.remove("profile_user_modal_box_show")
				handleSave().then(() => {
					window.location.reload();
				});

			}


		}


	}
}

new UpdateProfileUser().render();