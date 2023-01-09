import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchUsers } from '../api/userApi';
import { useAsyncFn } from '../hooks/useAsync';
import useDebounce from '../hooks/useDebounce';
import AccountQuickView from './AccountQuickView';
import { verticalResize } from './Animate/variants';
import Popover from './Popover';
import { Spinner } from './Spinner';
const Search = ({
	linkPrefix = 'profile',
	placeholder = 'Search',
	className,
	onClickSearchResult,
}) => {
	const accessToken = useSelector((state) => state.auth.accessToken);
	const [searchValue, setSearchValue] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const debouncedValue = useDebounce(searchValue, 500);
	const inputRef = useRef();
	const navigate = useNavigate();
	const [isFocused, setIsFocused] = useState(false);

	const searchFn = useAsyncFn(searchUsers);

	useEffect(() => {
		if (!debouncedValue.trim()) {
			setSearchResult([]);
			return;
		}
		searchFn.execute(debouncedValue, accessToken).then((data) => {
			setSearchResult(data.data);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue]);

	const handleClearSearch = (e) => {
		setSearchValue('');
		setSearchResult([]);
		inputRef.current.focus();
	};

	const handleClickSearchResult = (user) => {
		if (onClickSearchResult) {
			onClickSearchResult(user);
			return;
		}
		navigate(`/${linkPrefix}/${user._id}`);
	};

	return (
		<Popover
			visible={isFocused}
			onHide={() => setIsFocused(false)}
			animate={verticalResize}
			className="mt-0 w-full origin-top rounded-t-none border-t shadow-md dark:bg-[#2f3b50]"
			render={
				<div>
					<div className="py-2 px-4">
						<span className="text-sm dark:text-dark-text-regular">
							<i className="fa-regular fa-clock"></i> History
						</span>
					</div>
					{searchValue.trim() && (
						<div className="border-t border-dark-border p-2">
							{searchResult?.length > 0 && (
								<div>
									{searchResult.map((user) => (
										<div
											key={user._id}
											className="group relative rounded-xl  dark:hover:bg-dark-light"
											onClick={() =>
												handleClickSearchResult(user)
											}
										>
											<AccountQuickView user={user} />
										</div>
									))}
								</div>
							)}
							<div className="px-2">
								<span className="text-sm dark:text-dark-text-regular">
									<i className="fa-regular fa-magnifying-glass"></i>{' '}
									Search for{' '}
									<span className="text-primary-bold">
										{searchValue}
									</span>
								</span>
							</div>
						</div>
					)}
				</div>
			}
		>
			<div
				onClick={() => setIsFocused(true)}
				className={` group flex h-10 w-full items-center justify-between 
           overflow-hidden rounded-xl border border-transparent px-4 py-2 dark:bg-dark-very-light
            ${className} ${
					isFocused ? 'rounded-b-none border-dark-border' : ''
				}`}
			>
				<input
					type="text"
					ref={inputRef}
					placeholder={placeholder}
					className="w-full bg-transparent placeholder-[#4e6183] outline-none
                dark:text-dark-text-regular"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					onFocus={() => setIsFocused(true)}
				/>
				{searchValue && (
					<div className="mx-3 flex">
						{searchFn.loading ? (
							<Spinner className="mr-0 -ml-0 h-4 w-4" />
						) : (
							<i
								className="fa-solid fa-circle-xmark cursor-pointer text-slate-400"
								onClick={handleClearSearch}
							></i>
						)}
					</div>
				)}
				<div
					className="relative -mr-4 flex h-12 w-12 shrink-0 cursor-pointer items-center 
                justify-center hover:dark:bg-dark-light/50"
				>
					<div
						className="absolute left-0 top-1/2 h-1/2 w-[1px] -translate-y-1/2 
                dark:bg-dark-border "
					></div>
					<i
						className={`fa-regular fa-magnifying-glass text-xl ${
							searchValue
								? 'dark:text-primary'
								: 'dark:text-[#4e6183]'
						}`}
					></i>
				</div>
			</div>
		</Popover>
	);
};

export default Search;
