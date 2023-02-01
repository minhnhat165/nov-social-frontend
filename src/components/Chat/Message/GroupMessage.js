import { formatRelative } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../DataDisplay/Avatar';
import TagText from '../../TagText';
import MessageCard from './MessageCard';

const GroupMessage = ({ groupedMessages }) => {
	const user = useSelector((state) => state.auth.user);
	const time = useMemo(() => {
		const date = new Date(groupedMessages.messages[0].createdAt);
		return formatRelative(date, new Date());
	}, []);

	const isUser = useMemo(() => {
		return groupedMessages.sender._id === user._id;
	}, [groupedMessages.sender._id, user._id]);

	return (
		<>
			{groupedMessages.messages[0].isNotification ? (
				<div className="mx-auto py-4 text-center text-xs dark:text-dark-text-regular">
					{groupedMessages.messages[0].tag.length > 0 && (
						<TagText
							tag={groupedMessages.messages[0].tag}
							text={groupedMessages.messages[0].text}
						/>
					)}
				</div>
			) : (
				<div
					className={`mt-2 flex items-start gap-2 ${
						isUser ? '' : ''
					}`}
				>
					{!isUser && <Avatar url={groupedMessages.sender.avatar} />}
					<div
						className={`flex w-full flex-col ${
							isUser ? 'items-end' : 'items-start'
						}`}
					>
						<span className="text-[13px] text-dark-text-light">
							{time}
						</span>
						<div
							className={`flex w-full flex-col gap-[0.0938rem] ${
								isUser ? 'items-end' : 'items-start'
							}`}
						>
							<AnimatePresence>
								{groupedMessages.messages.map(
									(message, index) => {
										const borderRadius = () => {
											const isStart = index === 0;
											if (isStart && isUser) {
												return 'rounded-br-[3px]';
											}
											const isEnd =
												index ===
												groupedMessages.messages
													.length -
													1;
											if (isEnd && isUser) {
												return 'rounded-tr-[3px]';
											}
											if (isEnd && !isUser) {
												return 'rounded-tl-[3px]';
											}
											if (!isEnd && !isUser) {
												return 'rounded-l-[3px]';
											}
											if (!isEnd && isUser) {
												return 'rounded-r-[3px]';
											}
										};
										const borderRadiusStyle =
											borderRadius();
										return (
											<MessageCard
												key={message._id}
												message={message}
												borderRadiusStyle={
													borderRadiusStyle
												}
												isUser={isUser}
											/>
										);
									}
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default memo(GroupMessage);
