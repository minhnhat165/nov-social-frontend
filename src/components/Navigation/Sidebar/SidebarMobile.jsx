import { BellAlertIcon, MessagesIcon, SearchIcon } from 'components/Icon';

import { IconButton } from 'components/Action';
import Layer from 'components/Layout/Layer';
import { Text } from 'components/Typography';
import { APP_NAME } from 'configs';
import Navbar from './Navbar';
import { LogoAction } from './TopSidebar';

export const SidebarMobile = () => {
	return (
		<Layer className="fixed z-[998] w-full rounded-none shadow-md">
			<div className="flex items-center border-b-2 px-3 py-1 dark:border-dark-850">
				<LogoAction>
					<Text level={0} className="text-xl font-semibold">
						{APP_NAME}
					</Text>
				</LogoAction>
				<IconButton
					size="sm"
					className="ml-auto"
					color={'secondary'}
					rounded
				>
					<SearchIcon />
				</IconButton>
			</div>
			<Navbar
				isHorizontal
				extraItems={[
					{
						name: 'Notification',
						icon: <BellAlertIcon />,
						path: '/notifications',
					},
					{
						name: 'Chat',
						icon: <MessagesIcon />,
						path: '/chat',
					},
				]}
			/>
		</Layer>
	);
};
