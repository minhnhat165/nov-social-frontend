const { axiosClient } = require('configs/axiosConfig');

const URL = '/bookmark';

export const getBookmarks = ({ limit, cursor }) =>
	axiosClient.get(
		URL + `?limit=${limit}` + (cursor ? `&cursor=${cursor}` : ''),
	);
