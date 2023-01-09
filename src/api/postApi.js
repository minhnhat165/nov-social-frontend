// import { axiosClientPrivate, setHeader } from 'configs/axiosConfig';

// const URL = 'post/';

// const getPosts = (endPoint = '', limit = 2) =>
// 	axiosClientPrivate.get(URL + `?endPoint=${endPoint}&limit=${limit}`, {
// 		headers: setHeader(),
// 	});
// const getPost = (postId) =>
// 	axiosClientPrivate.get(URL + `${postId}`, {
// 		headers: setHeader(),
// 	});
// const getPostsByUserId = (userId) =>
// 	axiosClientPrivate.get(URL + `user/${userId}`, {
// 		headers: setHeader(),
// 	});

// const createPost = (data) =>
// 	axiosClientPrivate.post(URL, data, {
// 		headers: setHeader(),
// 	});

// const updatePost = (data, id) =>
// 	axiosClientPrivate.put(URL + `${id}`, data, {
// 		headers: setHeader(),
// 	});

// const deletePost = (id) =>
// 	axiosClientPrivate.delete(URL + `${id}`, {
// 		headers: setHeader(),
// 	});

// const likePost = (id) =>
// 	axiosClientPrivate.patch(URL + `like/${id}`, {}, { headers: setHeader() });
// const getUsersLikePost = (postId, limit = 0) =>
// 	axiosClientPrivate.get(URL + `${postId}/like?&limit=${limit}`, {
// 		headers: setHeader(),
// 	});
// const getUsersCmtPost = (postId, limit = 0) =>
// 	axiosClientPrivate.get(URL + `${postId}/comment/user?&limit=${limit}`, {
// 		headers: setHeader(),
// 	});

// export {
// 	getPosts,
// 	getPost,
// 	getPostsByUserId,
// 	createPost,
// 	updatePost,
// 	deletePost,
// 	likePost,
// 	getUsersLikePost,
// 	getUsersCmtPost,
// };

// // export default postApi;
