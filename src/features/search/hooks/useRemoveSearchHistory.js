import { deleteSearchLog } from 'api/searchApi';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { removeSearchHistory } from 'store/slices/searchHistorySlice';

const useRemoveSearchHistory = () => {
	const dispatch = useDispatch();
	const { mutate } = useMutation(deleteSearchLog);
	return (id) => {
		dispatch(removeSearchHistory(id));
		mutate(id);
	};
};

export default useRemoveSearchHistory;
