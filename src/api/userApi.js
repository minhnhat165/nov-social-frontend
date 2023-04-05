import { axiosClient } from 'configs/axiosConfig';

const URL = '/users';

const getTopRankers = ({ limit = 7 }) =>
	axiosClient.get(URL + `/top-ranked?limit=${limit}`);

const searchUser = ({ query, limit, page }) =>
	axiosClient.get(
		URL +
			`/search?q=${query}` +
			(limit ? `&limit=${limit}` : '') +
			(page ? `&page=${page}` : ''),
	);

const getMentions = ({ query }) =>
	axiosClient.get(URL + `/mentions?q=${query}`);

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

const updateProfile = (data) =>
	axiosClient.patch(URL + `/profile`, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

const getRecommendations = ({ limit = 3 }) =>
	axiosClient.get(URL + `/recommendations?limit=${limit}`);

export {
	getProfile,
	updateProfile,
	followUser,
	unFollowUser,
	getPhotos,
	searchUser,
	getMentions,
	getTopRankers,
	getRecommendations,
};
