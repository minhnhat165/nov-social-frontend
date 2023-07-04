import { useParams, useSearchParams } from 'react-router-dom';

import Head from 'components/Head/Head';
import Post from 'features/post/components/Post/Post';
import React from 'react';
import { getPost } from 'api/postApi';
import { useQuery } from 'react-query';

export const Main = () => {
	const { id } = useParams();
	const [searchParams] = useSearchParams();
	const { data, isSuccess } = useQuery(['post', id], () => {
		return getPost({
			id,
			queryParams: {
				commentId: searchParams.get('commentId'),
			},
		});
	});

	return (
		<div className="overflow-y-overlay flex h-full justify-center pt-14">
			<Head />
			{isSuccess && (
				<div className="w-[590px]">
					<Post id={id} post={data.post} />
				</div>
			)}
		</div>
	);
};
