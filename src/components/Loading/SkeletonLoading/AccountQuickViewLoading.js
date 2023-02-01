import React from 'react';

const AccountQuickViewLoading = () => {
	return (
		<div className="flex w-full animate-pulse items-center gap-2 p-2">
			<div className="h-10 w-10 rounded-full dark:bg-dark-very-light"></div>
			<div className="mt-2 flex flex-col gap-2">
				<div className="h-3 w-28 rounded-xl dark:bg-dark-very-light"></div>
				<div className="mt-1 h-3 w-10 rounded-xl dark:bg-dark-very-light"></div>
			</div>
			<div className="ml-auto mt-2 self-start">
				<div className="h-3 w-10 rounded-xl dark:bg-dark-very-light"></div>
			</div>
		</div>
	);
};

export default AccountQuickViewLoading;
