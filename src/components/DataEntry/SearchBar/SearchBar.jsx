import { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useDebounce from 'hooks/useDebounce';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { SearchIcon, XCircleIcon } from 'components/Icon';
import { Spinner } from 'components/Loading/Spinner';

const SearchBar = ({
	placeholder,
	loading,
	onChange,
	onSearch = () => {},
	children,
}) => {
	const ref = useRef();
	const inputRef = useRef();

	const [isFocused, setIsFocused] = useState(false);
	useOnClickOutside(ref, () => {
		setIsFocused(false);
	});
	const [value, setValue] = useState('');
	const debouncedValue = useDebounce(value, 500);
	useEffect(() => {
		onChange(debouncedValue.trim());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue]);

	const handleClear = () => {
		setValue('');
		inputRef.current.focus();
	};

	const handleSearch = () => {
		if (value.trim()) onSearch(value);
	};

	return (
		<div
			className="relative h-10 w-full"
			ref={ref}
			onClick={() => setIsFocused(true)}
		>
			<div
				className={clsx(
					'absolute top-0 w-full overflow-hidden rounded-xl  transition-all duration-500',
					isFocused
						? ' right-0 bg-slate-50 shadow-3xl dark:bg-dark-800'
						: ' right-2 bg-slate-200 dark:bg-dark-700'
				)}
			>
				<div className="relative flex h-10 w-full">
					<SearchButton
						disabled={!value.trim()}
						onClick={handleSearch}
					/>
					<SearchInput
						ref={inputRef}
						placeholder={placeholder}
						value={value}
						onChange={(e) => {
							setValue(e.target.value);
						}}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								handleSearch();
							}
						}}
					/>
					<SearchAction
						loading={loading}
						clearAble={!!value.trim() && !loading}
						onClear={handleClear}
					/>
				</div>
				{isFocused && (
					<>
						<hr className=" mx-auto w-[95%] border-slate-300 dark:border-dark-600" />
						<div className="max-height overflow-y-overlay w-full">
							{children}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

const SearchInput = forwardRef((props, ref) => {
	return (
		<input
			type="text"
			ref={ref}
			className="text-normal h-full w-full border-0 bg-transparent caret-primary-700 outline-none ring-0 focus:ring-0 dark:caret-primary-500"
			{...props}
		/>
	);
});

const SearchButton = ({ onClick, disabled }) => {
	return (
		<div className="flex h-10 w-10 cursor-pointer items-center hover:bg-slate-300 dark:hover:bg-dark-600">
			<button
				onClick={onClick}
				className="flex h-10 w-10 items-center justify-center"
			>
				<SearchIcon
					className={clsx(
						'h-6 w-6 transition-all duration-500',
						disabled
							? 'text-normal'
							: 'text-primary-700 dark:text-primary-500'
					)}
				/>
			</button>
			<div className="h-[65%] w-[1px] bg-slate-400 dark:bg-dark-400"></div>
		</div>
	);
};

const SearchAction = ({ loading, clearAble, onClear }) => {
	return (
		<div className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center ">
			{clearAble && (
				<div
					onClick={(e) => {
						e.stopPropagation();
						onClear();
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

SearchBar.propTypes = {
	placeholder: PropTypes.string,
	loading: PropTypes.bool,
	onChange: PropTypes.func,
};

SearchBar.defaultProps = {
	placeholder: 'Search',
	loading: false,
	onChange: () => {},
};

SearchButton.propTypes = {
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
};

SearchButton.defaultProps = {
	onClick: null,
	disabled: false,
};

SearchInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

SearchInput.defaultProps = {
	placeholder: 'Search',
	value: '',
	onChange: () => {},
};

SearchAction.propTypes = {
	loading: PropTypes.bool,
	clearAble: PropTypes.bool,
	onClear: PropTypes.func,
};

SearchAction.defaultProps = {
	loading: false,
	clearAble: false,
	onClear: () => {},
};

export default SearchBar;
