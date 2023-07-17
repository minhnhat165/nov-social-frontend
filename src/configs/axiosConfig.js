import { logout, setAccessToken } from 'store/slices/authSlice';

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import store from 'store';
import { toast } from 'react-hot-toast';

const baseURL = process.env.REACT_APP_API_URL;
export const axiosClient = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
	credentials: 'include',
	withCredentials: true,
});
// add a response interceptor
axiosClient.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		if (error.message === 'Invalid token specified') {
			store.dispatch(logout());
			toast.error('expire login');
			return Promise.reject(error.response.data);
		}
		switch (error.response.status) {
			case 401:
				if (error.response.data.message === 'Invalid token specified') {
					store.dispatch(logout());
					toast.error('expire login');
				}

				break;
			case 403:
				toast.error(
					'You do not have permission to access this resource',
				);
				break;
			case 404:
				window.location.href = '/404';
				break;
			default:
				break;
		}

		return Promise.reject(error.response.data);
	},
);

axiosClient.interceptors.request.use(
	async (config) => {
		let accessToken = store.getState().auth.accessToken;
		if (accessToken) {
			const decodeToken = jwtDecode(accessToken);
			const today = new Date();
			if (decodeToken.exp < today.getTime() / 1000) {
				try {
					const res = await axios.get(
						`${baseURL}/auth/refresh_token`,
						{
							credentials: 'include',
							withCredentials: true,
						},
					);
					accessToken = res.data.access_token;
					store.dispatch(setAccessToken(accessToken));
				} catch (error) {
					if (error.status === 401) {
						store.dispatch(logout());
						toast.error('expire login');
					}
					return Promise.reject(error.response.data);
				}
			}
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error.response.data);
	},
);
