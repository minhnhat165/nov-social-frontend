import { search as api } from 'api/searchApi';
import { useQuery } from 'react-query';
import { useState } from 'react';

const useSearchMain = () => {
	const [search, setSearch] = useState('');
	const { data, isLoading, isFetching } = useQuery(
		['searchMain', search],
		() =>
			api({
				query: search,
				limit: 10,
			}),
		{
			onError: (error) => {
				console.log(error);
			},
			enabled: search.trim().length > 0,
			staleTime: 1000 * 60 * 30, // 30 minutes
		},
	);

	return {
		data: data?.searches || [],
		isLoading,
		search,
		setSearch,
		isFetching,
	};
};

export default useSearchMain;
