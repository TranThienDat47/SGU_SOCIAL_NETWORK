class CommentItem {
	constructor(data = {
		image: "",
		name: "",
		content: "",
		likes: 0,
		replies: 0,
		createAt: "",
		parentID: -1,
		modeReply: false,
		id: -1,
		rootID: "",
		userID: "",
		timeDelay: 100,
	}) {
		this.data = data;
		this.listComment = [];
		this.showReplyWrite = false;
		this.showReplies = false;
		this.tempImageError = { image: "" }
		this.isLikeComment = false;
		this.listLikeComment = [];
	}

	decryptCookieValuePlus(encodedValue, encryptionKey) {
		try {
			// Decode the Base64 encoded value
			var encryptedValue = CryptoJS.enc.Base64.parse(encodedValue);

			// Create a key object from the encryption key
			var key = CryptoJS.enc.Utf8.parse(encryptionKey);

			// Perform decryption using AES
			var decryptedBytes = CryptoJS.AES.decrypt({ ciphertext: encryptedValue }, key, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});

			// Convert the decrypted bytes to a UTF-8 string
			var decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);

			return decryptedValue;
		} catch (error) {
			console.error('Error decrypting cookie value:', error);
			return null;
		}
	}

	getCookieGlobalPlus(name) {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim();
			if (cookie.indexOf(name + '=') === 0) {
				var encodedValue = cookie.substring(name.length + 1, cookie.length);

				// Thực hiện giải mã với cùng một key (khóa)
				var decryptedValue = this.decryptCookieValuePlus(encodedValue, '1234567890123456');

				return decryptedValue;
			}
		}
		return null;
	}

	async fetchCheckLikeComment() {
		const that = this;
		const url = "/SGU_SOCIAL_NETWORK/api/like_comment/check_like";
		const send_data = {
			commentID: this.data.id,
			userID: getCookieGlobal("id")
		};

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open("POST", url, true);

			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization", `${that.getCookieGlobalPlus("token")}`);

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							const data = JSON.parse(xhr.responseText);
							if (data) {
								that.isLikeComment = true;
							}
							resolve(data);
						} catch (error) {
							console.log("JSON parsing error:", error);
							reject(error);
						}
					} else {
						console.log("Request failed with status:", xhr.status);
						reject(new Error(`Error: ${xhr.statusText}`));
					}
				}
			}.bind(this);

			xhr.send(JSON.stringify(send_data));
		});
	}

	async fetchLikeComment() {
		const that = this;
		const url = "/SGU_SOCIAL_NETWORK/api/like_comment/get_like";
		const send_data = {
			commentID: this.data.id,
			userID: getCookieGlobal("id")
		};

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open("POST", url, true);

			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization", `${that.getCookieGlobalPlus("token")}`);

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							const data = JSON.parse(xhr.responseText);
							that.listLikeComment = data;
							resolve(data);
						} catch (error) {
							console.log("JSON parsing error:", error);
							reject(error);
						}
					} else {
						console.log("Request failed with status:", xhr.status);
						reject(new Error(`Error: ${xhr.statusText}`));
					}
				}
			}.bind(this);
			xhr.send(JSON.stringify(send_data));
		});
	}

	async fetchComment() {
		const that = this;
		const url = "/SGU_SOCIAL_NETWORK/api/comment/get_comment";
		const send_data = { parentID: this.data.id };

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization", `${that.getCookieGlobalPlus("token")}`);

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							const data = JSON.parse(xhr.responseText);
							that.listComment = data;
							resolve(data);
						} catch (error) {
							console.log("JSON parsing error:", error);
							reject(error);
						}
					} else {
						console.log("Request failed with status:", xhr.status);
						reject(new Error(`Error: ${xhr.statusText}`));
					}
				}
			}.bind(this);
			xhr.send(JSON.stringify(send_data));
		});
	}

	async renderCommentReply() {
		const that = this;

		const renderListComment = await Promise.all(that.listComment.map(async (element, index) => {

			const commentData = {
				image: element.image,
				name: element.firstName + " " + element.lastName,
				createAt: element.createAt,
				content: element.content,
				likes: element.likes,
				replies: element.replies,
				parentID: element.parentID,
				id: element.id,
				modeReply: true,
				rootID: that.data.rootID,
				userID: element.userID,
				timeDelay: index,
			};

			const commentItem = new CommentItem(commentData);
			const result = await commentItem.render();

			return result;
		}));

		return renderListComment.join("");
	}

	async addEvent() {
		let intervalID = null;
		const that = this;
		const commentWrite = new CommentWrite({ parentID: this.data.id, modeReply: that.data.modeReply ? "2" : "1" });

		var wsUrl;
		if (window.location.protocol == 'http:') {
			wsUrl = 'ws://';
		} else {
			wsUrl = 'wss://';
		}
		var ws = new WebSocket(wsUrl + window.location.host + "/SGU_SOCIAL_NETWORK/chat");

		ws.onmessage = async function(event) {

			const dataTemp = JSON.parse(event.data);


			if (parseInt(commentWrite.data.modeReply) === 1) {

				if (dataTemp.parentID === that.data.id && that.data.id === dataTemp.writeCommentID) {
					setTimeout(async () => {

						if (!that.showReplies) {
							$(`#CommentItem_${that.data.id} #btnShowReply`).click();
						}
						const commentData = {
							image: dataTemp.image,
							name: dataTemp.firstName + " " + dataTemp.lastName,
							createAt: dataTemp.createAt,
							content: dataTemp.content,
							likes: dataTemp.likes,
							replies: dataTemp.replies,
							id: dataTemp.id,
							parentID: dataTemp.parentID,
							modeReply: true,
							rootID: that.data.rootID,
							userID: dataTemp.userID

						};

						const commentItem = new CommentItem(commentData);

						await commentItem.render().then((resultData) => {
							const wrapperListReplies = $(`#CommentItem_${that.data.parentID} .wrapper-list__reply`);
							$(`#CommentItem_${that.data.id} .wrapper-list__reply`).insertAdjacentHTML('afterbegin', resultData);
						})
					});


					if (that.data.replies <= 0) {
						that.data.replies = parseInt(that.data.replies) + 1;
						const wrapperRenderListComment = $(`#comment_item-render_list_comment-${that.data.id}`)

						wrapperRenderListComment.innerHTML = `
								                <div class="replies">
								                	<div class="reply-header">
								                		<button id="btnShowReply" class="btn transparent show-reply">
								                			<div class="icon">
								                				<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
								                			</div> <span id="comment_item-count_reply-${that.data.id}">${that.data.replies} </span> <span> phản hồi</span></button>
								                	</div>
								                </div>`
					} else {
						that.data.replies = parseInt(that.data.replies) + 1;
						const countReplyComment = $(`#comment_item-count_reply-${that.data.id}`)

						countReplyComment.innerHTML = parseInt(countReplyComment.innerHTML.trim()) + 1 + " ";
					}
					const countReplies = $$(`.post_detail-count_replies-${that.data.parentID}`);

					if (countReplies) for (let temp of countReplies) {
						temp.innerHTML = parseInt(temp.innerHTML.trim()) + 1 + " ";
					}

				}
			} else {
				if (dataTemp.parentID === that.data.parentID && dataTemp.commentID === that.data.id) {
					setTimeout(async () => {
						const commentData = {
							image: dataTemp.image,
							name: dataTemp.firstName + " " + dataTemp.lastName,
							createAt: dataTemp.createAt,
							content: dataTemp.content,
							likes: dataTemp.likes,
							replies: dataTemp.replies,
							id: dataTemp.id,
							parentID: dataTemp.parentID,
							modeReply: true,
							rootID: that.data.rootID,
							userID: dataTemp.userID

						};

						const commentItem = new CommentItem(commentData);

						await commentItem.render().then((resultData) => {
							//							const wrapperListReplies = $(`#CommentItem_${that.data.parentID} .wrapper-list__reply`);
							$(`#CommentItem_${that.data.parentID} .wrapper-list__reply`).insertAdjacentHTML('afterbegin', resultData);
						})
					})

					that.data.replies = parseInt(that.data.replies) + 1;
					const countReplyComment = $(`#comment_item-count_reply-${that.data.parentID}`)

					countReplyComment.innerHTML = parseInt(countReplyComment.innerHTML.trim()) + 1 + " ";
				}

				const countReplies = $$(`.post_detail-count_replies-${that.data.parentID}`);

				for (let temp of countReplies) {
					temp.innerHTML = parseInt(temp.innerHTML.trim()) + 1 + " ";
				}
			}

		};

		ws.onclose = () => {
			const that = this;
			const compressImage = (base64String, quality) => {
				return new Promise((resolve, reject) => {
					const img = new Image();
					img.src = base64String;

					img.onload = () => {
						const canvas = document.createElement('canvas');
						const ctx = canvas.getContext('2d');

						// Set canvas dimensions to the original image dimensions
						canvas.width = img.width;
						canvas.height = img.height;

						// Draw the image onto the canvas with specified quality
						ctx.drawImage(img, 0, 0, img.width, img.height);

						// Convert the canvas content to a base64 JPEG image
						const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

						resolve(compressedBase64);
					};

					img.onerror = reject;
				});
			};


			compressImage(that.tempImageError.image, 0.1).then((compressedBase64) => {

				setTimeout(() => {
					var ws = new WebSocket(wsUrl + window.location.host + "/SGU_SOCIAL_NETWORK/chat");

					ws.onmessage = async function(event) {

						const dataTemp = JSON.parse(event.data);


						if (parseInt(commentWrite.data.modeReply) === 1) {

							if (dataTemp.parentID === that.data.id && that.data.id === dataTemp.writeCommentID) {
								setTimeout(async () => {

									if (!that.showReplies) {
										$(`#CommentItem_${that.data.id} #btnShowReply`).click();
									}
									const commentData = {
										image: dataTemp.image,
										name: dataTemp.firstName + " " + dataTemp.lastName,
										createAt: dataTemp.createAt,
										content: dataTemp.content,
										likes: dataTemp.likes,
										replies: dataTemp.replies,
										id: dataTemp.id,
										parentID: dataTemp.parentID,
										modeReply: true,
										rootID: that.data.rootID,
										userID: dataTemp.userID

									};

									const commentItem = new CommentItem(commentData);

									await commentItem.render().then((resultData) => {
										const wrapperListReplies = $(`#CommentItem_${that.data.parentID} .wrapper-list__reply`);
										$(`#CommentItem_${that.data.id} .wrapper-list__reply`).insertAdjacentHTML('afterbegin', resultData);
									})
								});


								if (that.data.replies <= 0) {
									that.data.replies = parseInt(that.data.replies) + 1;
									const wrapperRenderListComment = $(`#comment_item-render_list_comment-${that.data.id}`)

									wrapperRenderListComment.innerHTML = `
								                <div class="replies">
								                	<div class="reply-header">
								                		<button id="btnShowReply" class="btn transparent show-reply">
								                			<div class="icon">
								                				<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
								                			</div> <span id="comment_item-count_reply-${that.data.id}">${that.data.replies} </span> <span> phản hồi</span></button>
								                	</div>
								                </div>`
								} else {
									that.data.replies = parseInt(that.data.replies) + 1;
									const countReplyComment = $(`#comment_item-count_reply-${that.data.id}`)

									countReplyComment.innerHTML = parseInt(countReplyComment.innerHTML.trim()) + 1 + " ";
								}
								const countReplies = $$(`.post_detail-count_replies-${that.data.parentID}`);

								if (countReplies) for (let temp of countReplies) {
									temp.innerHTML = parseInt(temp.innerHTML.trim()) + 1 + " ";
								}

							}
						} else {
							if (dataTemp.parentID === that.data.parentID && dataTemp.commentID === that.data.id) {
								setTimeout(async () => {
									const commentData = {
										image: dataTemp.image,
										name: dataTemp.firstName + " " + dataTemp.lastName,
										createAt: dataTemp.createAt,
										content: dataTemp.content,
										likes: dataTemp.likes,
										replies: dataTemp.replies,
										id: dataTemp.id,
										parentID: dataTemp.parentID,
										modeReply: true,
										rootID: that.data.rootID,
										userID: dataTemp.userID

									};

									const commentItem = new CommentItem(commentData);

									await commentItem.render().then((resultData) => {
										//							const wrapperListReplies = $(`#CommentItem_${that.data.parentID} .wrapper-list__reply`);
										$(`#CommentItem_${that.data.parentID} .wrapper-list__reply`).insertAdjacentHTML('afterbegin', resultData);
									})
								})

								that.data.replies = parseInt(that.data.replies) + 1;
								const countReplyComment = $(`#comment_item-count_reply-${that.data.parentID}`)

								countReplyComment.innerHTML = parseInt(countReplyComment.innerHTML.trim()) + 1 + " ";
							}

							const countReplies = $$(`.post_detail-count_replies-${that.data.parentID}`);

							for (let temp of countReplies) {
								temp.innerHTML = parseInt(temp.innerHTML.trim()) + 1 + " ";
							}
						}

					};

					ws.onopen = () => {
						that.tempImageError.image = compressedBase64;

						ws.send(JSON.stringify(that.tempImageError));
					}

				}, 400)
			});

		}

		ws.onerror = function(event) {
			console.log("Error ", event)
		}

		const handleSubmitComment = async () => {

			const compressImage = (base64String, quality) => {
				return new Promise((resolve, reject) => {
					const img = new Image();
					img.src = base64String;

					img.onload = () => {
						const canvas = document.createElement('canvas');
						const ctx = canvas.getContext('2d');

						// Set canvas dimensions to the original image dimensions
						canvas.width = img.width;
						canvas.height = img.height;

						// Draw the image onto the canvas with specified quality
						ctx.drawImage(img, 0, 0, img.width, img.height);

						// Convert the canvas content to a base64 JPEG image
						const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

						resolve(compressedBase64);
					};

					img.onerror = reject;
				});
			};

			if (!commentWrite.getText().trim()) {
				return;
			} else {
				const url = "/SGU_SOCIAL_NETWORK/api/comment/create_parent_is_comment"

				var senParentID;

				if (that.data.modeReply) {
					senParentID = that.data.parentID;
				} else if (!that.data.modeReply) {
					senParentID = that.data.id;
				}

				const send_data = { parentID: senParentID, userID: getCookieGlobal("id"), content: commentWrite.getText().trim() };

				const xhr = new XMLHttpRequest();
				xhr.open("POST", url, true);
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.setRequestHeader("Authorization", `${that.getCookieGlobalPlus("token")}`);

				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							try {
								var data = JSON.parse(xhr.responseText);
								if (parseInt(commentWrite.data.modeReply) === 1) {
									data.stateReply = 0;
									data.writeCommentID = that.data.id;
								} else {
									data.stateReply = 1;
									data.commentID = that.data.id;
								}

								//								ws.send(JSON.stringify(data));

								compressImage(data.image, 0.02).then((compressedBase64) => {
									data.image = compressedBase64;
									that.tempImageError = data;

									ws.send(JSON.stringify(data));
								});

							} catch (error) {
								console.log("JSON parsing error:", error);
							}
						} else {
							console.log("Request failed with status:", xhr.status);
							reject(new Error(`Error: ${xhr.statusText}`));
						}
					}
				}

				xhr.send(JSON.stringify(send_data));
			}
		}

		commentWrite.setHandleSubmitComment(handleSubmitComment);

		intervalID = setInterval(() => {
			const btnReply = $(`#CommentItem_${that.data.id} #btn-reply`);

			if (btnReply) {
				const btnShowReply = $(`#CommentItem_${that.data.id} #btnShowReply`);

				btnReply.onclick = (e) => {

					if (!that.showReplyWrite) {
						that.showReplyWrite = true;

						const wrapperWrite = $(`#CommentItem_${that.data.id} .wrapper-comment__write`);

						wrapperWrite.innerHTML = commentWrite.render();
					}
					if (commentWrite.getInputElement())
						commentWrite.getInputElement().focus();

				}

				commentWrite.setHandleCancle(() => {
					$(`#CommentWrite_${that.data.id}`).parentNode.innerHTML = "";
					that.showReplyWrite = false;
					that.addEvent();
				})

				if (btnShowReply)
					btnShowReply.onclick = async () => {
						const wrapperIcon = $(`#CommentItem_${that.data.id} #btnShowReply .icon`);
						const wrapperListReplies = $(`#CommentItem_${that.data.id} .wrapper-list__reply`);

						if (!that.showReplies) {
							wrapperIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>`;
							await this.fetchComment().then(async () => {
								wrapperListReplies.innerHTML = await that.renderCommentReply();
								that.showReplies = true;
							});

						} else {
							wrapperListReplies.innerHTML = "";
							wrapperIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>`;
							that.showReplies = false;
						}
					}


				setTimeout(async () => {

					const handleLikeCommentRequest = async () => {
						const url = "/SGU_SOCIAL_NETWORK/api/like_comment/like";
						const send_data = {
							commentID: that.data.id,
							userID: getCookieGlobal("id")
						};

						return new Promise((resolve, reject) => {
							const xhr = new XMLHttpRequest();
							xhr.open("POST", url, true);

							xhr.setRequestHeader("Content-Type", "application/json");
							xhr.setRequestHeader("Authorization", `${that.getCookieGlobalPlus("token")}`);

							xhr.onreadystatechange = function() {
								if (xhr.readyState === 4) {
									if (xhr.status === 200) {
										try {
											const data = JSON.parse(xhr.responseText);
											that.isLikeComment = true;
											resolve(data);
										} catch (error) {
											console.log("JSON parsing error:", error);
											reject(error);
										}
									} else {
										console.log("Request failed with status:", xhr.status);
										reject(new Error(`Error: ${xhr.statusText}`));
									}
								}
							}.bind(this);

							xhr.send(JSON.stringify(send_data));
						});
					}

					const handleDisLikeCommentRequest = async () => {
						const url = "/SGU_SOCIAL_NETWORK/api/like_comment/dislike";
						const send_data = {
							commentID: that.data.id,
							userID: getCookieGlobal("id")
						};

						return new Promise((resolve, reject) => {
							const xhr = new XMLHttpRequest();
							xhr.open("POST", url, true);

							xhr.setRequestHeader("Content-Type", "application/json");
							xhr.setRequestHeader("Authorization", `${that.getCookieGlobalPlus("token")}`);

							xhr.onreadystatechange = function() {
								if (xhr.readyState === 4) {
									if (xhr.status === 200) {
										try {
											const data = JSON.parse(xhr.responseText);
											that.isLikeComment = false;
											resolve(data);
										} catch (error) {
											console.log("JSON parsing error:", error);
											reject(error);
										}
									} else {
										console.log("Request failed with status:", xhr.status);
										reject(new Error(`Error: ${xhr.statusText}`));
									}
								}
							}.bind(this);

							xhr.send(JSON.stringify(send_data));
						});
					}

					const btnLikeComment = $(`#wrapperLikeComment-${that.data.id}`)

					btnLikeComment.onclick = async () => {
						if (!that.isLikeComment) {
							await handleLikeCommentRequest().then(async () => {
								that.actionLike();
								await that.fetchLikeComment().then(() => {
									const countLike = $(`#global_post-total_like-${that.data.id}`);

									countLike.innerHTML = that.listLikeComment.length;
								})
							})
						} else {
							await handleDisLikeCommentRequest().then(async () => {
								that.actionDisLike();

								await that.fetchLikeComment().then(() => {
									const countLike = $(`#global_post-total_like-${that.data.id}`);
									countLike.innerHTML = that.listLikeComment.length;
								})


							})
						}
					}


					await that.fetchCheckLikeComment().then(() => {
						if (that.isLikeComment) {
							that.actionLike();
						}
					}).then(async () => {
						await that.fetchLikeComment();
						if (that.listLikeComment && that.listLikeComment.length > 0) {
							const countLike = $(`#global_post-total_like-${that.data.id}`);
							countLike.innerHTML = that.listLikeComment.length;
						}
					});
				}, that.data.timeDelay * 30 * 2.9)

				clearInterval(intervalID);
			}
		}, 9)
	}

	actionLike() {
		const that = this;
		const wrapperLikeComment = $(`#wrapperLikeComment-${that.data.id}`)
		wrapperLikeComment.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" fill="rgb(32, 120, 244)"/></svg>`;

	}

	actionDisLike() {
		const that = this;
		const wrapperLikeComment = $(`#wrapperLikeComment-${that.data.id}`)
		wrapperLikeComment.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"/></svg>`;
	}


	async render() {
		const that = this;

		await this.fetchComment().then(async () => {
			await that.addEvent();
		});


		return `
	            <div id="CommentItem_${this.data.id}" class="comment_wrapper">
	                <div class="inner-top">
	                    <div class="comment-left">
	                        <div class="avata">
	                           <a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.userID}"> <img class="avt ${this.data.modeReply ? `reply` : ``}" src="${this.data.image}" alt="" /> </a>
	                        </div>
	                    </div>
	                    <div class="comment-right">
	                        <div class="info">
	                           <a href="/SGU_SOCIAL_NETWORK/Profile.jsp?page=recommend&id=${that.data.userID}"> <span class="string-formatted strong small">${this.data.name}</span> </a>
	                            <span class="string-fomatted"> </span>
	                            <span class="string-formatted very-small blur">${this.data.createAt}</span>
	                        </div>
	                        <div class="content">${this.data.content}</div>
	                    </div>
	                </div>
	                <div class="inner-bottom">
	                    <div class="controls">
	                        <div>
	                            <button id="wrapperLikeComment-${that.data.id}" class="like">
	                                <div class="icon">
	                                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"/></svg>
	                                </div>
	                            </button>
	                            <span id='global_post-total_like-${that.data.id}' class="string-fomatted">${this.data.likes}</span>
	                        </div>
	                        <button id="btn-reply" class="btn reply">Phản hồi</button>
	                    </div>
	                    
	                    <div class="wrapper-comment__write"></div>
	                    <div id="comment_item-render_list_comment-${this.data.id}">
		                    ${parseInt(this.data.replies) > 0 ? `
			                <div class="replies">
			                	<div class="reply-header">
			                		<button id="btnShowReply" class="btn transparent show-reply">
			                			<div class="icon">
			                				<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
			                			</div> <span id="comment_item-count_reply-${this.data.id}">${this.data.replies} </span> <span> phản hồi</span></button>
			                	</div>
			                </div>` : ""}
			            </div>
	                    <div class="wrapper-list__reply"></div>
	                </div>	                
	            </div>
	       		`;
	}
}

