class UserFriendItem {
	constructor(data = { image: "", name: "", id: "", countRoomate: "", friendID: "", userID: "" }) {
		this.data = data;
	}

	async addEvent() {

//		const that = this;
//
//		setTimeout(() => {
//			const wrapperListFriend = $(`#list_friend-info_member-${that.data.id}`);
//			const btnShowDetail = $(`#btnShowAction-${that.data.id}`);
//
//			if (btnShowDetail)
//
//				btnShowDetail.onclick = () => {
//					if (!wrapperListFriend.classList.contains("list_friend-info_member_show_action")) {
//						const listOther = $(".list_friend-info_member.list_friend-info_member_show_action")
//						if (listOther)
//							listOther.classList.remove("list_friend-info_member_show_action")
//
//						wrapperListFriend.classList.add("list_friend-info_member_show_action")
//
//					} else {
//						wrapperListFriend.classList.remove("list_friend-info_member_show_action")
//					}
//				}
//		})
	}

	render() {
		const that = this;

		that.addEvent();

		return `
		<div id="list_friend-info_member-${that.data.id}" class="list_friend-info_member">
			<div class="list_friend-img_member">
				<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.friendID}"><img
					src="${that.data.image}"
					alt="" /></a>
			</div>
			<div class="list_friend-name_member">
				<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.friendID}"><p class="list_friend-name_child">${that.data.name}</p></a>
				<p class="list_friend-friend_child">${that.data.countRoomate} bạn chung</p>
			</div>
		</div>		
		`;
	}
}