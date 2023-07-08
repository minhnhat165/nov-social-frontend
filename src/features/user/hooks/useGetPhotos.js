import { getPhotos } from 'api/userApi';
import { useInfiniteQuery } from 'react-query';
import { useMemo } from 'react';
import { useScreenMode } from 'hooks/useScreenMode';

const useGetPhotos = (userId) => {
	const { isMobile } = useScreenMode();
	const {
		data,
		hasNextPage,
		fetchNextPage,
		isLoading,
		refetch,
		isRefetching,
	} = useInfiniteQuery(
		['photos', userId],
		({ pageParam }) =>
			getPhotos({
				userId,
				endCursor: pageParam,
				limit: isMobile ? 5 : 10,
			}),
		{
			staleTime: 1000 * 60 * 5, // 5 minutes
			enabled: !!userId,
			getNextPageParam: (lastPage) => {
				const { hasNextPage, endCursor } = lastPage.data;
				if (!hasNextPage) return undefined;
				return endCursor;
			},
		},
	);
	const photos = useMemo(() => {
		if (!data) return [];
		const pages = data.pages;
		return pages.reduce((acc, page) => {
			return [...acc, ...page.data.items];
		}, []);
	}, [data]);

	return {
		data: photos,
		isLoading,
		fetchNextPage,
		hasNextPage,
		refetch,
		isRefetching,
	};
};

export default useGetPhotos;
