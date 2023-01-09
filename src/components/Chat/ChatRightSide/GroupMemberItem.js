import React, { useState } from 'react';
import { useConversation } from '../../../contexts/ConversationContext';
import AccountQuickView from '../../AccountQuickView';
import ConfirmBox from '../../ConfirmBox';

const GroupMemberItem = ({ user, isAdmin }) => {
	const [showConfirmBox, setShowConfirmBox] = useState(false);

	const { handleRemoveMember } = useConversation();
	return (
		<div className="flex gap-2">
			<AccountQuickView
				user={user}
				subName={
					isAdmin ? (
						<span className="mt-1 text-[13px] dark:text-dark-text-light">
							Admin
						</span>
					) : (
						''
					)
				}
				RightComponent={
					<div
						className="button hover-appearance hover-brightness ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full p-0 dark:text-dark-text-regular dark:active:bg-slate-500"
						onClick={() => setShowConfirmBox(true)}
					>
						<i className="fa-solid fa-user-xmark"></i>
					</div>
				}
			/>

			<ConfirmBox
				show={showConfirmBox}
				setShow={setShowConfirmBox}
				onConfirm={() => {
					handleRemoveMember(user._id);
					setShowConfirmBox(false);
				}}
				header={
					<span>
						Remove member from <span className="text-primary">Chat</span> ?
					</span>
				}
				content={
					'Are you sure that you want to remove this person from the conversation? They will no longer be able to send or receive new messages.'
				}
				buttonText={'Remove'}
			/>
		</div>
	);
};

export default GroupMemberItem;
