class ProfileUser {
	constructor() {

	}

	render() {

		setTimeout(() => {
			const wrapperUpdateBox = $("#profile_user_modal_box");
			const btnUpdateProfile = $("#profile_user-tabs-update_profile");
			const btnCloseUpdateProfile = $("#btnCloseUpdateProfile")

			if (btnUpdateProfile)
				btnUpdateProfile.onclick = () => {
					wrapperUpdateBox.classList.add("profile_user_modal_box_show")
				}
			if (btnCloseUpdateProfile)
				btnCloseUpdateProfile.onclick = () => {
					if (wrapperUpdateBox.classList.contains("profile_user_modal_box_show")) {
						wrapperUpdateBox.classList.remove("profile_user_modal_box_show")
					}
				}
		})

		const backgroundUpload = $("#profile_user-background_file");
		const avataUpload = $("#profile_user-avata_file");
		const backgroundImage = $("#profile_user-img_background");
		const avataImage = $("#profile_user-img_avata");

		const btnUpdateBackground = $("#profile_user-tabs-update_picture_background");
		const btnUpdateAvata = $("#profile_user-tabs-update_picture_avata");

		btnUpdateBackground.onclick = () => {
			backgroundUpload.click();
		}

		btnUpdateAvata.onclick = () => {
			avataUpload.click();
		}

		backgroundUpload.onchange = (e) => {
			profile_image_background(e);
		}

		avataUpload.onchange = (e) => {
			profile_image_avata(e);
		}


		function profile_image_background(event) {
			var reader = new FileReader();
			reader.onload = function() {
				backgroundImage.src = reader.result;
			}
			reader.readAsDataURL(event.target.files[0]);
		}

		function profile_image_avata(event) {
			var reader = new FileReader();
			reader.onload = function() {
				avataImage.src = reader.result;
			}
			reader.readAsDataURL(event.target.files[0]);
		}


		const tabs = document.querySelectorAll('.profile_user-tabs-item');

		tabs.forEach(tab => {
			tab.addEventListener('click', function() {
				// Loại bỏ lớp active từ tất cả các phần tử <li>
				tabs.forEach(tab => {
					tab.classList.remove('profile_user-tabs-item_active');
				});

				// Thêm lớp active vào phần tử <li> đã được nhấp
				this.classList.add('profile_user-tabs-item_active');
			});
		});

	}
}

new ProfileUser().render();