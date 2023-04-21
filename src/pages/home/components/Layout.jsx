import {
	ArrowsPointingInIcon,
	ArrowsPointingOutIcon,
	EyeIcon,
} from 'components/Icon';
import { Card, Rank } from 'components/DataDisplay';
import { getRecommendations, getTopRankers } from 'api/userApi';
import { useDispatch, useSelector } from 'react-redux';

import Head from 'components/Head';
import { Menu } from 'components/Navigation';
import StickyBox from 'react-sticky-box';
import { Text } from 'components/Typography';
import UserItem from 'features/user/components/UserItem';
import { WhoToFollow } from './WhoToFollow';
import clsx from 'clsx';
import { setRankingBoardMinimized } from 'store/slices/settingSlice';
import { useQuery } from 'react-query';

const Layout = ({ children }) => {
	const user = useSelector((state) => state.auth?.user);
	if (!user) return null;
	return (
		<div
			id="main-layout"
			className="flex h-screen w-full items-start overflow-y-scroll"
		>
			<Head />
			<StickyBox offsetTop={8} offsetBottom={8}>
				<aside className="hidden w-[336px] flex-col gap-4 px-2 transition-all tablet:flex">
					<RankingBoard />
				</aside>
			</StickyBox>
			<main className="flex-1">{children}</main>
			<StickyBox offsetTop={8} offsetBottom={8}>
				<div className="hidden w-[336px] flex-col gap-4 rounded-none px-2 transition-all laptop:flex">
					<WhoToFollow />
					<ContactList />
				</div>
			</StickyBox>
		</div>
	);
};

export default Layout;

const rankColors = {
	1: 'text-[#ee4b62]',
	2: 'text-[#a042f0]',
	3: 'text-[#36b0ee]',
};

function RankingBoard() {
	const { data } = useQuery('ranking', getTopRankers);
	const isMinimized = useSelector(
		(state) => state.setting.isRankingBoardMinimized,
	);

	const dispatch = useDispatch();
	if (!data) return null;
	const { users } = data;
	return (
		<FocusModePanel
			title="Top Ranking"
			EndHeader={
				<Menu>
					<Menu.Trigger size="sm" />
					<Menu.Content className="w-40 !rounded-lg p-2">
						<Menu.Item icon={<EyeIcon />}>
							{isMinimized ? 'Show' : 'Hide'}
						</Menu.Item>
						<Menu.Item
							onClick={() =>
								dispatch(setRankingBoardMinimized(!isMinimized))
							}
							icon={
								isMinimized ? (
									<ArrowsPointingOutIcon />
								) : (
									<ArrowsPointingInIcon />
								)
							}
						>
							{isMinimized ? 'Expand' : 'Minimize'}
						</Menu.Item>
					</Menu.Content>
				</Menu>
			}
		>
			<div className="flex flex-col gap-1">
				{users.map((user, index) => (
					<UserItem
						key={user._id}
						user={user}
						size="md"
						start={
							<div
								className={clsx(
									'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-lg font-bold',
									rankColors[index + 1] || 'text-gray-500',
								)}
							>
								{index + 1}
							</div>
						}
						end={<Rank rank={user.rank.number} />}
					/>
				))}
			</div>
		</FocusModePanel>
	);
}

const ContactList = () => {
	const { data } = useQuery('who-to-follow', () =>
		getRecommendations({ limit: 10 }),
	);
	if (!data) return null;
	const { users } = data;
	if (!users.length) return null;
	return (
		<FocusModePanel title="Contacts">
			{users.map((user) => (
				<UserItem
					key={user._id}
					user={user}
					subName={<span className="text-green-500">Online</span>}
					onClick={() => {}}
				/>
			))}
			{users.map((user) => (
				<UserItem
					key={user._id}
					user={user}
					subName={<span className="text-red-500">Offline</span>}
					onClick={() => {}}
				/>
			))}
		</FocusModePanel>
	);
};

export const FocusModePanel = ({ children, title, EndHeader, className }) => {
	const focusMode = useSelector((state) => state.setting.focusMode);
	return (
		<div className={clsx(className, focusMode && 'opacity-60')}>
			<div className="flex h-12 items-center justify-between">
				<Text bold size="lg">
					{title}
				</Text>
				{EndHeader}
			</div>
			<Card className={clsx('top-0 w-80 rounded-xl dark:bg-dark-850')}>
				<Card.Body className="!p-2">{children}</Card.Body>
			</Card>
		</div>
	);
};
