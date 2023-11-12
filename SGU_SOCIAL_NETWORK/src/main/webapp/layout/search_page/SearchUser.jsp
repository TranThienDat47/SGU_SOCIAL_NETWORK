<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

</head>
<body>
	<div class="wrapper_of_block">
		<div class="search_page-content-wrapper-friend">
			<div class="search_page-section-title">
				<p>Mọi người</p>
			</div>
			<div id="search_page-friend-list-wrapper">

				<div class="search_page-friend-list">
					<div class="search_page-friend-item">
						<a hreflang="" class="search_page-friend-avatar"> <img
							src="https://images2.thanhnien.vn/528068263637045248/2023/5/12/3402996281807448214744715725794739163835942n-16838713649061930388403.jpeg"
							alt="" />
						</a>
						<div class="search_page-friend-details">
							<p>Nam văn</p>
							<span>2 bạn chung</span>
						</div>
					</div>
					<button class="search_page-addnew">
						<p>Thêm bạn bè</p>
					</button>
				</div>
				<!-- 				<div class="search_page-friend-list"> -->
				<!-- 					<div class="search_page-friend-item"> -->
				<!-- 						<a hreflang="" class="search_page-friend-avatar"> <img -->
				<!-- 							src="https://images2.thanhnien.vn/528068263637045248/2023/5/12/3402996281807448214744715725794739163835942n-16838713649061930388403.jpeg" -->
				<!-- 							alt="" /> -->
				<!-- 						</a> -->
				<!-- 						<div class="search_page-friend-details"> -->
				<!-- 							<p>Nam văn</p> -->
				<!-- 							<span>2 bạn chung</span> -->
				<!-- 						</div> -->
				<!-- 					</div> -->
				<!-- 					<div class="search_page-is_friend"> -->
				<!-- 						<p>Bạn bè</p> -->
				<!-- 						<button class="search_page-unfriend">Hủy kết bạn</button> -->
				<!-- 					</div> -->
				<!-- 				</div> -->
				<!-- 				<div class="search_page-friend-list"> -->
				<!-- 					<div class="search_page-friend-item"> -->
				<!-- 						<a hreflang="" class="search_page-friend-avatar"> <img -->
				<!-- 							src="https://images2.thanhnien.vn/528068263637045248/2023/5/12/3402996281807448214744715725794739163835942n-16838713649061930388403.jpeg" -->
				<!-- 							alt="" /> -->
				<!-- 						</a> -->
				<!-- 						<div class="search_page-friend-details"> -->
				<!-- 							<p>Nam văn</p> -->
				<!-- 							<span>2 bạn chung</span> -->
				<!-- 						</div> -->
				<!-- 					</div> -->
				<!-- 					<button class="search_page-cancle_add_friend"> -->
				<!-- 						<p>Hủy kết bạn</p> -->
				<!-- 					</button> -->
				<!-- 				</div> -->
			</div>
		</div>
	</div>

	<script>
    window.onload = async () => {
        // Lấy query string từ URL
        const queryString = window.location.search;
        
        // Chuyển đổi query string thành đối tượng JavaScript
        const params = new URLSearchParams(queryString);
        
        // Lấy giá trị của tham số có tên là "value" từ đối tượng params
        const valueParam = params.get('value');
        
        // Gọi hàm renderListPostSearch và truyền tham số vào
    	const searchPageTemp = new SearchPage();
    	
		 searchPageTemp.render();
			const filterRadio = $$('.sidebar_left_search-filter_right');

			for (let temp of filterRadio) {
				temp.onchange = async () => {
					if (temp.checked) {
						if (temp.value == "all") {
							searchPageTemp.modeView = false;
						} else {
							searchPageTemp.modeView = true;
						}
						await searchPageTemp.renderListFriendPageAll();
					}

				}
			}
			
			await searchPageTemp.renderListFriendPageAll();

	        
		
    }
	</script>
</body>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/SearchPageItem.js"></script>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/search_page_user.js"></script>
</html>