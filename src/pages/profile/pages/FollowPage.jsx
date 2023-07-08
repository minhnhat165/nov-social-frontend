import * as ScrollArea from '@radix-ui/react-scroll-area';

import { getFollow, getFollowing } from 'api/userApi';
import { useParams, useSearchParams } from 'react-router-dom';

import { Card } from 'components/DataDisplay';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layer from 'components/Layout/Layer';
import Navbar from '../components/Navbar';
import { ProfilePreview } from 'features/user/components';
import { Search } from 'components/DataEntry';
import { UserProvider } from 'features/user/context';
import { useInfiniteQuery } from 'react-query';
import { useState } from 'react';

let items = [
	{
		id: 1,
		title: 'Following',
		endPoint: 'follow',
		params: { type: 'following' },
	},
	{
		id: 2,
		title: 'Followers',
		endPoint: 'follow',
		params: { type: 'followers' },
	},
];
const FollowPage = () => {
	const { id } = useParams();
	const [searchParams] = useSearchParams();
	const type = searchParams.get('type');
	const [searchValue, setSearchValue] = useState('');
	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
		['follow', type, id, searchValue],
		({ pageParam }) => {
			return getFollow({
				userId: id,
				limit: 20,
				page: pageParam,
				type: type,
				q: searchValue,
			});
		},
		{
			getNextPageParam: (lastPage) => {
				const { totalPage, currentPage } = lastPage.data;
				if (parseInt(currentPage) < parseInt(totalPage))
					return parseInt(currentPage) + 1;
				return undefined;
			},
		},
	);
	const users = data?.pages?.flatMap((page) => page.data.items) || [];

	return (
		<div className="relative h-screen w-screen sm:w-full sm:p-4 sm:px-2">
			<Card
				responsive
				className="flex h-full w-full flex-col overflow-hidden rounded-md pt-4 sm:p-4 sm:pt-2"
			>
				<Card.Header className="flex items-center !px-2 sm:px-4">
					<div className="hidden sm:block">
						<Card.Title>Follow</Card.Title>
					</div>
					<div className="w-full sm:ml-auto sm:w-fit">
						<Search
							onChange={(value) => {
								setSearchValue(value);
							}}
						/>
					</div>
				</Card.Header>
				<div className="w-full sm:-ml-2 sm:mb-4 sm:w-80">
					<Navbar items={items} />
				</div>

				<ScrollArea.Root className="relative h-full w-full flex-1 overflow-hidden rounded-lg px-2 sm:px-0">
					<ScrollArea.Viewport id="follow" className="h-full">
						<InfiniteScroll
							dataLength={users.length}
							next={fetchNextPage}
							scrollThreshold={0.7}
							hasMore={hasNextPage}
							scrollableTarget="follow"
						>
							<div className="flex flex-wrap gap-2 sm:gap-4">
								{users.map((user) => (
									<UserProvider key={user._id} user={user}>
										{({ user, updateUser }) => (
											<Layer
												level={0}
												className="w-full sm:w-[calc(50%_-_8px)] md:w-[calc(33.33%_-_11px)]"
											>
												<ProfilePreview
													className="sm:!w-full"
													user={user}
													onUpdateUser={updateUser}
												/>
											</Layer>
										)}
									</UserProvider>
								))}
							</div>
						</InfiniteScroll>
					</ScrollArea.Viewport>
					<ScrollArea.Scrollbar
						className="w-[0.7rem] bg-gray-300/50 p-[2px] dark:bg-gray-600/50"
						orientation="vertical"
					>
						<ScrollArea.Thumb className="rounded-md bg-gray-500/50 hover:bg-gray-500 dark:bg-gray-500 hover:dark:bg-gray-400" />
					</ScrollArea.Scrollbar>
					{/* {(isLoading || isRefetching) && (
						<div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg backdrop-blur-sm">
							<Spinner size="xl" color="primary" />
						</div>
					)} */}
				</ScrollArea.Root>
			</Card>
		</div>
	);
};

export default FollowPage;
