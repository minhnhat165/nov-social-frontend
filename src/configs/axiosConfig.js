import { logout, refreshToken } from 'api/authApi';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import store from 'store';
import { setAccessToken } from 'store/slices/authSlice';
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
	function (response) {
		return response.data;
	},
	function (error) {
		return Promise.reject(error.response.data.error);
	}
);

axiosClient.interceptors.request.use(
	async (config) => {
		// let accessToken = store.getState().auth.accessToken;
		// if (accessToken) {
		// 	const decodeToken = jwtDecode(accessToken);
		// 	const today = new Date();
		// 	if (decodeToken.exp < today.getTime() / 1000) {
		// 		try {
		// 			const res = await refreshToken();
		// 			store.dispatch(setAccessToken(res.data.access_token));
		// 			accessToken = res.data.access_token;
		// 		} catch (error) {
		// 			store.dispatch(logout());
		// 			toast.error('expire login');
		// 		}
		// 	}
		// 	config.headers['Authorization'] = `Bearer ${accessToken}`;
		// }
		return config;
	},
	(error) => {
		return Promise.reject(error.response.data);
	}
);
