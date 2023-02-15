import { axiosClient } from 'configs/axiosConfig';

const URL = '/search';
const search = ({ query, limit = 10 }) =>
	axiosClient.get(URL + `?q=${query}&limit=${limit}`);
const getSearchLog = ({ limit = 10 }) =>
	axiosClient.get(URL + '/log?limit=' + limit);
const saveSearchLog = ({ type, text, data }) =>
	axiosClient.post(URL + '/log', {
		type,
		text,
		data,
	});
const searchInterest = ({ query, limit = 10, category }) =>
	axiosClient.get(
		URL +
			'/interest?q=' +
			query +
			'&limit=' +
			limit +
			(category ? '&category=' + category : ''),
	);

const deleteSearchLog = (searchId) =>
	axiosClient.delete(URL + '/log/' + searchId);

export { search, getSearchLog, saveSearchLog, deleteSearchLog, searchInterest };
