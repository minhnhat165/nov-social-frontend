import { generateParamsString } from 'utils/generateParamsString';

const { axiosClient } = require('configs/axiosConfig');

const URL = '/feed';

export const getTimeline = ({ limit = 5, lastIndex = null }) => {
	const params = generateParamsString({
		limit,
		lastIndex,
	});
	return axiosClient.get(`${URL}/timeline?${params}`);
};

const feedApi = {
	getTimeline,
};

export default feedApi;
