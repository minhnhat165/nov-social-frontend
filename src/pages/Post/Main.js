import React from 'react';
import { useParams } from 'react-router-dom';
import PostListContextProvider from '../../contexts/PostListContext';
import PostContainer from './components/PostContainer';

const MainPostPage = () => {
	const { id } = useParams();
	return (
		<div className="flex h-full">
			<div className="mx-auto basis-[640px]">
				<PostListContextProvider>
					<PostContainer id={id} />
				</PostListContextProvider>
			</div>
		</div>
	);
};

export default MainPostPage;
