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
		if (
			usersSelected.some((userSelected) => userSelected._id === user._id)
		) {
			return;
		}
		setUsersSelected((prev) => [...prev, user]);
	};

	useEffect(() => {
		setResult(usersSelected);
	}, [usersSelected]);

	return (
		<div className="rounded-xl p-2 dark:bg-dark-light">
			<div>
				<div className="flex">
					<span className="dark:text-dark-text-bold">
						Users selected:
					</span>
				</div>
				{usersSelected.length > 0 && (
					<div className="mb-3 mt-1 flex flex-wrap gap-2">
						{usersSelected.map((member) => (
							<div
								key={member._id}
								className="bg-primary-bold/20 items-center rounded-full px-2 py-1"
							>
								<span className="text-primary text-sm font-bold">
									{member.name}
								</span>
								<i
									className="fa-duotone fa-circle-x text-primary ml-1 cursor-pointer"
									onClick={() => handleRemoveUser(member._id)}
								></i>
							</div>
						))}
					</div>
				)}
			</div>
			<Search
				placeholder="Add members"
				className="mt-2 rounded-xl"
				onClickSearchResult={handleSelectUser}
			/>
		</div>
	);
};

export default SelectUser;
