import { genQueryParams } from 'utils/genQueryParams';

const { axiosClient } = require('configs/axiosConfig');

const URL = '/posts';

const getPosts = (limit = 10, lastCreatedAt) =>
	axiosClient.get(
		URL +
			`?limit=${limit}${
				lastCreatedAt ? `&lastCreatedAt=${lastCreatedAt}` : ''
			}`,
	);
const getPost = (id) => {
	return axiosClient.get(`${URL}/${id}?`);
};
const getPostsByUserId = ({ userId, cursor = null, limit = 10 }) => {
	const queryString = genQueryParams({ cursor, limit });
	return axiosClient.get(`${URL}/user/${userId}?${queryString}`);
};

const getPostComments = ({ id, cursor = null, limit = 10 }) => {
	const queryString = genQueryParams({ cursor, limit });
	return axiosClient.get(`${URL}/${id}/comments?${queryString}`);
};
const createPost = (data) => axiosClient.post(URL, data);
const updatePost = ({ _id, ...data }) =>
	axiosClient.patch(`${URL}/${_id}`, {
		...data,
	});

const deletePost = (id) => axiosClient.delete(`${URL}/${id}`);

const likePost = (id) => axiosClient.patch(`${URL}/${id}/like`);

const unlikePost = (id) => axiosClient.patch(`${URL}/${id}/unlike`);

const hidePost = (id) => axiosClient.patch(`${URL}/${id}/hide`);

const unhidePost = (id) => axiosClient.patch(`${URL}/${id}/unhide`);

const savePost = (id) => axiosClient.patch(`${URL}/${id}/save`);

const unSavePost = (id) => axiosClient.patch(`${URL}/${id}/unsave`);

export {
	getPosts,
	getPost,
	getPostComments,
	createPost,
	updatePost,
	deletePost,
	likePost,
	unlikePost,
	hidePost,
	unhidePost,
	savePost,
	unSavePost,
	getPostsByUserId,
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
