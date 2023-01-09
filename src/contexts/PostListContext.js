import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Context = createContext(null);

export const usePostListContext = () => useContext(Context);

const PostListContextProvider = ({ children }) => {
	const socket = useSelector((state) => state.socket.socket);
	const [postList, setPostList] = useState([]);

	const addPosts = (posts) => setPostList((prev) => [...prev, ...posts]);

	const addPost = (post) => setPostList((prev) => [post, ...prev]);

	const removePost = (postId) =>
		setPostList((prev) => prev.filter((post) => post._id !== postId));

	const updatePost = (updatedPost) =>
		setPostList((prev) =>
			prev.map((post) => {
				if (post._id === updatedPost._id) return updatedPost;
				return post;
			})
		);

	const toggleLikeLocalPost = (postId, postLikes) => {
		setPostList((prev) =>
			prev.map((post) => {
				if (post._id === postId) {
					return { ...post, likes: postLikes };
				}
				return post;
			})
		);
	};

	useEffect(() => {
		if (!socket) return;
		socket.on('toggle like post response', ({ postId, postLikes }) => {
			toggleLikeLocalPost(postId, postLikes);
		});
		return () => {
			if (!socket) return;
			socket.off('toggle like post response');
		};
	}, [socket]);

	return (
		<Context.Provider
			value={{
				postList,
				setPostList,
				addPosts,
				addPost,
				removePost,
				updatePost,
				toggleLikeLocalPost,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default PostListContextProvider;
