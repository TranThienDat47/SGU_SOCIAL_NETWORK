class UserFriendItem {
	constructor(data = { image: "", name: "", id: "", countRoomate: "", friendID: "" }) {
		this.data = data;
	}

	async addEvent() {

		const that = this;

		setTimeout(() => {
			const wrapperListFriend = $(`#list_friend-info_member-${that.data.id}`);
			const btnShowDetail = $(`#btnShowAction-${that.data.id}`);

			if (btnShowDetail)

				btnShowDetail.onclick = () => {
					if (!wrapperListFriend.classList.contains("list_friend-info_member_show_action")) {
						const listOther = $(".list_friend-info_member.list_friend-info_member_show_action")
						if (listOther)
							listOther.classList.remove("list_friend-info_member_show_action")

						wrapperListFriend.classList.add("list_friend-info_member_show_action")

					} else {
						wrapperListFriend.classList.remove("list_friend-info_member_show_action")
					}
				}

		})
	}

	render() {
		const that = this;

		that.addEvent();

		return `
		<div id="list_friend-info_member-${that.data.id}" class="list_friend-info_member">
			<div class="list_friend-img_member">
				<img
					src="${that.data.image}"
					alt="" />
			</div>
			<div class="list_friend-name_member">
				<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend?id=${that.data.friendID}"><p class="list_friend-name_child">${that.data.name}</p></a>
				<p class="list_friend-friend_child">${that.data.countRoomate} bạn chung</p>
			</div>
			<div id="btnShowAction-${that.data.id}" data-id="${that.data.id}" class="list_friend-action_icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"
					viewBox="0 0 23 23" fill="none">
	              <path
						d="M0.410767 11.5C0.410767 10.8328 0.713667 10.193 1.25283 9.72118C1.792 9.24941 2.52327 8.98438 3.28577 8.98438C4.04826 8.98438 4.77953 9.24941 5.3187 9.72118C5.85787 10.193 6.16077 10.8328 6.16077 11.5C6.16077 12.1672 5.85787 12.807 5.3187 13.2788C4.77953 13.7506 4.04826 14.0156 3.28577 14.0156C2.52327 14.0156 1.792 13.7506 1.25283 13.2788C0.713667 12.807 0.410767 12.1672 0.410767 11.5ZM8.62505 11.5C8.62505 10.8328 8.92795 10.193 9.46712 9.72118C10.0063 9.24941 10.7376 8.98438 11.5001 8.98438C12.2626 8.98438 12.9938 9.24941 13.533 9.72118C14.0722 10.193 14.3751 10.8328 14.3751 11.5C14.3751 12.1672 14.0722 12.807 13.533 13.2788C12.9938 13.7506 12.2626 14.0156 11.5001 14.0156C10.7376 14.0156 10.0063 13.7506 9.46712 13.2788C8.92795 12.807 8.62505 12.1672 8.62505 11.5ZM19.7143 8.98438C20.4768 8.98438 21.2081 9.24941 21.7473 9.72118C22.2864 10.193 22.5893 10.8328 22.5893 11.5C22.5893 12.1672 22.2864 12.807 21.7473 13.2788C21.2081 13.7506 20.4768 14.0156 19.7143 14.0156C18.9518 14.0156 18.2206 13.7506 17.6814 13.2788C17.1422 12.807 16.8393 12.1672 16.8393 11.5C16.8393 10.8328 17.1422 10.193 17.6814 9.72118C18.2206 9.24941 18.9518 8.98438 19.7143 8.98438Z"
						fill="black" />
	            </svg>
			</div>
			<div class="list_friend-box_show_action">
				<div class="list_friend-child">
					<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21"
						viewBox="0 0 21 21" fill="none">
		                <g clip-path="url(#clip0_156_1721)">
		                  <path
							d="M3.15 5.25C3.15 3.85761 3.5925 2.52226 4.38015 1.53769C5.1678 0.553123 6.23609 0 7.35 0C8.46391 0 9.5322 0.553123 10.3198 1.53769C11.1075 2.52226 11.55 3.85761 11.55 5.25C11.55 6.64239 11.1075 7.97775 10.3198 8.96231C9.5322 9.94688 8.46391 10.5 7.35 10.5C6.23609 10.5 5.1678 9.94688 4.38015 8.96231C3.5925 7.97775 3.15 6.64239 3.15 5.25ZM0 19.7818C0 15.7418 2.61844 12.4688 5.85047 12.4688H8.84953C12.0816 12.4688 14.7 15.7418 14.7 19.7818C14.7 20.4545 14.2636 21 13.7255 21H0.974531C0.436406 21 0 20.4545 0 19.7818ZM15.4547 5.86523C15.7631 5.47969 16.2619 5.47969 16.567 5.86523L18.1092 7.79297L19.6514 5.86523C19.9598 5.47969 20.4586 5.47969 20.7637 5.86523C21.0689 6.25078 21.0722 6.87422 20.7637 7.25566L19.2216 9.1834L20.7637 11.1111C21.0722 11.4967 21.0722 12.1201 20.7637 12.5016C20.4553 12.883 19.9566 12.8871 19.6514 12.5016L18.1092 10.5738L16.567 12.5016C16.2586 12.8871 15.7598 12.8871 15.4547 12.5016C15.1495 12.116 15.1462 11.4926 15.4547 11.1111L16.9969 9.1834L15.4547 7.25566C15.1462 6.87012 15.1462 6.24668 15.4547 5.86523Z"
							fill="black" />
		                </g>
		                <defs>
		                  <clipPath id="clip0_156_1721">
		                    <rect width="21" height="21" fill="white" />
		                  </clipPath>
		                </defs>
		             </svg>
					<p>Hủy kết bạn</p>
				</div>
			</div>
		</div>		
		`;
	}
}