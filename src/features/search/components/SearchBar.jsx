const SearchBar = () => {
	return (
		<div className="h-10 w-full rounded-full bg-slate-200 dark:bg-dark-700">
			<input
				type="text"
				className="h-full w-full border-0 bg-transparent outline-none ring-0 focus:ring-0 dark:text-white"
			/>
		</div>
	);
};

export default SearchBar;
