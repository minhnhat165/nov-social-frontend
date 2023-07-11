const { axiosClient } = require('configs/axiosConfig');

const URL = '/comments';

export const createComment = (data) => axiosClient.post(URL, data);

export const getChildComments = (id) => axiosClient.get(`${URL}/${id}/child`);

export const getCommentWithRelatedData = (id) =>
	axiosClient.get(`${URL}/${id}?relatedData=true`);

export const updateComment = ({ _id, ...data }) =>
	axiosClient.patch(`${URL}/${_id}`, {
		...data,
	});

export const deleteComment = (id) => axiosClient.delete(`${URL}/${id}`);

export const likeComment = (id) => axiosClient.patch(`${URL}/${id}/like`);

export const unlikeComment = (id) => axiosClient.patch(`${URL}/${id}/unlike`);

export const hidePost = (id) => axiosClient.patch(`${URL}/${id}/hide`);

export const unhidePost = (id) => axiosClient.patch(`${URL}/${id}/unhide`);

export const savePost = (id) => axiosClient.patch(`${URL}/${id}/save`);

export const unSavePost = (id) => axiosClient.patch(`${URL}/${id}/unsave`);

const commentApi = {
	create: createComment,
};
export default commentApi;
