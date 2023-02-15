import { axiosClient } from 'configs/axiosConfig';

const URL = '/interests';

const getInterestCategories = () => axiosClient.get(URL + '/categories');

export { getInterestCategories };
