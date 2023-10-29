class SearchPage {
	constructor() {

	}

	render() {
		const btnFriend = $$(".search_page-is_friend");

		for (let temp of btnFriend) {
			temp.onclick = () => {

				if (!temp.classList.contains("search_page-is_friend-show")) {
					temp.classList.add("search_page-is_friend-show")
				} else {
					temp.classList.remove("search_page-is_friend-show")
				}
			}
		}

		const btnUnFriend = $$(".search_page-unfriend");

		for (let temp of btnUnFriend) {
			temp.onclick = () => {
				console.log("haha")

			}
		}

		const btnAddFriend = $$(".search_page-addnew");

		for (let temp of btnAddFriend) {
			temp.onclick = () => {
			}
		}
	}

}

new SearchPage().render();