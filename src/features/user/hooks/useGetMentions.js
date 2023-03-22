const { getMentions } = require('api/userApi');
const { useState } = require('react');
const { useQuery } = require('react-query');

const useGetMentions = () => {
	const [query, setQuery] = useState('');
	const { data, isLoading, isFetching } = useQuery(
		['getMentions', query],
		() => getMentions({ query }),
		{
			enabled: query.length > 0,

			staleTime: 1000 * 60 * 60 * 24,
		},
	);

	return { mentions: data?.mentions || [], isLoading, isFetching, setQuery };
};

export default useGetMentions;
