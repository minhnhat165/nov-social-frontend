import { search } from 'api/searchApi';
import { useState } from 'react';
const { useMutation } = require('react-query');

const useSearch = () => {
	const [result, setResult] = useState([]);

	const {
		mutate,
		isLoading,
		isSuccess,
		reset: resetFn,
	} = useMutation(search, {
		onSuccess: (data) => {
			setResult(data.searches);
		},

		onError: (error) => {
			console.log(error);
		},
	});
	const reset = () => {
		resetFn();
		setResult([]);
	};

	return { searchFn: mutate, isLoading, isSuccess, reset, data: result };
};
export default useSearch;
