import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../ButtonOld';
import Popover from '../OverLay/Popover';

const CommentMenu = ({ onEdit, onDelete, comment }) => {
	const userId = useSelector((state) => state.auth.user._id);
	const [showMenu, setShowMenu] = useState(false);
	const isOwnerPost = useMemo(() => {
		return userId === comment.postUserId;
	}, [comment.postUserId, userId]);
	const isOwnerComment = useMemo(() => {
		return userId === comment.user._id;
	}, [comment.user._id, userId]);
	const MenuUi = useMemo(() => {
		return (
			<div className="flex gap-1">
				{isOwnerComment && (
					<Button
						circle
						medium
						onClick={() => {
							onEdit();
							setShowMenu(false);
						}}
						className="dark:text-dark-text-regular dark:hover:text-dark-text-bold"
					>
						<i className="fa-solid fa-edit"></i>
					</Button>
				)}
				{(isOwnerComment || isOwnerPost) && (
					<Button
						circle
						medium
						onClick={() => onDelete()}
						className="dark:text-dark-text-regular dark:hover:text-dark-text-bold"
					>
						<i className="fa-solid fa-trash "></i>
					</Button>
				)}

				{!isOwnerComment && !isOwnerPost && (
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
		<div className="relative">
			<Popover
				visible={showMenu}
				onHide={() => setShowMenu(false)}
				className={'p-2'}
				render={MenuUi}
			>
				<div
					className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-dark-light dark:text-dark-text-light dark:hover:text-dark-text-bold"
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

export default CommentMenu;
