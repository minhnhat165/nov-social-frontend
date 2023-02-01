import React from 'react';

const ChatItemLoading = () => {
	return (
		<div className="flex w-full items-center gap-2 p-2">
			<div className="h-10 w-10 rounded-full bg-dark-light"></div>
			<div className="flex flex-col gap-2">
				<div className="h-3 w-28 rounded-xl dark:bg-dark-light"></div>
				<div className="h-3 w-10 rounded-xl dark:bg-dark-light"></div>
			</div>
			<div className="ml-auto mt-1 self-start">
				<div className="h-3 w-10 rounded-xl dark:bg-dark-light"></div>
			</div>
		</div>
	);
};

export default ChatItemLoading;
