import { genQueryParams } from 'utils/genQueryParams';

const { axiosClient } = require('configs/axiosConfig');

const URL = '/feed';

export const getTimeline = ({ limit = 5, lastIndex = null }) => {
	const params = genQueryParams({
		limit,
		lastIndex,
	});
	return axiosClient.get(`${URL}/timeline?${params}`);
};

const feedApi = {
	getTimeline,
};

export default feedApi;
