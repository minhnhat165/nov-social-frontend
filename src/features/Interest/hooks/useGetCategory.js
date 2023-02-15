import { getInterestCategories } from 'api/interestApi';
import { useQuery } from 'react-query';

const useGetCategories = () => {
	const { data } = useQuery('interestCategories', getInterestCategories, {
		staleTime: Infinity,
	});
	return { data: data?.data };
};

export default useGetCategories;
