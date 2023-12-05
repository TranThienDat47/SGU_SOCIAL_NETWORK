const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var tempPostDetail = null;

var userGlobal = null;


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

function handleScrollWindow(handle = () => { }) {
	const isScrollAtBottom = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight;

	if (isScrollAtBottom) {
		handle();
	}
}


function handleScroll(parentNode, handle = () => { }) {
	if (
		parentNode &&
		Math.floor(parentNode.offsetHeight + parentNode.scrollTop) >=
		parentNode.scrollHeight - 3
	) {
		handle();
	}
}



const showMessageGlobal = (text) => {
	const wrapperMessage = $(".toolkit_message-wrapper");

	var tempMessageGlobal = null;

	tempMessageGlobal = setTimeout(() => {
		$(`#toolkit_message-${tempMessageGlobal}`).remove();
	}, 1963)

	const temp_comment = `
				<div class="toolkit_message" id="toolkit_message-${tempMessageGlobal}">
					<div class="toolkit_message-content">${text}</div>
					<div class="toolkit_message-icon" id="toolkit_message-icon-${tempMessageGlobal}">
						<svg xmlns="http://www.w3.org/2000/svg" height="1em"
							viewBox="0 0 384 512">
							<path
								d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
					</div>
				</div>
				`;

	wrapperMessage.insertAdjacentHTML('beforeend', temp_comment)

	$(`#toolkit_message-icon-${tempMessageGlobal}`).onclick = () => {
		clearTimeout(tempMessageGlobal);
		$(`#toolkit_message-${tempMessageGlobal}`).remove();
	}

}

function getCookieGlobal(name) {
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i].trim();
		if (cookie.indexOf(name + '=') === 0) {
			var encodedValue = cookie.substring(name.length + 1, cookie.length);
			var decodedValue = decodeURIComponent(encodedValue);
			return decodedValue;
		}
	}
	return null;
}

function setCookieGlobal(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	var encodedValue = encodeURIComponent(value); // Mã hóa giá trị

	document.cookie = name + "=" + encodedValue + expires + "; path=/";
}



// document.body.addEventListener('wheel', preventScroll, { passive: false });
// $('.cart-view-scroll').removeEventListener('wheel', scroll, { passive: true });