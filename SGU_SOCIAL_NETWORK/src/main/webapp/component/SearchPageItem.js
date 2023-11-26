class SearchPageItem {
	constructor(data = { id: "", name: "", countRoomate: "", image: "" }) {
		this.modeItem = 0;  /* 0: thêm bạn bè, 1: từ chối yêu cầu, 2: hủy yêu cầu, 3: là bạn bè */
		this.data = data;
	}

	addEvent() {

	}

	async render() {
		const that = this;

		return `
				<div id="search_page-friend-list-${that.data.id}" class="search_page-friend-list" class="search_page-friend-list">
					<div class="search_page-friend-item">
						<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.id}" class="search_page-friend-avatar"> <img
							src="${that.data.image}"
							alt="" />
						</a>
						<div class="search_page-friend-details">
							<a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.id}"><p>${that.data.name}</p></a>
							<span>${that.data.countRoomate} bạn chung</span>
						</div>
					</div>
					<button class="search_page-addnew">
						<p>Thêm bạn bè</p>
					</button>
				</div>
	`
	}
}