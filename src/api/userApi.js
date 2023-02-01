import { axiosClient } from 'configs/axiosConfig';

const URL = '/users';

const getProfile = (id) => axiosClient.get(URL + `/profile/${id}`);

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
	// getUser,
	// updateUser,
	// getUserInfo,
	// followUser,
	// getSuggestionsUser,
	// getFollowings,
	// getUserPhotos,
	// getFollowers,
};
