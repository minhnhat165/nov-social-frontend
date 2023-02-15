import { axiosClient } from 'configs/axiosConfig';

const URL = '/users';

const getProfile = (id = 'me') => axiosClient.get(URL + `/profile/${id}`);
const followUser = (id) => axiosClient.patch(URL + `/follow/${id}`);
const unFollowUser = (id) => axiosClient.patch(URL + `/unFollow/${id}`);
const getPhotos = ({ userId, limit, page }) =>
	axiosClient.get(
		URL +
			`/${userId}/photos` +
			(limit ? `?limit=${limit}` : '') +
			(page ? `&page=${page}` : ''),
	);

// const getUser = () =>
// 	axiosClientPrivate.get(URL, {
// 		headers: setHeader(),
// 	});

// const getUserInfo = (id) =>
// 	axiosClientPrivate.get(URL + `profile/${id}`, {
// 		headers: setHeader(),
// 	});

const updateProfile = (data) =>
	axiosClient.patch(URL + `/profile`, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

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

export {
	getProfile,
	updateProfile,
	followUser,
	unFollowUser,
	getPhotos,
	// getUser,
	// updateUser,
	// getUserInfo,
	// followUser,
	// getSuggestionsUser,
	// getFollowings,
	// getUserPhotos,
	// getFollowers,
};
