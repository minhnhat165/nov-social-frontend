import React, { useMemo, useState } from 'react';
import Box from '../../Box';
import Button from '../../ButtonOld';
import SelectUser from './SelectUser';

const GroupChatAddMember = ({ conversation, onSubmit, onCancel }) => {
	const members = useMemo(() => {
		return conversation.users;
	}, [conversation.users]);

	const [usersSelected, setUsersSelected] = useState([]);

	const handleSubmit = async () => {
		await onSubmit(usersSelected);
		setUsersSelected([]);
	};
	return (
		<Box header={<span>Add people</span>}>
			<div className="flex w-96 flex-col gap-2 p-2">
				<SelectUser
					setResult={setUsersSelected}
					userListIgnore={members}
				/>
				<div className="flex justify-end gap-2">
					<Button
						onClick={onCancel}
						className="hover-brightness bg-dark-very-light p-2 dark:text-dark-text-regular"
					>
						Cancel
					</Button>
					<Button p-2 primary w-16 onClick={handleSubmit}>
						Add
					</Button>
				</div>
			</div>
		</Box>
	);
};

export default GroupChatAddMember;
