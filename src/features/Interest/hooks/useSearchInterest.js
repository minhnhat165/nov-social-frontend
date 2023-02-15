import { searchInterest } from 'api/searchApi';
import { useQuery } from 'react-query';
import { useState } from 'react';

const useSearchInterest = () => {
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('');
	const { data, isLoading, isFetching } = useQuery(
		['searchInterest', search, category],
		() =>
			searchInterest({
				query: search,
				limit: 40,
				category,
			}),
		{
			onError: (error) => {
				console.log(error);
			},
			enabled: search.trim().length > 0,
			staleTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	);

	return {
		data: data?.result || [],
		isLoading,
		search,
		setSearch,
		category,
		setCategory,
		isFetching,
	};
};

export default useSearchInterest;
