import React from 'react';
import { NotificationPanel } from '../components';

const NotificationPage = () => {
	return (
		<div className="h-[calc(100vh_-_96px)] w-screen overflow-hidden sm:flex sm:h-screen sm:justify-center sm:p-4">
			<NotificationPanel />
		</div>
	);
};

export default NotificationPage;
