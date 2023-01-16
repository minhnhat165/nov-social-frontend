import React, { useState } from 'react';
import AccountFollowButton from './AccountFollowButton';
import AccountQuickView from './AccountQuickView';
import Box from './Box';
import FollowButton from './ButtonOld/FollowButton';
import Follow from './Follow';
import Modal from './Modal';

const ShowModalUserList = ({ children, title, list, onClick }) => {
	const [showList, setShowList] = useState(false);
	const handleClick = () => {
		setShowList(true);
		onClick();
	};

	return (
		<>
			<div onClick={handleClick}>{children}</div>
			<Modal show={showList} setShow={setShowList}>
				<Box
					header={
						<div className="border-b pb-3 dark:border-dark-border">
							{title}
						</div>
					}
					className={'h-96 w-96 pb-2'}
				>
					<div className="scrollAble">
						{list.map((user) => (
							<div key={user._id} className="p-1 px-2">
								<AccountFollowButton
									user={user}
									subName={
										<div
											className="w-full overflow-hidden truncate font-light dark:text-dark-text-light"
											title={user.email}
										>
											{user.email}
										</div>
									}
								/>
							</div>
						))}
					</div>
				</Box>
			</Modal>
		</>
	);
};

export default ShowModalUserList;
