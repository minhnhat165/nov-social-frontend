import { BellAlertIcon, MessagesIcon, SearchIcon } from 'components/Icon';

import { APP_NAME } from 'configs';
import { IconButton } from 'components/Action';
import Layer from 'components/Layout/Layer';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Text } from 'components/Typography';
import { routePaths } from 'routes/routeConfig';

export const SidebarMobile = () => {
	return (
		<Layer className="fixed z-[998] w-full rounded-none shadow-md">
			<div className="flex items-center border-b-2 px-3 py-1 dark:border-dark-850">
				<Link to={routePaths.HOME}>
					<Text level={0} className="text-xl font-semibold">
						{APP_NAME}
					</Text>
				</Link>
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
