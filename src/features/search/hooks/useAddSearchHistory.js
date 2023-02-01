import { saveSearchLog } from 'api/searchApi';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { addSearchHistory } from 'store/slices/searchHistorySlice';

const useAddSearchHistory = () => {
	const dispatch = useDispatch();
	const { mutate } = useMutation(saveSearchLog, {
		onSuccess: (data) => {
			dispatch(addSearchHistory(data.data));
		},
	});
	return mutate;
};

export default useAddSearchHistory;
