import * as ScrollArea from '@radix-ui/react-scroll-area';

import { Card, FullViewImage } from 'components/DataDisplay';

import { ArrowPathIcon } from 'components/Icon';
import { IconButton } from 'components/Action';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'components/Loading';
import { Tooltip } from 'components/OverLay';
import { getImageWithDimension } from 'utils/cloundinaryUtils';
import useGetPhotos from 'features/user/hooks/useGetPhotos';
import { useParams } from 'react-router-dom';

const PhotoPage = () => {
	const { id } = useParams();
	const {
		data: photos,
		fetchNextPage,
		hasNextPage,
		isLoading,
		refetch,
		isRefetching,
	} = useGetPhotos(id);

	return (
		<div className="relative h-screen w-screen sm:w-full sm:p-4">
			<Card
				responsive
				className=" flex h-full w-full flex-col overflow-hidden rounded-md p-2 pt-0"
			>
				<Card.Header className=" hidden items-center sm:flex">
					<Card.Title>Photos</Card.Title>
					<Tooltip content="refresh" placement="left">
						<div className="ml-auto">
							<IconButton
								size="sm"
								onClick={refetch}
								color="secondary"
								rounded
								variant="text"
							>
								<ArrowPathIcon />
							</IconButton>
						</div>
					</Tooltip>
				</Card.Header>

				<ScrollArea.Root className="relative h-full w-full flex-1 overflow-hidden rounded-lg">
					<ScrollArea.Viewport id="photos" className="h-full">
						<InfiniteScroll
							dataLength={photos.length}
							next={fetchNextPage}
							scrollThreshold={0.7}
							hasMore={hasNextPage}
							scrollableTarget="photos"
						>
							<div className="h-full w-full columns-1 gap-2 sm:columns-2 md:columns-3">
								{photos?.map((photo) => {
									const url = getImageWithDimension({
										publicId: photo._id,
										width: 600,
									});
									return (
										<div key={photo._id} className="mb-2">
											<FullViewImage src={url}>
												<img
													src={url}
													alt=""
													className="w-full rounded-lg object-cover align-middle"
												/>
											</FullViewImage>
										</div>
									);
								})}
							</div>
						</InfiniteScroll>
					</ScrollArea.Viewport>
					<ScrollArea.Scrollbar
						className="w-[0.7rem] bg-gray-300/50 p-[2px] dark:bg-gray-600/50"
						orientation="vertical"
					>
						<ScrollArea.Thumb className="rounded-md bg-gray-500/50 hover:bg-gray-500 dark:bg-gray-500 hover:dark:bg-gray-400" />
					</ScrollArea.Scrollbar>
					{(isLoading || isRefetching) && (
						<div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg backdrop-blur-sm">
							<Spinner size="xl" color="primary" />
						</div>
					)}
				</ScrollArea.Root>
			</Card>
		</div>
	);
};

export default PhotoPage;
