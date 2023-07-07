import * as ScrollArea from '@radix-ui/react-scroll-area';

import { ArrowPathIcon, Cog6ToothIcon } from 'components/Icon';

import { BookmarkItem } from '../BookmarkItem';
import { IconButton } from 'components/Action';
import Layer from 'components/Layout/Layer';
import { Text } from 'components/Typography';
import { Tooltip } from 'components/OverLay';
import { getBookmarks } from 'api/bookmarkApi';
import { useInfiniteQuery } from 'react-query';

export const BookmarkPanel = () => {
	const { data } = useInfiniteQuery(
		'bookmarks',
		({ pageParam }) => {
			return getBookmarks({ cursor: pageParam, limit: 10 });
		},
		{
			getNextPageParam: (lastPage) => {
				const { hasNextPage, endCursor } = lastPage.data;
				if (!hasNextPage) return undefined;
				return endCursor;
			},
		},
	);


	const bookmarks = data?.pages[0]?.data?.items[0]?.posts ||[];

	return (
		<Layer className="flex h-full w-96 flex-col rounded shadow-md">
			<div className="h-14 w-full">
				<div className="flex h-full items-center justify-between p-4">
					<Text className="text-xl font-semibold">Bookmark</Text>
					<div className="-mr-2 flex items-center">
						<Tooltip content="refresh" placement="left">
							<div>
								<IconButton
									size="sm"
									color="secondary"
									rounded
									variant="text"
								>
									<ArrowPathIcon />
								</IconButton>
							</div>
						</Tooltip>
						<IconButton
							size="sm"
							color="secondary"
							rounded
							variant="text"
						>
							<Cog6ToothIcon />
						</IconButton>
					</div>
				</div>
			</div>

			<ScrollArea.Root className="overflow-hidden rounded-b">
				<ScrollArea.Viewport
					id="notification-panel"
					className="h-full w-full p-2 pt-0"
				>
					<div className="flex flex-col gap-1">
						{bookmarks.map((item) => (
							<BookmarkItem
								key={item._id}
								item={{
									post: item,
								}}
							/>
						))}
					</div>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar
					className="w-[0.7rem] bg-gray-300/50 p-[2px] dark:bg-gray-600/50"
					orientation="vertical"
				>
					<ScrollArea.Thumb className="rounded-md bg-gray-500/50 hover:bg-gray-500 dark:bg-gray-500 hover:dark:bg-gray-400" />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
		</Layer>
	);
};
