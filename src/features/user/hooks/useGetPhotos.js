import { getPhotos } from 'api/userApi';
import { useQuery } from 'react-query';

const useGetPhotos = (userId) => {
	const { data, isSuccess, isLoading } = useQuery(
		['photos', userId],
		() => getPhotos({ userId }),
		{
			staleTime: 1000 * 60 * 5, // 5 minutes
			enabled: !!userId,
		},
	);
	return { data: data?.photos, isSuccess, isLoading };
};

export default useGetPhotos;
