import { axiosClient } from 'configs/axiosConfig';

const URL = '/polls';

export const getPoll = (pollId) => axiosClient.get(URL + `/${pollId}`);

export const vote = ({ pollId, optionId }) =>
	axiosClient.patch(URL + `/${pollId}/vote/${optionId}`);
