import React from 'react';
import PostListContextProvider from '../../../contexts/PostListContext';
import PostContainer from './PostContainer';
const Main = () => {
	return (
		<div className="flex h-full w-full flex-col">
			<PostListContextProvider>
				<PostContainer />
			</PostListContextProvider>
		</div>
	);
};

export default Main;
