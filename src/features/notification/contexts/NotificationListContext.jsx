import React, { createContext, useContext } from 'react';

const NotificationListContext = createContext();

const useNotificationList = () => useContext(NotificationListContext);

const NotificationListProvider = ({ notifications, children }) => {
	return (
		<NotificationListContext.Provider>
			{children}
		</NotificationListContext.Provider>
	);
};

export { useNotificationList, NotificationListProvider };
