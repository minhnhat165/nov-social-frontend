import React from 'react';

const OnlineStatus = ({ active, showText = true }) => {
	return (
		<div className="flex items-center gap-1">
			<div
				className={`relative h-3 w-3 shrink-0 rounded-full ${
					active ? 'bg-sky-500' : 'bg-red-400'
				}`}
			></div>
			{showText && (
				<span className="text-sm dark:text-dark-text-light">
					{active ? 'Online' : 'Offline'}
				</span>
			)}
		</div>
	);
};

export default OnlineStatus;
