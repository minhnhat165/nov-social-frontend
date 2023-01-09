import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../ButtonOld';
import Popover from '../../Popover';

const MessageMenu = ({ onEdit, onDelete, message }) => {
	const userId = useSelector((state) => state.auth.user._id);
	const [showMenu, setShowMenu] = useState(false);

	const isOwnerMessage = useMemo(() => {
		return userId === message.sender._id;
	}, [message.sender._id, userId]);
	const MenuUi = useMemo(() => {
		return (
			<div className="flex gap-1">
				{isOwnerMessage && (
					<Button
						circle
						medium
						onClick={() => {
							onEdit();
							setShowMenu(false);
						}}
						className="dark:text-dark-text-regular dark:hover:text-dark-text-bold"
					>
						<i className="fa-sharp fa-solid fa-reply"></i>
					</Button>
				)}
				{isOwnerMessage && (
					<Button
						circle
						medium
						onClick={() => onDelete()}
						className="dark:text-dark-text-regular dark:hover:text-dark-text-bold"
					>
						<i className="fa-solid fa-trash "></i>
					</Button>
				)}

				{!isOwnerMessage && (
					<Button
						circle
						medium
						className="dark:text-dark-text-regular dark:hover:text-dark-text-bold"
					>
						<i className="fa-solid fa-flag-swallowtail"></i>
					</Button>
				)}
			</div>
		);
	}, []);
	return (
		<div className="relative flex items-center">
			<Popover
				visible={showMenu}
				onHide={() => setShowMenu(false)}
				className={'p-2'}
				render={MenuUi}
				placement="top center"
			>
				<div
					className="mx-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-dark-regular dark:text-dark-text-light dark:hover:text-dark-text-bold"
					onClick={() => setShowMenu((prev) => !prev)}
				>
					<i
						className={`fa-solid fa-ellipsis-vertical group-hover:visible ${
							showMenu ? 'visible ' : 'invisible'
						}`}
					></i>
				</div>
			</Popover>
		</div>
	);
};

export default MessageMenu;
