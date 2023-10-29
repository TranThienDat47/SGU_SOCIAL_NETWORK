class GloabPost {
	constructor() {

	}


	render() {
		const btnComment = $$(".global_post-btn_comment");

		for (let temp of btnComment) {

			temp.onclick = () => {
				const url = "/SGU_SOCIAL_NETWORK/api/post";
				const send_data = {
					postID: "200000000"
				};

				const xhr = new XMLHttpRequest();
				xhr.open("POST", url, true)
				xhr.setRequestHeader("Content-Type", "application/json");

				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							try {
								const data = JSON.parse(xhr.responseText);
								console.log("ok la", data)
								tempPostDetail = data;

								const post = new PostDetail({ id: data.id });

								post.render().then(data => {
									$("#showPostGloabal").innerHTML = data
								})


							} catch (error) {
								console.log("JSON parsing error:", error);
							}
						} else {
							console.log("Request failed with status:", xhr.status);
						}
					}
				}

				xhr.send(JSON.stringify(send_data));
			}
		}

	}
}

new GloabPost().render();