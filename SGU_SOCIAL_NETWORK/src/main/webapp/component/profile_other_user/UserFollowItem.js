class UserFollowItem {
	constructor(data = { image: "", name: "", id: "", countRoomate: "", followID: "" }) {
		this.data = data;
	}

	async addEvent() {

	}

	render() {
		const that = this;

		console.log(that.data)

//		that.addEvent();

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
		</div>		
		`;
	}
}