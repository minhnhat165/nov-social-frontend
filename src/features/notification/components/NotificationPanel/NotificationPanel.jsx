import * as ScrollArea from '@radix-ui/react-scroll-area';

import { BellAlertIcon, CheckAllIcon, Cog6ToothIcon } from 'components/Icon';
import { Button, IconButton } from 'components/Action';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Notification, NotificationSkeleton } from 'features/notification';
import {
	getNotifications,
	markAllNotificationAsRead,
} from 'api/notificationApi';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';

import { IconWrapper } from 'components/DataDisplay';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layer from 'components/Layout/Layer';
import { Text } from 'components/Typography';
import socket from 'configs/socket-config';

export function NotificationPanel() {
	const queryClient = useQueryClient();

	const [queryKey, setQueryKey] = useState(['notifications']);
	const [filter, setFilter] = useState('');

	const queryFn = ({ pageParam = null, limit = 4 }) => {
		const query = { cursor: pageParam, limit };
		if (filter === 'unread') {
			query.isRead = false;
		}
		if (pageParam === null) {
			query.limit = 8;
		}
		return getNotifications(query);
	};

	const { fetchNextPage, hasNextPage, data, isLoading } = useInfiniteQuery(
		queryKey,
		queryFn,
		{
			getNextPageParam: (lastPage) => {
				return lastPage.hasMore ? lastPage.endCursor : undefined;
			},
		},
	);

	const markAllAsRead = useMutation(markAllNotificationAsRead);

	const handleReadAll = () => {
		markAllAsRead.mutate();
		queryClient.setQueryData(queryKey, (data) => {
			return {
				pages: data.pages.map((page) => {
					return {
						...page,
						items: page.items.map((notification) => {
							return {
								...notification,
								isRead: true,
							};
						}),
					};
				}),
				pageParams: data.pageParams,
			};
		});
	};

	const handleRead = useCallback(
		(_id) => {
			queryClient.setQueryData(queryKey, (data) => {
				return {
					pages: data.pages.map((page) => {
						return {
							...page,
							items: page.items.map((notification) => {
								if (notification._id === _id) {
									return {
										...notification,
										isRead: true,
									};
								}
								return notification;
							}),
						};
					}),
					pageParams: data.pageParams,
				};
			});
		},
		[queryClient, queryKey],
	);

	const handleDelete = useCallback(
		(_id) => {
			queryClient.setQueryData(queryKey, (data) => {
				return {
					pages: data.pages.map((page) => {
						return {
							...page,
							items: page.items.filter(
								(notification) => notification._id !== _id,
							),
						};
					}),
					pageParams: data.pageParams,
				};
			});
		},
		[queryClient, queryKey],
	);

	const numNotifications =
		data?.pages.reduce((acc, page) => acc + page.items.length, 0) || 0;

	useEffect(() => {
		socket.on('server.notification', (notification) => {
			queryClient.setQueryData(queryKey, (data) => {
				return {
					pages: [
						{
							items: [notification, ...data.pages[0].items],
							hasMore: data.pages[0].hasMore,
							endCursor: data.pages[0].endCursor,
						},
						...data.pages.slice(1),
					],
					pageParams: data.pageParams,
				};
			});
		});
		return () => {
			socket.off('server.notification');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layer className="flex h-full w-full flex-col rounded shadow-md sm:w-96">
			<div className="h-14 w-full">
				<div className="flex h-full items-center justify-between p-4">
					<Text className="text-xl font-semibold">Notifications</Text>
					<div className="-mr-2 flex items-center">
						<IconButton
							size="sm"
							color="secondary"
							rounded
							variant="text"
							onClick={handleReadAll}
						>
							<CheckAllIcon />
						</IconButton>
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
			<div className="px-4 pb-4">
				<Button.Group rounded color="secondary">
					<Button
						onClick={() => {
							setQueryKey(['notifications']);
							setFilter('');
						}}
					>
						<Text primary={filter === ''}>All</Text>
					</Button>
					<Button
						onClick={() => {
							setQueryKey(['notifications', 'unread']);
							setFilter('unread');
						}}
					>
						<Text primary={filter === 'unread'}>Unread</Text>
					</Button>
				</Button.Group>
			</div>

			<ScrollArea.Root className="overflow-hidden rounded-b">
				<ScrollArea.Viewport
					id="notification-panel"
					className="h-full w-full p-2 pt-0"
				>
					{isLoading && (
						<div className="flex flex-col gap-2">
							<NotificationSkeleton />
							<NotificationSkeleton />
							<NotificationSkeleton />
							<NotificationSkeleton />
							<NotificationSkeleton />
							<NotificationSkeleton />
						</div>
					)}
					{numNotifications === 0 && !isLoading ? (
						<div className="flex h-full flex-1 flex-col items-center justify-center">
							<Text primary>
								<IconWrapper size={16}>
									<BellAlertIcon />
								</IconWrapper>
							</Text>
							<Text className="text-xl">
								You have no notifications
							</Text>
						</div>
					) : (
						<InfiniteScroll
							dataLength={numNotifications}
							next={fetchNextPage}
							scrollThreshold={0.7}
							hasMore={hasNextPage}
							loader={
								<>
									<NotificationSkeleton />
									<NotificationSkeleton />
								</>
							}
							scrollableTarget="notification-panel"
						>
							<div className="flex flex-col gap-1">
								{data?.pages.map((page, i) => (
									<Fragment key={i}>
										{page.items.map((notification) => (
											<Notification
												key={notification._id}
												notification={notification}
												onRead={handleRead}
												onDelete={handleDelete}
											/>
										))}
									</Fragment>
								))}
							</div>
						</InfiniteScroll>
					)}
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
}
