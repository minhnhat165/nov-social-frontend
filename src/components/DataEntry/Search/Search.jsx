import { SearchIcon, XCircleIcon } from 'components/Icon';
import { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { Spinner } from 'components/Loading';
import clsx from 'clsx';
import useDebounce from 'hooks/useDebounce';
import useOnClickOutside from 'hooks/useOnClickOutside';

export const Search = ({
	className,
	children,
	onClear,
	loading,
	onFocus,
	debounce,
	onChange,
	onSearch = () => {},
	...props
}) => {
	const [inputValue, setInputValue] = useState('');
	const debouncedValue = useDebounce(inputValue, debounce ? 500 : 0);
	const firstRender = useRef(true); // to prevent first render
	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
		onChange && onChange(debouncedValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue]);

	// focus effect
	const ref = useRef();
	const inputRef = useRef();

	const [isFocused, setIsFocused] = useState(false);
	useOnClickOutside(ref, () => {
		setIsFocused(false);
	});
	useEffect(() => {
		if (isFocused) {
			inputRef.current.focus();
		}
		onFocus && onFocus(isFocused);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFocused]);

	const handleSearch = () => {
		if (inputValue.trim()) onSearch(inputValue);
	};

	return (
		<div
			ref={ref}
			className={clsx(
				'w-full overflow-hidden rounded-lg transition-all duration-500',
				isFocused
					? 'bg-slate-50 shadow-3xl dark:bg-dark-800'
					: 'bg-slate-200 dark:bg-dark-700',
				className,
			)}
			onClick={() => setIsFocused(true)}
			{...props}
		>
			<div className="relative flex h-10 justify-center">
				<SearchButton
					onClick={handleSearch}
					disabled={loading || !inputValue.trim()}
				/>
				<input
					ref={inputRef}
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					className="mx-2 h-full w-full bg-transparent text-slate-900 outline-none dark:text-slate-100"
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleSearch();
						}
					}}
				/>
				<SearchAction
					clearAble={inputValue.length > 0 && !loading}
					onClear={() => {
						setInputValue('');
						setIsFocused(true);
					}}
					loading={loading}
				/>
			</div>
			{isFocused && children}
		</div>
	);
};

const SearchButton = ({ onClick, disabled }) => {
	return (
		<div className="flex h-10 w-10 items-center">
			<button
				disabled={disabled}
				onClick={(e) => {
					onClick && onClick(e);
				}}
				className="flex h-10 w-10 cursor-pointer items-center justify-center hover:bg-slate-300 dark:hover:bg-dark-600"
			>
				<SearchIcon
					className={clsx(
						'h-6 w-6 transition-all duration-500',
						disabled
							? 'text-normal'
							: 'text-primary-700 dark:text-primary-500',
					)}
				/>
			</button>
			<div className="h-[65%] w-[1px] bg-slate-400 dark:bg-dark-400"></div>
		</div>
	);
};

const SearchAction = ({ loading, clearAble, onClear }) => {
	return (
		<div className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center">
			{clearAble && (
				<div
					onClick={() => {
						onClear && onClear();
					}}
					className="clickable h-6 w-6 rounded-full hover:bg-slate-300 dark:hover:bg-dark-600"
				>
					<XCircleIcon className="p-[3px] text-slate-500 dark:text-dark-300" />
				</div>
			)}
			{loading && <Spinner size="sm" />}
		</div>
	);
};

Search.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	onClear: PropTypes.func,
	loading: PropTypes.bool,
	onFocus: PropTypes.func,
	debounce: PropTypes.bool,
	onChange: PropTypes.func,
};
