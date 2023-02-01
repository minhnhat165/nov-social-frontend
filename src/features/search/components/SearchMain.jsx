import SearchBar from 'components/DataEntry/SearchBar';
import Text from 'components/Typography/Text';
import useAddSearchHistory from 'features/search/hooks/useAddSearchHistory';
import useGetSearchLog from 'features/search/hooks/useGetSearchLog';
import useRemoveSearchHistory from 'features/search/hooks/useRemoveSearchHistory';
import useSearch from 'features/search/hooks/useSearch';
import { searchType } from 'features/search/utils/createSearch';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import createSearchHistory from 'utils/createSearchHistory';
import SearchItemList from './SearchItemList';

const SearchMain = () => {
	const [showResult, setShowResult] = useState(false);
	const addSearchHistory = useAddSearchHistory();
	const { searchFn, data, isLoading, reset } = useSearch();
	const navigate = useNavigate();

	const handleOnChange = (value) => {
		if (value === '') {
			setShowResult(false);
			reset();
			return;
		}
		setShowResult(true);
		searchFn({ query: value });
	};

	const handleClickSearchItem = (search) => {
		addSearchHistory(search);
		const { data, type } = search;
		if (type === searchType.KEYWORD) {
			const { keyword } = data;
			navigate(`/search?q=${keyword}`);
			return;
		}
		if (type === searchType.USER) {
			const { user } = data;
			navigate(`/profile/${user._id}`);
			return;
		}
	};

	const handleSearch = (value) => {
		addSearchHistory(
			createSearchHistory(searchType.KEYWORD, value, { keyword: value })
		);
		navigate(`/search?q=${value}`);
	};

	return (
		<SearchBar
			onChange={handleOnChange}
			onSearch={handleSearch}
			loading={isLoading}
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
		</SearchBar>
	);
};

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
				<SearchItemList
					list={searchHistory}
					onClick={onClickItem}
					onRemove={removeSearchHistory}
				/>
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
			<h3 className="text-normal">{title}</h3>
			<div className="flex flex-col gap-2">{children}</div>
		</div>
	);
};

SearchMain.propTypes = {};

export default SearchMain;
