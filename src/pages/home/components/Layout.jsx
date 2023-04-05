import {
	ArrowsPointingInIcon,
	ArrowsPointingOutIcon,
	EyeIcon,
} from 'components/Icon';
import { Card, Rank } from 'components/DataDisplay';
import { getRecommendations, getTopRankers } from 'api/userApi';
import { useDispatch, useSelector } from 'react-redux';

import { Follow } from 'features/user/components';
import Head from 'components/Head';
import Layer from 'components/Layout/Layer';
import { Menu } from 'components/Navigation';
import StickyBox from 'react-sticky-box';
import { Text } from 'components/Typography';
import UserItem from 'features/user/components/UserItem';
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
				<aside className="hidden px-2 pt-1 transition-all tablet:block">
					<RankingBoard />
					<WhoToFollow />
				</aside>
			</StickyBox>

			<main className="flex-1">{children}</main>
			<aside className="hidden h-full p-2 py-4 laptop:block">
				<Layer className="h-96 w-80 rounded-xl"></Layer>
			</aside>
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
	const focusMode = useSelector((state) => state.setting.focusMode);

	const dispatch = useDispatch();
	if (!data) return null;
	const { users } = data;
	return (
		<div className={focusMode && 'opacity-60'}>
			<div className="flex h-12 items-center justify-between">
				<Text className="text-lg font-bold">Top Ranking</Text>
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
			</div>

			<Card
				className={clsx(
					'mb-4 w-80 dark:bg-dark-850',
					focusMode && '!bg-transparent',
					isMinimized &&
						'flex justify-between rounded-lg px-2 py-1.5',
				)}
			>
				{!isMinimized ? (
					<Card.Body className="!p-2">
						{users.map((user, index) => (
							<UserItem
								key={user._id}
								user={user}
								size="md"
								start={
									<div
										className={clsx(
											'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-lg font-bold',
											rankColors[index + 1] ||
												'text-gray-500',
										)}
									>
										{index + 1}
									</div>
								}
								end={<Rank rank={user.rank.number} />}
							/>
						))}
					</Card.Body>
				) : (
					<Rank.All />
				)}
			</Card>
		</div>
	);
}

function WhoToFollow() {
	const { data } = useQuery('who-to-follow', getRecommendations);
	const focusMode = useSelector((state) => state.setting.focusMode);
	if (!data) return null;
	const { users } = data;
	if (!users.length) return null;

	return (
		<div className={focusMode && 'opacity-60'}>
			<div className="flex h-12 items-center">
				<Text className="text-lg font-bold">Who to follow</Text>
			</div>
			<Card
				className={clsx(
					'top-0 w-80 rounded-xl dark:bg-dark-850',
					focusMode && '!bg-transparent',
				)}
			>
				<Card.Body className="!p-2">
					{users.map((user) => (
						<UserItem
							key={user._id}
							user={user}
							onClick={() => {}}
							end={
								<Follow followId={user._id}>
									<Follow.Button size="sm" />
								</Follow>
							}
						/>
					))}
				</Card.Body>
			</Card>
		</div>
	);
}
