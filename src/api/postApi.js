// import { axiosClientPrivate, setHeader } from 'configs/axiosConfig';

const { axiosClient } = require('configs/axiosConfig');

const URL = '/posts';

export const getPosts = (limit = 10, lastCreatedAt) =>
	axiosClient.get(
		URL +
			`?limit=${limit}${
				lastCreatedAt ? `&lastCreatedAt=${lastCreatedAt}` : ''
			}`,
	);
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

const postApi = {
	create: createPost,
	getPosts,
	deletePost,
	updatePost,
};
export default postApi;
