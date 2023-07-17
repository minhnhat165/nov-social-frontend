import InfiniteScroll from 'react-infinite-scroll-component';
import Layer from 'components/Layout/Layer';
import { ProfilePreview } from 'features/user/components';
import { UserProvider } from 'features/user/context';
import { searchUser } from 'api/userApi';
import { useInfiniteQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';

const People = () => {
	const { query } = useOutletContext();
	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
		['searchUser', query],
		({ pageParam }) => {
			return searchUser({
				limit: 5,
				page: pageParam,
				query,
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
	const users = data?.pages?.flatMap((page) => page.data.items) ?? [];
	return (
		<div>
			<InfiniteScroll
				dataLength={users.length}
				next={fetchNextPage}
				scrollThreshold={0.7}
				hasMore={hasNextPage}
				scrollableTarget="notification-panel"
			>
				<div className="flex flex-col gap-2">
					{users.map((user) => (
						<UserProvider key={user._id} user={user}>
							{({ user, updateUser }) => (
								<Layer level={1}>
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
		</div>
	);
};

export default People;
