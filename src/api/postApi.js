import { genQueryParams } from 'utils/genQueryParams';

export const { axiosClient } = require('configs/axiosConfig');

export const URL = '/posts';

export const getPosts = (limit = 10, lastCreatedAt) =>
	axiosClient.get(
		URL +
			`?limit=${limit}${
				lastCreatedAt ? `&lastCreatedAt=${lastCreatedAt}` : ''
			}`,
	);
export const getPost = (id) => {
	return axiosClient.get(`${URL}/${id}?`);
};
export const getPostsByUserId = ({ userId, cursor = null, limit = 10 }) => {
	const queryString = genQueryParams({ cursor, limit });
	return axiosClient.get(`${URL}/user/${userId}?${queryString}`);
};

export const getPostComments = ({ id, cursor = null, limit = 10 }) => {
	const queryString = genQueryParams({ cursor, limit });
	return axiosClient.get(`${URL}/${id}/comments?${queryString}`);
};
export const createPost = (data) => axiosClient.post(URL, data);
export const updatePost = ({ _id, ...data }) =>
	axiosClient.patch(`${URL}/${_id}`, {
		...data,
	});

export const deletePost = (id) => axiosClient.delete(`${URL}/${id}`);

export const likePost = (id) => axiosClient.patch(`${URL}/${id}/like`);

export const unlikePost = (id) => axiosClient.patch(`${URL}/${id}/unlike`);

export const hidePost = (id) => axiosClient.patch(`${URL}/${id}/hide`);

export const unhidePost = (id) => axiosClient.patch(`${URL}/${id}/unhide`);

export const savePost = (id) => axiosClient.patch(`${URL}/${id}/save`);

export const unSavePost = (id) => axiosClient.patch(`${URL}/${id}/unsave`);

export const getUsersLikedPost = ({ id, cursor = null, limit = 10 }) => {
	const queryString = genQueryParams({ cursor, limit });
	return axiosClient.get(`${URL}/${id}/users/liked?${queryString}`);
};

export const getUsersCommentedPost = ({ id, cursor = null, limit = 10 }) => {
	const queryString = genQueryParams({ cursor, limit });
	return axiosClient.get(`${URL}/${id}/users/commented?${queryString}`);
};

const postApi = {
	create: createPost,
	getPosts,
	deletePost,
	updatePost,
	getPostComments,
	getPostsByUserId,
};
export default postApi;
