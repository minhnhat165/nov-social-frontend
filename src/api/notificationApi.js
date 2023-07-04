import { genQueryParams } from 'utils/genQueryParams';

const { axiosClient } = require('configs/axiosConfig');

const URL = '/notifications';

export const getNotifications = ({ limit, cursor, isRead }) => {
	const paramSting = genQueryParams({
		limit: limit || 10,
		cursor: cursor || null,
		isRead: isRead === undefined ? null : isRead,
	});
	return axiosClient.get(`${URL}?${paramSting}`);
};

export const markNotificationAsRead = (id) => {
	return axiosClient.patch(`${URL}/${id}/read`);
};

export const markAllNotificationAsRead = () => {
	return axiosClient.patch(`${URL}/read-all`);
};

export const deleteNotification = (id) => {
	return axiosClient.delete(`${URL}/${id}`);
};

const notificationApi = {
	getNotifications,
	markNotificationAsRead,
	markAllNotificationAsRead,
	deleteNotification,
};

export default notificationApi;
