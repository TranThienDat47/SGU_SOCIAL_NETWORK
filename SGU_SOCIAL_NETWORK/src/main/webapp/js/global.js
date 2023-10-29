const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var tempPostDetail = null;


const preventScroll = (e) => {
	e.preventDefault();
	e.stopPropagation();
};

const checkNode = (parent, children) => {
	let node = children;
	while (node !== null) {
		if (node === parent) return true;
		node = node.parentNode;
	}
	return false;
};

const scroll = (e) => {
	e.stopPropagation();

	return true;
};

// document.body.addEventListener('wheel', preventScroll, { passive: false });
// $('.cart-view-scroll').removeEventListener('wheel', scroll, { passive: true });