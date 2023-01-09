import React from 'react';
import Header from './Header';
import Menu from './Menu';
const ChatRightSide = ({ conversation }) => {
	return (
		<div className="scrollAble flex h-full w-full flex-col py-4 px-6 dark:bg-dark-semiBold">
			<Header conversation={conversation} />
			<Menu conversation={conversation} />
		</div>
	);
};

export default ChatRightSide;
