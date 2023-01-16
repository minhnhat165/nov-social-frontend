import { axiosClient } from 'configs/axiosConfig';

const URL = '/auth';

const logout = () => axiosClient.delete(URL + '/logout');
const addAccount = ({ email, password }) =>
	axiosClient.post(URL + '/add-existing-account', { email, password });
const switchAccount = (id) => axiosClient.get(URL + `/switch-account/${id}`);
const removeAccount = (id) =>
	axiosClient.delete(URL + `/remove-linked-account/${id}`);
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

const socialLogin = ({ provider, token }) =>
	axiosClient.post(URL + `/login/${provider}`, { access_token: token });
const socialAddAccount = ({ provider, token }) =>
	axiosClient.post(URL + `/add-existing-account/${provider}`, {
		access_token: token,
	});

const login = ({ email, password }) =>
	axiosClient.post(URL + '/login', {
		email,
		password,
	});
const forgotPassword = (email) =>
	axiosClient.post(URL + '/password/forgot', {
		email,
	});
const verifyOTP = ({ email, otp }) =>
	axiosClient.post(URL + '/password/forgot/verify', {
		email,
		otp,
	});
const changePassword = ({ password, verifyToken }) =>
	axiosClient.put(URL + '/password', {
		password: password,
		verify_token: verifyToken,
	});

const getUser = () => axiosClient.get(URL + '/me');

export {
	checkEmailExists,
	logout,
	register,
	activeAccount,
	googleLogin,
	facebookLogin,
	login,
	verifyOTP,
	changePassword,
	getUser,
	forgotPassword,
	socialLogin,
	addAccount,
	removeAccount,
	socialAddAccount,
	switchAccount,
};
