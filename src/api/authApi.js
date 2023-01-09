import { axiosClient } from 'configs/axiosConfig';

const URL = '/auth';

const logout = () => axiosClient.get(URL + 'logout');
const checkEmailExists = (email) =>
	axiosClient.post(URL + '/email/exists', { email });
const register = (userData) => axiosClient.post(URL + '/register', userData);
const activeAccount = (token) =>
	axiosClient.post(URL + '/activation', {
		verify_token: token,
	});
const googleLogin = (token) =>
	axiosClient.post(URL + '/login/google', {
		access_token: token,
	});
const facebookLogin = (token) =>
	axiosClient.post(URL + '/login/facebook', {
		access_token: token,
	});
const login = (data) => axiosClient.post(URL + '/login', data);
const sendOtp = (data) => axiosClient.post(URL + 'forgot_password', data);
const confirmOtp = (data) => axiosClient.post(URL + 'confirm_otp', data);
const resetPassword = (data) => axiosClient.post(URL + 'reset_password', data);
const refreshToken = () => axiosClient.post(URL + 'refresh_token');
const getUser = () => axiosClient.get(URL + '/me');

export {
	checkEmailExists,
	logout,
	register,
	activeAccount,
	googleLogin,
	facebookLogin,
	login,
	sendOtp,
	confirmOtp,
	resetPassword,
	refreshToken,
	getUser,
};
