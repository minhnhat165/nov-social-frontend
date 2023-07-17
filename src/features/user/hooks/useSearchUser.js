const { searchUser } = require('api/userApi');
const { useState } = require('react');
const { useQuery } = require('react-query');

const useSearchUser = ({ limit, query: _query = ' ' }) => {
	const [query, setQuery] = useState(_query);
	const { data, isLoading, isFetching } = useQuery(
		['search-user-main', query],
		() =>
			searchUser({
				query,
				limit,
			}),
		{
			enabled: query.length > 0,
			staleTime: 1000 * 60 * 60 * 24,
		},
	);

	return { data: data?.data, isLoading, isFetching, setQuery };
};

export default useSearchUser;
