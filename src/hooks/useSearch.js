const { useMutation } = require('react-query');

const useSearch = (searchTerm, data) => {
	return useMutation((api) => api, {
		onSuccess: (data) => {
			console.log(data);
		},
	});
};

export default useSearch;
