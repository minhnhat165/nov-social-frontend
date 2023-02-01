const { getSearchLog } = require('api/logApi');
const { useState } = require('react');
const { useMutation } = require('react-query');
export const typeSearchLog = {
	user: 'users',
	keyword: 'keywords',
};
const useSearchLog = () => {
	const [users, setUsers] = useState([]);
	const [keywords, setKeywords] = useState([]);

	const removeUser = (userId) => {
		setUsers(users.filter((user) => user._id !== userId));
	};

	const addUser = (user) => {
		if (users.find((u) => u._id === user._id)) return;
		setUsers((prev) => [...prev, user]);
	};

	const addKeyword = (keyword) => {
		if (keywords.includes(keyword)) return;
		setKeywords((prev) => [...prev, keyword]);
	};

	const removeKeyword = (keyword) => {
		setKeywords(keywords.filter((k) => k !== keyword));
	};

	const {
		mutate: get,
		isLoading,
		isError,
		error,
	} = useMutation(getSearchLog, {
		onSuccess: (data) => {
			const searchLog = data.searchLog;
			setUsers(searchLog.users);
			setKeywords(searchLog.keywords);
		},
	});

	return {
		users,
		keywords,
		removeUser,
		addUser,
		addKeyword,
		removeKeyword,
		get,
		isLoading,
		isError,
		error,
	};
};

export default useSearchLog;
