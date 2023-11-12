<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

</head>
<body>
	<div id="render_list_post_search"></div>


	<script>
    window.onload = async () => {
        // Lấy query string từ URL
        const queryString = window.location.search;
        
        // Chuyển đổi query string thành đối tượng JavaScript
        const params = new URLSearchParams(queryString);
        
        // Lấy giá trị của tham số có tên là "value" từ đối tượng params
        const valueParam = params.get('value');
        
        // Gọi hàm renderListPostSearch và truyền tham số vào
      	const searchPostTemp = new SearchPagePost();
      	await searchPostTemp.renderListPostSearch(valueParam);
        
		const filterRadio = $$('.sidebar_left_search-filter_right');

			for (let temp of filterRadio) {
				temp.onchange = async () => {
					if (temp.checked) {
						if (temp.value == "all") {
							searchPostTemp.modeView = false;

						} else {
							searchPostTemp.modeView = true;

						}
					    await searchPostTemp.renderListPostSearch(valueParam);
					}

				}
			}
			
    }
	</script>
</body>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/PostItem.js"></script>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/PostDetail.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/CommentItem.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/CommentWrite.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/Comment.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/search_page_post.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/component/SearchPageItem.js"></script>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/search_page.js"></script>
</html>