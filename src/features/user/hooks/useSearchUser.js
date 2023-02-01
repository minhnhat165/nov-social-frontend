import { useState } from 'react';

const { searchUsers } = require('api/userApi');
const { useMutation } = require('react-query');

const useSearchUsers = () => {
	const [users, setUsers] = useState([]);

	const {
		mutate,
		isLoading,
		isSuccess,
		reset: resetFn,
	} = useMutation(searchUsers, {
		onSuccess: (data) => {
			setUsers(data.users);
		},

		onError: (error) => {
			console.log(error);
		},
	});
	const reset = () => {
		resetFn();
		setUsers([]);
	};

	return { searchUsersFn: mutate, isLoading, isSuccess, reset, users };
};
export default useSearchUsers;
