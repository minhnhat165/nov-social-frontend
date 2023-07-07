import { Card, Chip, FullViewImage, Img } from 'components/DataDisplay';
import { PencilIcon, PlusIcon } from 'components/Icon';
import Post, { PostSkeleton } from 'features/post/components/Post/Post';
import { useCreatePost, usePostList } from 'features/post/hooks';
import { useOutletContext, useParams } from 'react-router-dom';

import { Button } from 'components/Action';
import { Details } from 'features/user/components';
import InfiniteScroll from 'react-infinite-scroll-component';
import InterestEditor from 'features/Interest/Components/InterestEditor';
import { Modal } from 'components/OverLay';
import PostEditor from 'features/post/components/PostEditor/PostEditor';
import ReactStickyBox from 'react-sticky-box';
import { getPostsByUserId } from 'api/postApi';
import { useModal } from 'hooks/useModal';
import { useScreenMode } from 'hooks/useScreenMode';
import { useSelector } from 'react-redux';

const PostPage = () => {
	const { isOwner } = useOutletContext();

	const { isMobile } = useScreenMode();

	return (
		<div className="flex h-full flex-col items-start sm:flex-row">
			{!isMobile ? (
				<ReactStickyBox
					offsetTop={8}
					offsetBottom={8}
					className="max-w-96 mx-2 w-1/3"
				>
					<div className="flex h-full w-full flex-col pt-1 sm:gap-y-4 sm:pt-4">
						<Details isOwner={isOwner} />
						<Interests isOwner={isOwner} />
						<Photos />
					</div>
				</ReactStickyBox>
			) : (
				<div className="flex h-full w-full flex-col pt-1 sm:gap-y-4 sm:pt-4">
					<Details isOwner={isOwner} />
					<Interests isOwner={isOwner} />
					<Photos />
				</div>
			)}
			<Main />
		</div>
	);
};

export default PostPage;

function Interests({ isOwner }) {
	const interests = useSelector((state) => state.profile.data.interests);
	const { isOpen, close, open } = useModal();
	const renderAction = (interests) => {
		const isEmpty = !interests?.length;
		return (
			<>
				<Button
					onClick={open}
					rounded
					color="secondary"
					startIcon={isEmpty ? <PlusIcon /> : <PencilIcon />}
					size="sm"
				>
					{isEmpty ? 'Add' : 'Edit'}
				</Button>

				<Modal open={isOpen} onClose={close}>
					<InterestEditor
						defaultSelected={interests}
						onCancel={close}
					/>
				</Modal>
			</>
		);
	};

	return (
		<Card responsive className="w-full ">
			<Card.Header className="flex items-center justify-between">
				<Card.Title>Interest</Card.Title>
				{isOwner && renderAction(interests)}
			</Card.Header>
			{interests?.length > 0 && (
				<Card.Body className="pb-4 pt-2 ">
					<div className="-m-1">
						{interests.map((interest) => (
							<Chip
								icon={interest.icon}
								key={interest._id}
								className="m-1"
							>
								{interest.name}
							</Chip>
						))}
					</div>
				</Card.Body>
			)}
		</Card>
	);
}

function Photos() {
	const photos = useSelector((state) => state.profile.data.photos) || [];
	return (
		photos.length > 0 && (
			<Card responsive className="w-full">
				<Card.Header>
					<Card.Title>Photos</Card.Title>
				</Card.Header>
				<Card.Body className="pb-4">
					<div className="grid grid-cols-3 gap-1 overflow-hidden">
						{photos.map((photo, index) => (
							<div
								key={index}
								className="aspect-square w-full overflow-hidden rounded-xl shadow"
							>
								<FullViewImage src={photo}>
									<Img
										src={photo}
										alt=""
										className="h-full w-full object-cover"
									/>
								</FullViewImage>
							</div>
						))}
					</div>
				</Card.Body>
			</Card>
		)
	);
}

const Main = () => {
	const { id } = useParams();

	const {
		fetchNextPage,
		handleDeletePost,
		handleUpdatePost,
		handleAddPost,
		hasNextPage,
		posts,
	} = usePostList({
		queryFn: getPostsByUserId,
		queryKey: ['posts', { userId: id }],
		fnParams: { userId: id },
		limit: 5,
	});
	const { mutateAsync } = useCreatePost({
		onSuccess: (data) => {
			handleAddPost(data);
		},
	});
	return (
		<div className="flex w-screen max-w-[600px] flex-1 flex-col py-1 sm:w-fit sm:px-2 sm:py-4">
			<div className="pb-1 sm:mb-4">
				<PostEditor onSubmit={mutateAsync} />
			</div>
			<div className="flex flex-col gap-4">
				<InfiniteScroll
					dataLength={posts.length}
					next={fetchNextPage}
					scrollThreshold={0.7}
					hasMore={hasNextPage}
					loader={
						<div className="mt-1 flex flex-col gap-1 sm:mt-4 sm:gap-4">
							<PostSkeleton />
							<PostSkeleton />
							<PostSkeleton />
						</div>
					}
				>
					<div className="flex flex-col gap-1 sm:gap-4">
						{posts?.map((post) => (
							<Post
								key={post._id}
								post={post}
								onDeletePost={handleDeletePost}
								onUpdatePost={handleUpdatePost}
							/>
						))}
					</div>
				</InfiniteScroll>
			</div>
		</div>
	);
};
