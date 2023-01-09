import React, { useState } from 'react';
import Box from '../../Box';
import Button from '../../ButtonOld';
import UpLoadAvatar from '../../UpLoadAvatar';

const GroupChatUpLoadAvatar = ({ conversation, onCancel, onSubmit }) => {
	const [avatarSelected, setAvatarSelected] = useState(null);
	return (
		<Box
			header={
				<span>
					Change avatar of<span className="text-primary"> Chat</span>
				</span>
			}
		>
			<div className="flex-4 flex w-[548px] flex-col  gap-2 p-4">
				<div className="text-center dark:text-dark-text-regular">
					Upload a picture
				</div>
				<div className="flex w-full justify-center">
					<UpLoadAvatar
						setAvatarSelected={setAvatarSelected}
						initialImage={conversation.avatar}
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
						onClick={() => onSubmit(avatarSelected)}
						className="px-6"
					>
						{'Save'}
					</Button>
				</div>
			</div>
		</Box>
	);
};

export default GroupChatUpLoadAvatar;
