class CreatePost {

	constructor() {
		this.listImg = []
	}

	renderListImage() {
		const that = this;
		const resultData = (image) => {
			return `
				<div class="create_post-add_image">
					<button class="create_post-delete_image" dataimg = "${image}">
						<svg xmlns="http://www.w3.org/2000/svg" height="1em"
							viewBox="0 0 384 512">
									! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.
									<path
								d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
					</button>
					<img alt="anh"
						src="${image}">
				</div>
			`
		}

		const wrapperCreatePostAddImage = $("#create_post-list_image_inner");

		var reultListImage = "";
		if (that.listImg.length > 0) {

			reultListImage = that.listImg.map((element) => {
				return resultData(element)
			}).join("");
		}

		wrapperCreatePostAddImage.innerHTML = reultListImage || "";

		setTimeout(() => {
			if (that.listImg.length > 0) {
				const btnDeleteImg = $$('.create_post-delete_image');

				for (let tempBtn of btnDeleteImg) {
					tempBtn.onclick = (e) => {

						console.log(tempBtn.getAttribute('dataimg'))
						that.listImg = that.listImg.filter(item => item !== tempBtn.getAttribute('dataimg'));
						that.renderListImage();
					}

					if (that.listImg.length >= 4) {
						$("#create_post-add_image").style.display = "none";
					} else {
						$("#create_post-add_image").style.display = "flex";
					}
				}
			}
		})

	}

	render() {
		const that = this;
		const btnCreatePostAddImage = $("#create_post-btn_add_img");

		const wrapperCreatePostAddImage = $(".create_post-list_image");

		const createPostUpload = $("#create_post-upload_file");

		const tabAddImage = $("#create_post-add_image")

		btnCreatePostAddImage.onclick = () => {
			if (!wrapperCreatePostAddImage.classList.contains("create_post-list_image_show")) {
				wrapperCreatePostAddImage.classList.add("create_post-list_image_show")
				createPostUpload.click();
			}
		}

		tabAddImage.onclick = () => {
			createPostUpload.click();
		}


		function preview_image_create_post(event) {
			var reader = new FileReader();
			reader.onload = function() {
				that.listImg.push(reader.result);
				that.renderListImage();

				if (that.listImg.length >= 4) {
					$("#create_post-add_image").style.display = "none";
				}
			}
			reader.readAsDataURL(event.target.files[0]);
		}

		createPostUpload.onchange = (e) => {
			preview_image_create_post(e);
		}
	}
}

const createPost = new CreatePost();

createPost.render();