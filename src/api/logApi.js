import { axiosClient } from 'configs/axiosConfig';

const URL = '/logs';
const getSearchLog = () => axiosClient.get(URL + '/search');
export { getSearchLog };
