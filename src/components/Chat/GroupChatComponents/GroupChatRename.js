import React, { useState } from 'react';
import { useConversation } from '../../../contexts/ConversationContext';
import Box from '../../Box';
import Button from '../../ButtonOld';

const GroupChatRename = ({ chatName, onCancel, onSubmit }) => {
	const { conversation, handleRenameGroup } = useConversation();

	const [renameGroupValue, setRenameGroupValue] = useState(conversation.name);

	const handleKeyDown = async (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			submitRename();
			return;
		}
		if (e.key === 'Escape') {
			e.preventDefault();
			onCancel();
		}
	};

	const submitRename = () => {
		handleRenameGroup(renameGroupValue);
		onSubmit();
	};

	return (
		<Box
			header={
				<span>
					Change name of<span className="text-primary"> Chat</span>
				</span>
			}
		>
			<div className="w-[548px] p-4 dark:text-dark-text-regular">
				<div className="w-full items-center gap-4 px-2">
					<div className="mb-2">Chat name</div>

					<input
						type="text"
						autoFocus
						onFocus={(e) => {
							var val = e.target.value;
							e.target.value = '';
							e.target.value = val;
						}}
						value={renameGroupValue}
						onChange={(e) => setRenameGroupValue(e.target.value)}
						onKeyDown={handleKeyDown}
						className="min-h-[44px] w-full rounded-xl border border-gray-300 bg-slate-200 px-4 py-3 text-xl outline-none placeholder:font-light 
        placeholder:opacity-75 focus-within:border-primary   
        dark:border-dark-border dark:bg-dark-regular  
        dark:text-dark-text-bold dark:focus-within:border-primary "
					/>
				</div>
				<div className="mt-6 flex items-center justify-end gap-2">
					<Button
						small
						className="bg-transparent px-6 shadow-none dark:hover:bg-dark-very-light"
						onClick={() => onCancel()}
					>
						<span className="text-primary">Cancel</span>
					</Button>
					<Button
						small
						primary
						onClick={() => submitRename()}
						className="px-6"
					>
						{'Save'}
					</Button>
				</div>
			</div>
		</Box>
	);
};

export default GroupChatRename;
