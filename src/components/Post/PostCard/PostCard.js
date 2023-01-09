import { memo } from 'react';
import AnimationWrapper from '../../Animate/AnimationWrapper';
import { zoom } from '../../Animate/variants';
import CommentProvider from '../../Comment/CommentContext';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

const PostCard = ({ post }) => {
	return (
		<AnimationWrapper animation={zoom}>
			<div className="h-full w-auto rounded-xl dark:bg-dark-regular">
				<Header post={post} />
				<Body post={post} />
				<CommentProvider post={post}>
					<Footer post={post} />
				</CommentProvider>
			</div>
		</AnimationWrapper>
	);
};

export default memo(PostCard);
