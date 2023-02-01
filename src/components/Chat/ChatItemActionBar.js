import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useConversation } from '../../contexts/ConversationContext';
import AnimationWrapper from '../Animate/AnimationWrapper';
import { verticalResize } from '../Animate/variants';
import Tooltip from '../OverLay/Tooltip';

const ChatItemActionBar = ({ conversation }) => {
	const userId = useSelector((state) => state.auth.user._id);
	const { actionDeleteConversation, actionLeaveGroup } = useConversation();

	const items = useMemo(() => {
		const defaultItems = [
			{
				title: 'Edit',
				icon: <i className="fa-solid fa-bell"></i>,
				action: () => {},
			},

			{
				title: 'Audio call',
				icon: <i className="fa-solid fa-phone"></i>,
				action: () => {},
			},
			{
				title: 'Video call',
				icon: <i className="fa-solid fa-video"></i>,
				action: () => {},
			},
			{
				title: 'Delete',
				icon: <i className="fa-solid fa-trash"></i>,
				action: actionDeleteConversation,
			},
		];

		if (conversation.isGroupChat) {
			if (conversation?.groupAdmin !== userId) defaultItems.pop();
			defaultItems.push({
				title: 'Leave group',
				icon: <i className="fa-solid fa-right-from-bracket"></i>,
				action: actionLeaveGroup,
			});
		} else {
			defaultItems.unshift({
				title: 'Profile',
				icon: <i className="fa-solid fa-user"></i>,
				action: () => {},
			});
		}

		return defaultItems;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [conversation]);

	return (
		<AnimationWrapper animation={verticalResize}>
			<div className="text-primary flex justify-between p-4">
				{items.map((item) => (
					<Tooltip
						content={item.title}
						placement="top"
						arrow
						key={item.title}
					>
						<div
							key={items.title}
							onClick={(e) => {
								e.preventDefault();
								item.action();
							}}
							className="transition-all hover:scale-[1.30]"
						>
							{item.icon}
						</div>
					</Tooltip>
				))}
			</div>
		</AnimationWrapper>
	);
};

export default ChatItemActionBar;
