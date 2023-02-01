import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../../components/DataDisplay/Avatar';
import ChatSide from '../../../components/Chat/ChatSide';
import Popover from '../../../components/OverLay/Popover';
import Tooltip from '../../../components/OverLay/Tooltip';
import ChatProvider from '../../../contexts/ChatContext';
import AccountDropdown from '../AccountDropdown';
import WidgetNotification from '../../../components/WidgetNotification';

const RightAction = () => {
	const user = useSelector((state) => state.auth.user);
	const items = useMemo(() => {
		return [
			{
				icon: <i className="fa-solid fa-messages"></i>,
				title: 'Messages',
			},
			{
				icon: <i className="fa-solid fa-bell"></i>,
				title: 'Notification',
			},
			{
				icon: <Avatar square url={user.avatar} size="w-10 h-10" />,
				title: 'Account',
			},
		];
	}, []);

	const subMenus = useMemo(() => {
		return [
			<ChatProvider>
				<div className="max-height">
					<ChatSide />
				</div>
			</ChatProvider>,
			<WidgetNotification />,
			<AccountDropdown />,
		];
	}, []);
	const [showSettings, setShowSettings] = useState(false);
	const [currentItemIndex, setCurrentItemIndex] = useState(0);

	const handleShowSubMenu = (menuIndex) => {
		setCurrentItemIndex(menuIndex);
		setShowSettings((prev) => !prev);
	};

	return (
		<div className="flex justify-end gap-2 text-lg dark:text-dark-text-regular">
			{items.map((item, index) => {
				return (
					<Popover
						shadow
						key={item.title}
						visible={showSettings && currentItemIndex === index}
						setVisible={setShowSettings}
						className={`mt-2 min-w-[288px]`}
						render={subMenus[currentItemIndex]}
						placement="right"
						hideOnClickParent
					>
						<Tooltip key={item.title} content={item.title}>
							<div
								className="hover-brightness flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-dark-very-light p-4"
								onClick={() => {
									handleShowSubMenu(index);
								}}
							>
								{item.icon}
							</div>
						</Tooltip>
					</Popover>
				);
			})}
		</div>
	);
};

export default RightAction;
