import SearchBar from 'features/search/components/SearchBar';
import React from 'react';

const HeaderLeft = () => {
	return (
		<div className="flex h-14 w-80 items-center rounded-xl bg-slate-50 shadow dark:bg-dark-800 desktop:w-96">
			<div className="flex h-14 w-14 items-center justify-center">
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-primary-400 to-primary-900 font-bold text-slate-100">
					N
				</div>
			</div>
			<div className="flex-1 px-2">
				<SearchBar />
			</div>
		</div>
	);
};

export default HeaderLeft;
