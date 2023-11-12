setTimeout(() => {
	const $ = document.querySelector.bind(document);
	const $$ = document.querySelectorAll.bind(document);

	const globalImageOfUser = $$(".globalImageOfUser")
	const urlImage = (JSON.parse(localStorage.getItem('image')))
	const urlBackground = (JSON.parse(localStorage.getItem('background')))

	if (globalImageOfUser)
		for (let temp of globalImageOfUser) {
			temp.src = urlImage;
		}

	const globalBackgroundOfUser = $$(".globalBackgroundOfUser")
	if (globalBackgroundOfUser)
		for (let temp of globalBackgroundOfUser) {
			temp.src = urlBackground;
		}
})