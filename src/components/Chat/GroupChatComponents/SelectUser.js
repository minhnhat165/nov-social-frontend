import React, { useEffect, useState } from 'react';
import Search from '../../Search';

const SelectUser = ({ userListIgnore = [], setResult }) => {
	const [usersSelected, setUsersSelected] = useState([]);
	const handleRemoveUser = (id) => {
		setUsersSelected((prev) => prev.filter((user) => user._id !== id));
	};

	const handleSelectUser = (user) => {
		if (userListIgnore.some((member) => member._id === user._id)) {
			return;
		}
		if (usersSelected.some((userSelected) => userSelected._id === user._id)) {
			return;
		}
		setUsersSelected((prev) => [...prev, user]);
	};

	useEffect(() => {
		setResult(usersSelected);
	}, [usersSelected]);

	return (
		<div className="rounded-lg p-2 dark:bg-dark-light">
			<div>
				<div className="flex">
					<span className="dark:text-dark-text-bold">Users selected:</span>
				</div>
				{usersSelected.length > 0 && (
					<div className="mb-3 mt-1 flex flex-wrap gap-2">
						{usersSelected.map((member) => (
							<div
								key={member._id}
								className="items-center rounded-full bg-primary-bold/20 px-2 py-1"
							>
								<span className="text-sm font-bold text-primary">
									{member.name}
								</span>
								<i
									className="fa-duotone fa-circle-x ml-1 cursor-pointer text-primary"
									onClick={() => handleRemoveUser(member._id)}
								></i>
							</div>
						))}
					</div>
				)}
			</div>
			<Search
				placeholder="Add members"
				className="mt-2 rounded-lg"
				onClickSearchResult={handleSelectUser}
			/>
		</div>
	);
};

export default SelectUser;
