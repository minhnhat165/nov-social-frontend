import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export function useAsync(func, dependencies = []) {
	const { execute, ...state } = useAsyncInternal(func, dependencies, true);

	useEffect(() => {
		execute();
	}, [execute]);

	return state;
}

export function useAsyncFn(func, dependencies = []) {
	return useAsyncInternal(func, dependencies, false);
}

function useAsyncInternal(func, dependencies, initialLoading = false) {
	const [loading, setLoading] = useState(initialLoading);
	const [error, setError] = useState();
	const [value, setValue] = useState();

	const execute = useCallback((...params) => {
		setLoading(true);
		return func(...params)
			.then((data) => {
				setValue(data.data);
				setError(undefined);
				return data.data;
			})
			.catch((error) => {
				toast.error(
					error?.response?.data?.msg || 'something went wrong'
				);
				setError(error);
				setValue(undefined);
				return Promise.reject(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, dependencies);
	return { loading, error, value, execute };
}
