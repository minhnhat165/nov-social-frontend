// import { axiosClientPrivate, setHeader } from 'configs/axiosConfig';

// const URL = 'user/';

// const searchUsers = (data) =>
// 	axiosClientPrivate.get(URL + `search/${data}`, {
// 		headers: setHeader(),
// 	});

// const getSuggestionsUser = () =>
// 	axiosClientPrivate.get(URL + 'suggestionsUser', {
// 		headers: setHeader(),
// 	});

// const followUser = (id) =>
// 	axiosClientPrivate.patch(
// 		URL + `follow/${id}`,
// 		{},
// 		{ headers: setHeader() }
// 	);

// const getUser = () =>
// 	axiosClientPrivate.get(URL, {
// 		headers: setHeader(),
// 	});

// const getUserInfo = (id) =>
// 	axiosClientPrivate.get(URL + `profile/${id}`, {
// 		headers: setHeader(),
// 	});

// const updateUser = (data) =>
// 	axiosClientPrivate.patch(URL + `update`, data, {
// 		headers: setHeader(),
// 	});

// const getFollowings = (userId, limit = 0) =>
// 	axiosClientPrivate.get(URL + `${userId}/following?&limit=${limit}`, {
// 		headers: setHeader(),
// 	});
// const getFollowers = (userId, limit = 0) =>
// 	axiosClientPrivate.get(URL + `${userId}/follower?&limit=${limit}`, {
// 		headers: setHeader(),
// 	});
// const getUserPhotos = (userId, limit = 0) =>
// 	axiosClientPrivate.get(URL + `${userId}/photo?&limit=${limit}`, {
// 		headers: setHeader(),
// 	});

// export {
// 	getUser,
// 	searchUsers,
// 	updateUser,
// 	getUserInfo,
// 	followUser,
// 	getSuggestionsUser,
// 	getFollowings,
// 	getUserPhotos,
// 	getFollowers,
// };
