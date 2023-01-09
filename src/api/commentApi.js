// import { axiosClientPrivate, setHeader } from 'configs/axiosConfig';

// const URL = 'comment/';

// const getComments = (postId) =>
// 	axiosClientPrivate.get(URL + `${postId}`, {
// 		headers: setHeader(),
// 	});
// const getReplyComments = (commentId) =>
// 	axiosClientPrivate.get(URL + 'reply/' + commentId, {
// 		headers: setHeader(),
// 	});
// const createComment = (data) =>
// 	axiosClientPrivate.post(URL + 'create', data, {
// 		headers: setHeader(),
// 	});
// const updateComment = (commentId, data) =>
// 	axiosClientPrivate.put(URL + `update/${commentId}`, data, {
// 		headers: setHeader(),
// 	});
// const deleteComment = (commentId) =>
// 	axiosClientPrivate.delete(URL + `delete/${commentId}`, {
// 		headers: setHeader(),
// 	});
// const likeComment = (commentId) =>
// 	axiosClientPrivate.patch(
// 		URL + `like/${commentId}`,
// 		{},
// 		{ headers: setHeader() }
// 	);
// export {
// 	getComments,
// 	getReplyComments,
// 	createComment,
// 	updateComment,
// 	deleteComment,
// 	likeComment,
// };
