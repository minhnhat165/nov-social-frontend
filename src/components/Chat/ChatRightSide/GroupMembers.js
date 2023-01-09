import { memo } from 'react';
import { useConversation } from '../../../contexts/ConversationContext';
import GroupMemberItem from './GroupMemberItem';

const GroupMembers = () => {
	const { callModalAddMember, conversation } = useConversation();

	return (
		<div className="flex h-full flex-col">
			<div className="relative flex h-full flex-col px-2">
				<div
					className="group flex cursor-pointer items-center gap-2 rounded-xl p-[6px] hover:bg-dark-very-light active:bg-primary-bold"
					onClick={() => callModalAddMember()}
				>
					<div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full dark:bg-dark-very-light dark:text-dark-text-regular  dark:group-hover:bg-primary/20 dark:group-hover:text-dark-text-bold">
						<i className="fa-solid fa-plus"></i>
					</div>
					<span className="dark:text-dark-text-regular dark:group-hover:text-dark-text-bold">
						Add member
					</span>
				</div>

				<div className="flex-1">
					{conversation.users.map((user) => (
						<GroupMemberItem
							key={user._id}
							user={user}
							isAdmin={conversation.groupAdmin === user._id}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default memo(GroupMembers);
