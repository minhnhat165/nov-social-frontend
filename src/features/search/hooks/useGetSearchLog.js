import { getSearchLog } from 'api/searchApi';

const { useQuery } = require('react-query');
const { useSelector, useDispatch } = require('react-redux');
const { setSearchHistory } = require('store/slices/searchHistorySlice');

const useGetSearchLog = () => {
	const loaded = useSelector((state) => state.searchHistory.loaded);
	const dispatch = useDispatch();
	return useQuery('searchHistory', getSearchLog, {
		enabled: !loaded,
		onSuccess: (data) => {
			dispatch(setSearchHistory(data.searches));
		},
	});
};

export default useGetSearchLog;
