import React from 'react';
import AccountFollowButton from './AccountFollowButton';

const UserList = ({ users }) => {
	return (
		<>
			{users &&
				users.map((user) => (
					<div
						key={user._id}
						className="group relative flex justify-center gap-2 rounded-xl p-1 dark:hover:bg-dark-light"
					>
						{' '}
						<AccountFollowButton
							className="text-sm"
							accountPreviewAble
							avatarClickAble
							user={user}
							subName={
								<div
									className="w-full overflow-hidden truncate font-light dark:text-dark-text-light "
									title={user.email}
								>
									{user.email}
								</div>
							}
						/>
					</div>
				))}
		</>
	);
};

export default UserList;
