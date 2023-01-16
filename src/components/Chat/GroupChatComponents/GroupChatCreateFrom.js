import { useEffect, useState } from 'react';
import Box from '../../Box';
import Button from '../../ButtonOld';
import SelectUser from './SelectUser';

const GroupChatCreateForm = ({ onSubmit }) => {
	const [members, setMembers] = useState([]);
	const [groupName, setGroupName] = useState('');
	const handleSubmit = () => {
		const data = {
			name: groupName,
			users: JSON.stringify(members.map((member) => member._id)),
		};
		onSubmit(data);
	};

	useEffect(() => {
		return () => {
			setMembers([]);
			setGroupName('');
		};
	}, []);
	return (
		<Box
			header={
				<span>
					Create group<span className="text-primary"> chat</span>
				</span>
			}
		>
			<div className="flex w-96 flex-col gap-4 p-4">
				<div className="rounded-xl px-4 py-2 dark:bg-dark-light">
					<input
						type="text"
						placeholder="Group name"
						className="w-full bg-transparent placeholder-[#4e6183] outline-none
                    dark:text-dark-text-regular"
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
					></input>
				</div>
				<SelectUser setResult={setMembers} />
				<div className="relative z-0">
					<Button
						className="w-full flex-1 p-2 disabled:bg-slate-400"
						primary
						disabled={!(groupName.trim() && members.length > 0)}
						onClick={handleSubmit}
					>
						Create
					</Button>
				</div>
			</div>
		</Box>
	);
};

export default GroupChatCreateForm;
