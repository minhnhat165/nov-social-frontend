import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useConversation } from '../../contexts/ConversationContext';
import Avatar from '../Avatar';
import Button from '../ButtonOld';
import DiffTime from '../DiffTime';
import TagText from '../TagText';
import ChatItemActionBar from './ChatItemActionBar';

const ChatItem = () => {
	const { conversation } = useConversation();
	const [showMenu, setShowMenu] = useState(false);
	const handleClickMenu = (e) => {
		e.preventDefault();
		setShowMenu((prev) => !prev);
	};

	return (
		<>
			{conversation && (
				<NavLink to={`/chat/${conversation._id}`}>
					<div
						className={`chat-items group relative  w-full rounded-xl py-1 pr-4 transition-all ${
							showMenu ? 'dark:bg-dark-light' : ''
						} ${
							conversation.isActive
								? 'dark:bg-primary-bold/20'
								: 'dark:hover:bg-dark-light'
						}`}
					>
						<div className="ml-3 flex items-start gap-2 overflow-hidden py-2">
							<div className="shrink-0">
								<Avatar
									size="w-10 h-10"
									url={conversation.avatar}
								/>
							</div>
							<div className="my-auto flex flex-1 flex-col overflow-hidden text-sm">
								<span className="truncate dark:text-dark-text-bold">
									{conversation.name}
								</span>
								<span className=" truncate text-sm dark:text-dark-text-light">
									{conversation?.latestMessage?.tag.length >
									0 ? (
										<TagText
											tag={
												conversation?.latestMessage?.tag
											}
											text={
												conversation?.latestMessage
													?.text
											}
											typeReturn="text"
											className=" truncate"
										/>
									) : (
										<>
											{conversation.latestMessage?.text}{' '}
											{conversation.latestMessage
												?.image && (
												<>
													<i className="fa fa-image"></i>
												</>
											)}
										</>
									)}
								</span>
							</div>
							{conversation?.latestMessage && (
								<div className="shrink-0">
									<DiffTime
										startDate={
											conversation.latestMessage.createdAt
										}
									/>
								</div>
							)}
							<div
								className={`absolute right-3 top-3 transition-all duration-300 ${
									showMenu ? 'rotate-180' : ''
								}`}
							>
								<Button
									circle
									onClick={handleClickMenu}
									className="opacity-0 transition-all group-hover:opacity-100"
								>
									<i className="fa-solid fa-caret-down"></i>
								</Button>
							</div>
						</div>
						<AnimatePresence>
							{showMenu && (
								<ChatItemActionBar
									conversation={conversation}
								/>
							)}
						</AnimatePresence>
					</div>
				</NavLink>
			)}
		</>
	);
};

export default React.memo(ChatItem);
