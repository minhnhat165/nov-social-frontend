import { Bars3Icon, MessagesIcon, SearchIcon } from 'components/Icon';
import { CloseButton, IconButton } from 'components/Action';

import { APP_NAME } from 'configs';
import AccountMenu from './AccountMenu';
import { BlockScroll } from 'components/OverLay';
import { Card } from 'components/DataDisplay';
import Layer from 'components/Layout/Layer';
import { LogoAction } from './TopSidebar';
import Navbar from './Navbar';
import { NotificationBell } from 'features/notification';
import SearchMain from 'features/search/components/SearchMain';
import SettingMenu from './SettingMenu';
import { Text } from 'components/Typography';
import { useState } from 'react';

export const SidebarMobile = () => {
	const [showSearch, setShowSearch] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	return (
		<Layer className="fixed z-[998] w-full rounded-none shadow-md">
			<div className="flex items-center border-b-2 px-3 py-1 dark:border-dark-850">
				<LogoAction>
					<Text level={0} className="text-xl font-semibold">
						{APP_NAME}
					</Text>
				</LogoAction>
				<div className="ml-auto flex gap-4">
					<IconButton
						onClick={() => {
							setShowSearch(true);
						}}
						size="sm"
						className="ml-auto"
						color={'secondary'}
						rounded
					>
						<SearchIcon />
					</IconButton>
					<IconButton
						onClick={() => {
							setShowMenu(true);
						}}
						size="sm"
						className="ml-auto"
						color={'secondary'}
						rounded
					>
						<Bars3Icon />
					</IconButton>
				</div>
				{showSearch && (
					<Card className="absolute left-0 top-0 z-[10] h-screen w-screen">
						<BlockScroll />
						<Card.Header className="flex items-center justify-between">
							<Card.Title>Search</Card.Title>
							<CloseButton
								onClick={() => {
									setShowSearch(false);
								}}
							/>
						</Card.Header>
						<SearchMain
							onNavigate={() => {
								setShowSearch(false);
							}}
							className="!px-2 !shadow-none"
							placeholder="Search for Nov"
						/>
					</Card>
				)}
				{showMenu && (
					<Card className="absolute left-0 top-0 z-[10] h-screen w-screen">
						<BlockScroll />
						<Card.Header className="flex items-center justify-between">
							<Card.Title>Menu</Card.Title>
							<CloseButton
								onClick={() => {
									setShowMenu(false);
								}}
							/>
						</Card.Header>
						<Card.Body className="!px-2">
							<AccountMenu
								onClickAccount={() => {
									setShowMenu(false);
								}}
							/>
							<SettingMenu />
						</Card.Body>
					</Card>
				)}
			</div>
			<Navbar
				isHorizontal
				extraItems={[
					{
						name: 'Notification',
						icon: <NotificationBell />,
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
