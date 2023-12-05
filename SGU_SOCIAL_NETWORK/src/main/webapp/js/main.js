class MainOfWeb {
	constructor() {

	}

	render() {
		//		const headerLeft = $(".header_left");
		//		const inputSearch = $(".header_search_input");
		//		const btnSearchClear = $(".header_left .header_btn_clear");
		//
		//
		//		inputSearch.onkeyup = () => {
		//			const valueSearch = inputSearch.value;
		//			if (valueSearch.trim() === "") {
		//
		//				headerLeft.classList.remove("header_type");
		//				$('.header_search_result-inner').style.display = "none";
		//			} else {
		//				headerLeft.classList.add("header_type");
		//
		//				$('.header_search_result-inner').style.display = "block";
		//			}
		//		}
		//
		//		btnSearchClear.onclick = () => {
		//			inputSearch.value = "";
		//			if (headerLeft.classList.contains("header_type")) {
		//				$('.header_search_result-inner').style.display = "none";
		//
		//				headerLeft.classList.remove("header_type");
		//			}
		//
		//			inputSearch.focus();
		//		}

		var headerItems = document.getElementsByClassName('header_center-item');

		for (var i = 0; i < headerItems.length; i++) {
			headerItems[i].addEventListener('click', function() {
				var isActive = this.classList.contains('header_active');

				if (!isActive) {
					for (var j = 0; j < headerItems.length; j++) {
						headerItems[j].classList.remove('header_active');
					}

					this.classList.add('header_active');
				}
			});
		}

		//		const wrapperSetting = $(".header_item-action-setting");
		//		const btnSetting = $("#btnHeaderShowSetting");
		//
		//		const setting = $(".user_setting-box_setting");
		//
		//		btnSetting.onclick = () => {
		//			if (setting.classList.contains("user_setting-box_setting-show")) {
		//				setting.classList.remove("user_setting-box_setting-show");
		//				document.body.removeEventListener('wheel', preventScroll, { passive: false });
		//			} else {
		//				setting.classList.add("user_setting-box_setting-show");
		//				document.body.addEventListener('wheel', preventScroll, { passive: false });
		//			}
		//		}


		//		const wrapperNotify = $(".header_item-action_notify");
		//		const btnNotify = $("#btnShowNotify");
		//
		//		const notify = $(".box_notify");
		//
		//		btnNotify.onclick = () => {
		//			if (notify.classList.contains("box_notify-show")) {
		//				notify.classList.remove("box_notify-show");
		//				document.body.removeEventListener('wheel', preventScroll, { passive: false });
		//				$('.notify_content').removeEventListener('wheel', scroll, { passive: true });
		//			} else {
		//				notify.classList.add("box_notify-show");
		//				$('.notify_content').addEventListener('wheel', scroll);
		//				document.body.addEventListener('wheel', preventScroll, { passive: false });
		//			}
		//		}

		//		window.onclick = function(e) {
		//			if (notify.classList.contains('box_notify-show')) {
		//				if (!checkNode(wrapperNotify, e.target)) {
		//					notify.classList.remove("box_notify-show");
		//					document.body.removeEventListener('wheel', preventScroll, { passive: false });
		//					$('.notify_content').removeEventListener('wheel', scroll, { passive: true });
		//				}
		//			}

		//			console.log(setting.classList)
		//			if (setting.classList.contains("user_setting-box_setting-show")) {
		//				if (!checkNode(wrapperSetting, e.target)) {
		//					setting.classList.remove("user_setting-box_setting-show");
		//					document.body.removeEventListener('wheel', preventScroll, { passive: false });
		//				}
		//			}
		//
		//		};

	}
}

const reanderMainOfWeb = new MainOfWeb().render();
