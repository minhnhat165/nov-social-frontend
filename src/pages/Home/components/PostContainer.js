import React, { useEffect, useRef, useState } from 'react';
import { getPosts } from '../../../api/postApi';
import PostCreate from '../../../components/Post/PostCreate';
import PostList from '../../../components/Post/PostList';
import PostCardLoading from '../../../components/Loading/SkeletonLoading/PostCardLoading';
import { LIMIT_POST_LOAD } from '../../../constants';
import { usePostListContext } from '../../../contexts/PostListContext';

const PostContainer = () => {
	const { addPosts, postList, setPostList } = usePostListContext();
	const [stopLoad, setStopLoad] = useState(false);
	const triggerRef = useRef(null);
	const endPoint = useRef(null);
	const isFirstLoad = useRef(false);
	const stop = useRef(false);
	const isFetching = useRef(false);
	useEffect(() => {
		let mounted = true;
		const getPostList = async () => {
			try {
				const res = await getPosts('', LIMIT_POST_LOAD);
				if (!mounted) return;
				const data = res.data.data;
				setPostList(data);
				isFirstLoad.current = true;
				if (data.length < LIMIT_POST_LOAD) {
					stop.current = true;
					setStopLoad(true);
				} else endPoint.current = data[data.length - 1].createdAt;
			} catch (error) {
				console.log(error);
			}
		};
		getPostList();
		return () => {
			mounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handleLoadMore = async () => {
		if (stop.current || !isFirstLoad.current || isFetching.current) return;
		try {
			isFetching.current = true;
			const res = await getPosts(endPoint.current, LIMIT_POST_LOAD);
			const data = res.data.data;
			addPosts(data);
			if (data.length < LIMIT_POST_LOAD) {
				stop.current = true;
				setStopLoad(true);
			} else endPoint.current = data[data.length - 1].createdAt;
		} catch (error) {
			console.log(error);
		}
		isFetching.current = false;
	};
	useEffect(() => {
		const trigger = triggerRef.current;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				handleLoadMore();
			}
		});
		if (trigger) observer.observe(trigger);
		return () => {
			if (trigger) observer.unobserve(trigger);
		};
	}, []);

	return (
		<>
			<div className="pb-4">
				<PostCreate />
			</div>
			<PostList postList={postList} />
			<div className="relative flex w-full items-center justify-center">
				<div
					ref={triggerRef}
					className="absolute -top-20 h-10 w-10"
				></div>
			</div>
			{!stopLoad && (
				<div className="flex w-full flex-col gap-4 pb-4">
					<PostCardLoading />
					<PostCardLoading />
				</div>
			)}
		</>
	);
};

export default PostContainer;
