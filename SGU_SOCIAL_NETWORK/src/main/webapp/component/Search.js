class SearchHeader {
	constructor() {
		this.valueSearch = "";
		this.timeoutId = null;
		this.listSearchReult = [];
	}


	decryptCookieValuePlus(encodedValue, encryptionKey) {
		try {
			// Decode the Base64 encoded value
			var encryptedValue = CryptoJS.enc.Base64.parse(encodedValue);

			// Create a key object from the encryption key
			var key = CryptoJS.enc.Utf8.parse(encryptionKey);

			// Perform decryption using AES
			var decryptedBytes = CryptoJS.AES.decrypt({ ciphertext: encryptedValue }, key, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});

			// Convert the decrypted bytes to a UTF-8 string
			var decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);

			return decryptedValue;
		} catch (error) {
			console.error('Error decrypting cookie value:', error);
			return null;
		}
	}

	getCookieGlobalPlus(name) {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim();
			if (cookie.indexOf(name + '=') === 0) {
				var encodedValue = cookie.substring(name.length + 1, cookie.length);

				// Thực hiện giải mã với cùng một key (khóa)
				var decryptedValue = this.decryptCookieValuePlus(encodedValue, '1234567890123456');

				return decryptedValue;
			}
		}
		return null;
	}

	debounce(func, delay) {
		const that = this;
		return function() {
			clearTimeout(that.timeoutId);
			that.timeoutId = setTimeout(() => {
				func.call(that); // Execute func in the correct context
			}, delay);
		};
	}

	SearchItem(data = { image: "", name: "", countRoomate: "", id: "" }) {
		return `
					<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${data.id}">
					<div class="header_search_result-item">
						<div class="header_search_result-item_avt">
							<img 
								src="${data.image}"
								alt="">
						</div>
						
						<div class="header_search_result-item_content">
							<div class="header_search_result-item_name">${data.name}</div>
							<div class="header_search_result-item_friend">${data.countRoomate} bạn chung</div>
						</div>
					</div>
					</a>
			`;
	}

	SearchResult(data = []) {

		const searchItems = data
			.map((element) => {
				return this.SearchItem({ image: element.image, name: element.firstName + " " + element.lastName, countRoomate: element.countRoomate, id: element.friendID });
			})
			.join('');

		return `<div class="header_search_result-inner">
				<div class="header_search_result-header">
					<h4 style="
							    font-size: 1.4rem;
							    color: var(--text-bland);
							    margin-top: 9px;
							    margin-bottom: 9px;
							    margin-left: 16px;
					">Kết quả tìm kiếm</h4>
				</div>
				<div id="header_search_result-list" class="header_search_result-list">
					${searchItems}
				</div>
			</div>`;
	}
	async fetchDataSearch(searchValue = "") {
		const that = this;
		const url = "/SGU_SOCIAL_NETWORK/api/friend/search_value_friend";
		const send_data = { offsetValue: 0, limitValue: 8, searchValue };

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open("POST", url, true);

			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization", `${that.getCookieGlobalPlus("token")}`);

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							const data = JSON.parse(xhr.responseText);
							that.listSearchReult = data;
							console.log(data)
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

	async handleSearch() {
		const that = this;
		const headerLeft = $(".header_left");

		const inputSearch = $(".header_search_input");
		const valueSearch = inputSearch.value;
		if (valueSearch.trim() === "") {
			headerLeft.classList.remove("header_type");
			$('.header_search_result-inner').style.display = "none";
		} else {
			headerLeft.classList.add("header_type");
			await that.fetchDataSearch(valueSearch.trim()).then(() => {

				$('.header_search_result-wrapper').innerHTML = that.SearchResult(that.listSearchReult)
				inputSearch.focus();
			});
			$('.header_search_result-inner').style.display = "block";
		}
	}

	handleClose() {
		const inputSearch = $(".header_search_input");
		const headerLeft = $(".header_left");

		inputSearch.value = "";
		if (headerLeft.classList.contains("header_type")) {
			$('.header_search_result-inner').style.display = "none";
			headerLeft.classList.remove("header_type");
		}
		inputSearch.focus();
	}

	async render() {

		const btnSearchClear = $(".header_left .header_btn_clear");

		const inputSearch = $(".header_search_input");

		inputSearch.onkeyup = async (e) => {
			if (e.key === "Enter") {
				const valueSearch = inputSearch.value;
				if (valueSearch.trim() !== "") {
					window.location.href = `/SGU_SOCIAL_NETWORK/Search.jsp?page=all&value=${valueSearch.trim()}`
				}
			}
			this.debounce(await this.handleSearch, 400)();
		}

		btnSearchClear.onclick = () => {
			this.handleClose();
		}

		const checkNode = (parent, children) => {
			let node = children;
			while (node !== null) {
				if (node === parent) return true;
				node = node.parentNode;
			}
			return false;
		};

		$('.header_search_input').onblur = () => {
			setTimeout(() => {
				if ($('.header_search_result-inner'))
					$('.header_search_result-inner').style.display = "none";
			}, 160)
		}

		$('.header_search_input').onfocus = (e) => {
			if (e.target.value.trim() !== "") {
				$('.header_search_result-inner').style.display = "block";
			}
		}

		const btnSearch = $("#bthSearchHeader");

		btnSearch.onclick = () => {
			const valueSearch = inputSearch.value;
			if (valueSearch.trim() !== "") {
				window.location.href = `/SGU_SOCIAL_NETWORK/Search.jsp?page=all&value=${valueSearch.trim()}`
			}
		}


	}
}

new SearchHeader().render();

//
//<div class="header_search_result-item">
//						<div class="header_search_result-item_avt">
//							<img
//								src="/SGU_SOCIAL_NETWORK/assets/images/logo.png"
//								alt="">
//						</div>
//
//						<div class="header_search_result-item_content">
//							<div class="header_search_result-item_name">Nam Van</div>
//							<div class="header_search_result-item_friend">Bạn bè</div>
//						</div>
//					</div>
//					<div class="header_search_result-item">
//						<div class="header_search_result-item_avt">
//							<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
//						</div>
//
//						<div class="header_search_result-item_content">
//							<div class="header_search_result-item_name">Nam Van</div>
//							<div class="header_search_result-item_friend">Bạn bè</div>
//						</div>
//					</div>