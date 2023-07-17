import InfiniteScroll from 'react-infinite-scroll-component';
import Layer from 'components/Layout/Layer';
import { ProfilePreview } from 'features/user/components';
import { UserProvider } from 'features/user/context';
import { getRecommendations } from 'api/userApi';
import { useInfiniteQuery } from 'react-query';

const PeoplePage = () => {
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
		<div className="h-full w-full">
			<div className="flex h-full w-full p-2 sm:p-4 md:p-10">
				<InfiniteScroll
					dataLength={users.length}
					next={fetchNextPage}
					scrollThreshold={0.7}
					hasMore={hasNextPage}
					scrollableTarget="notification-panel"
				>
					<div className="flex flex-wrap justify-center gap-2 sm:gap-4">
						{users.map((user) => (
							<UserProvider key={user._id} user={user}>
								{({ user, updateUser }) => (
									<Layer level={1} className="tooltip">
										<ProfilePreview
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
		</div>
	);
};

export default PeoplePage;
