import { useMemo } from 'react';
import { useConversation } from '../../../contexts/ConversationContext';
import RenderItems from './RenderItems';

const CustomizeChat = () => {
	const { actionRenameChat, actionChangeGroupAvatar, conversation } =
		useConversation();
	const items = useMemo(() => {
		const result = [];
		if (conversation.isGroupChat) {
			result.push(
				{
					title: 'Change chat name',
					icon: <i className="fa-duotone fa-pen-to-square"></i>,
					action: actionRenameChat,
				},
				{
					title: 'Change chat avatar',
					icon: <i className="fa-duotone fa-image"></i>,
					action: actionChangeGroupAvatar,
				}
			);
		}
		result.push(
			{
				title: 'Edit nickname',
				icon: <i className="fa-duotone fa-text"></i>,
				action: () => {},
			},
			{
				title: 'Change theme',
				icon: <i className="fa-duotone fa-palette"></i>,
				action: () => {},
			}
		);
		return result;
	}, []);

	return <RenderItems items={items} />;
};

export default CustomizeChat;
