import { useMemo } from 'react';
import { useConversation } from '../../../contexts/ConversationContext';
import RenderItems from './RenderItems';

const PrivacySettings = () => {
	const { actionLeaveGroup } = useConversation();
	const items = useMemo(() => {
		return [
			{
				title: 'Hide conversation',
				icon: <i className="fa-duotone fa-eye"></i>,
				action: () => {},
			},
			{
				title: 'Mute conversation',
				icon: <i className="fa-duotone fa-bell"></i>,
				action: () => {},
			},
			{
				title: 'Leave group',
				icon: <i className="fa-duotone fa-right-from-bracket"></i>,
				action: actionLeaveGroup,
			},
		];
	}, []);
	return <RenderItems items={items} />;
};

export default PrivacySettings;
