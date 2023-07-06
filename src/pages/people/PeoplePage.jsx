import * as ScrollArea from '@radix-ui/react-scroll-area';

import InfiniteScroll from 'react-infinite-scroll-component';
import Layer from 'components/Layout/Layer';
import { ProfilePreview } from 'features/user/components';
import { getRecommendations } from 'api/userApi';
import { useInfiniteQuery } from 'react-query';

export const PeoplePage = () => {
	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
		'people',
		({ pageParam }) => {
			return getRecommendations({
				limit: 20,
				page: pageParam,
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

	if (!data) return null;
	const users = data.pages.flatMap((page) => page.data.items);
	return (
		<ScrollArea.Root className="h-full w-full overflow-hidden rounded-b">
			<ScrollArea.Viewport
				id="notification-panel"
				className="h-full w-full p-10"
			>
				<InfiniteScroll
					dataLength={users.length}
					next={fetchNextPage}
					scrollThreshold={0.7}
					hasMore={hasNextPage}
					scrollableTarget="notification-panel"
				>
					<div className="flex flex-wrap gap-4 ">
						{users.map((user) => (
							<Layer key={user._id}>
								<ProfilePreview user={user} />
							</Layer>
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
		</ScrollArea.Root>
	);
};
