import { forwardRef, useState } from 'react';

import { Search } from 'components/DataEntry';
import SearchItem from './SearchItem';
import SearchItemList from './SearchItemList';
import { Text } from 'components/Typography';
import createSearchHistory from 'utils/createSearchHistory';
import { searchType } from 'features/search/utils/createSearch';
import useAddSearchHistory from 'features/search/hooks/useAddSearchHistory';
import useGetSearchLog from 'features/search/hooks/useGetSearchLog';
import { useNavigate } from 'react-router-dom';
import useRemoveSearchHistory from 'features/search/hooks/useRemoveSearchHistory';
import useSearchMain from '../hooks/useSearchMain';
import { useSelector } from 'react-redux';

const SearchMain = forwardRef(({ placeholder, onNavigate, ...props }, ref) => {
	const [showResult, setShowResult] = useState(false);
	const addSearchHistory = useAddSearchHistory();
	const { data, isFetching, isLoading, setSearch } = useSearchMain();

	const navigate = useNavigate();

	const handleOnChange = (value) => {
		if (value === '') {
			setShowResult(false);
			return;
		}
		setSearch(value);
		setShowResult(true);
	};

	const handleClickSearchItem = (search) => {
		addSearchHistory(search);
		const { data, type } = search;
		onNavigate && onNavigate();
		if (type === searchType.KEYWORD) {
			const { keyword } = data;
			navigate(`/search?q=${keyword}`);
			return;
		}
		if (type === searchType.USER) {
			const { user } = data;
			ref.current.blur();
			navigate(`/profile/${user._id}`);
			return;
		}
	};

	const handleSearch = (value) => {
		addSearchHistory(
			createSearchHistory(searchType.KEYWORD, value, { keyword: value }),
		);
		navigate(`/search?q=${value}`);
		onNavigate && onNavigate();
	};

	return (
		<Search
			ref={ref}
			onChange={handleOnChange}
			onSearch={handleSearch}
			loading={isLoading || isFetching}
			placeholder={placeholder}
			autoFocus
			{...props}
		>
			<div className="flex flex-col gap-2 p-2">
				{showResult ? (
					<ResultPanel
						result={data}
						onClickItem={handleClickSearchItem}
					/>
				) : (
					<HistoryPanel onClickItem={handleClickSearchItem} />
				)}
			</div>
		</Search>
	);
});

const HistoryPanel = ({ onClickItem }) => {
	const searchHistory = useSelector((state) => state.searchHistory.data);
	const removeSearchHistory = useRemoveSearchHistory();
	useGetSearchLog();

	return (
		<Panel title="History">
			{searchHistory.length <= 0 ? (
				<Text level={2} className="text-center text-sm">
					No search history
				</Text>
			) : (
				<SearchItem.List>
					{searchHistory.map((item) => (
						<SearchItem
							key={item._id}
							search={item}
							onClick={onClickItem}
							onRemove={removeSearchHistory}
						/>
					))}
				</SearchItem.List>
			)}
		</Panel>
	);
};

const ResultPanel = ({ result, onClickItem }) => {
	return (
		<Panel title="Result">
			{result.length <= 0 ? (
				<Text level={2} className="text-center text-sm">
					No result
				</Text>
			) : (
				<SearchItemList list={result} onClick={onClickItem} />
			)}
		</Panel>
	);
};

const Panel = ({ title, children }) => {
	return (
		<div className="py-2">
			<h3 className="text-normal mb-2 text-lg">{title}</h3>
			<div className="flex flex-col gap-2">{children}</div>
		</div>
	);
};

SearchMain.propTypes = {};

export default SearchMain;
