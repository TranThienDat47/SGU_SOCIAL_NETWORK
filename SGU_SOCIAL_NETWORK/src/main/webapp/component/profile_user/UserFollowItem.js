class UserFollowItem {
	constructor(data = { image: "", name: "", id: "", countRoomate: "", followID: "" }) {
		this.data = data;
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
	async addEvent() {

		const that = this;

		setTimeout(() => {
			const wrapperListFriend = $(`#list_follow-info_member-${that.data.id}`);
			const btnShowDetail = $(`#btnShowAction_follow-${that.data.id}`);

			if (btnShowDetail)
				btnShowDetail.onclick = () => {
					console.log(wrapperListFriend)
					if (!wrapperListFriend.classList.contains("list_follow-info_member_show_action")) {
						const listOther = $(".list_follow-info_member.list_follow-info_member_show_action")
						if (listOther)
							listOther.classList.remove("list_follow-info_member_show_action")

						wrapperListFriend.classList.add("list_follow-info_member_show_action")

					} else {
						wrapperListFriend.classList.remove("list_follow-info_member_show_action")
					}
				}

			const handleUnfollow = async () => {
				const url = "/SGU_SOCIAL_NETWORK/api/follow/unfollow";
				const send_data = {
					userID: getCookieGlobal("id"),
					followID: that.data.followID,
				};

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
			const btnUnfollow = $(`#btnUnfollowProfielFriend-${that.data.id}`);



			btnUnfollow.onclick = () => {
				const wrapperBtnCancle = $(`#list_follow-box_show_action-${that.data.id}`)
				const rootOfItem = $(`#list_follow-info_member-${that.data.id}`)

				wrapperBtnCancle.remove();
				btnShowDetail.remove();
				handleUnfollow();

			}

		})
	}

	render() {
		const that = this;

		console.log(that.data)

		that.addEvent();

		return `
		<div id="list_follow-info_member-${that.data.id}" class="list_follow-info_member">
			<div class="list_follow-img_member">
			<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.followID}">
				<img 
					src="${that.data.image}"
					alt="" /> </a>
			</div>
			<div class="list_follow-name_member">
				<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.followID}"><p class="list_follow-name_child">${that.data.name}</p></a>
				<p class="list_follow-friend_child">${that.data.countRoomate} bạn chung</p>
			</div>
			<div id="btnShowAction_follow-${that.data.id}" data-id="${that.data.id}" class="list_follow-action_icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"
					viewBox="0 0 23 23" fill="none">
	              <path
						d="M0.410767 11.5C0.410767 10.8328 0.713667 10.193 1.25283 9.72118C1.792 9.24941 2.52327 8.98438 3.28577 8.98438C4.04826 8.98438 4.77953 9.24941 5.3187 9.72118C5.85787 10.193 6.16077 10.8328 6.16077 11.5C6.16077 12.1672 5.85787 12.807 5.3187 13.2788C4.77953 13.7506 4.04826 14.0156 3.28577 14.0156C2.52327 14.0156 1.792 13.7506 1.25283 13.2788C0.713667 12.807 0.410767 12.1672 0.410767 11.5ZM8.62505 11.5C8.62505 10.8328 8.92795 10.193 9.46712 9.72118C10.0063 9.24941 10.7376 8.98438 11.5001 8.98438C12.2626 8.98438 12.9938 9.24941 13.533 9.72118C14.0722 10.193 14.3751 10.8328 14.3751 11.5C14.3751 12.1672 14.0722 12.807 13.533 13.2788C12.9938 13.7506 12.2626 14.0156 11.5001 14.0156C10.7376 14.0156 10.0063 13.7506 9.46712 13.2788C8.92795 12.807 8.62505 12.1672 8.62505 11.5ZM19.7143 8.98438C20.4768 8.98438 21.2081 9.24941 21.7473 9.72118C22.2864 10.193 22.5893 10.8328 22.5893 11.5C22.5893 12.1672 22.2864 12.807 21.7473 13.2788C21.2081 13.7506 20.4768 14.0156 19.7143 14.0156C18.9518 14.0156 18.2206 13.7506 17.6814 13.2788C17.1422 12.807 16.8393 12.1672 16.8393 11.5C16.8393 10.8328 17.1422 10.193 17.6814 9.72118C18.2206 9.24941 18.9518 8.98438 19.7143 8.98438Z"
						fill="black" />
	            </svg>
			</div>
			<div id="list_follow-box_show_action-${that.data.id}" class="list_follow-box_show_action" style="display: none">
				<div id="btnUnfollowProfielFriend-${that.data.id}" class="list_follow-child">
					<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21"
								viewBox="0 0 21 21" fill="none">
				                <path
									d="M3 1.3125C1.34531 1.3125 0 2.48965 0 3.9375V17.0625C0 18.5104 1.34531 19.6875 3 19.6875H18C19.6547 19.6875 21 18.5104 21 17.0625V3.9375C21 2.48965 19.6547 1.3125 18 1.3125H3ZM9.375 14.1094V11.4844H6.375C5.75156 11.4844 5.25 11.0455 5.25 10.5C5.25 9.95449 5.75156 9.51562 6.375 9.51562H9.375V6.89062C9.375 6.34512 9.87656 5.90625 10.5 5.90625C11.1234 5.90625 11.625 6.34512 11.625 6.89062V9.51562H14.625C15.2484 9.51562 15.75 9.95449 15.75 10.5C15.75 11.0455 15.2484 11.4844 14.625 11.4844H11.625V14.1094C11.625 14.6549 11.1234 15.0938 10.5 15.0938C9.87656 15.0938 9.375 14.6549 9.375 14.1094Z"
									fill="black" />
				    </svg>
					<p>Hủy theo dõi</p>
				</div>
			</div>
		</div>		
		`;
	}
}