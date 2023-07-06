import { Avatar, Img } from 'components/DataDisplay';
import { EditorState, convertFromRaw } from 'draft-js';

import Layer from 'components/Layout/Layer';
import { Link } from 'react-router-dom';
import { Text } from 'components/Typography';
import { useMemo } from 'react';

export const BookmarkItem = ({ item }) => {
	const { post } = item;
	const { content, photos } = post;
	const initialEditorState = useMemo(() => {
		if (content) {
			return EditorState.createWithContent(
				convertFromRaw(JSON.parse(content)),
			);
		}
		return EditorState.createEmpty();
	}, [content]);

	const text = initialEditorState.getCurrentContent().getPlainText();

	return (
		<Layer level={2} className="flex h-28 w-full gap-2 p-2">
			<Layer
				level={3}
				className="aspect-square h-full shrink-0 overflow-hidden"
			>
				<Link to={`/post/${post._id}`}>
					{photos.length > 0 && (
						<Img src={photos[0].url} className="h-full w-full" />
					)}
				</Link>
			</Layer>
			<div>
				<div className="mb-2">
					<Text
						as={Link}
						to={`/post/${post._id}`}
						style={{
							display: '-webkit-box',
							WebkitLineClamp: 2,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
						className="line-clamp-2 text-base font-semibold hover:underline"
					>
						{text}
					</Text>
				</div>
				<div className="flex items-center gap-2">
					<Avatar size="sm" src={post.author.avatar} />
					<Text level={2} className="text-sm">
						save from <Text level={1}>{post.author.name}</Text>
					</Text>
				</div>
				{/* <div>
					<Text>
						<IconWrapper>
							<BookmarkSlashIcon />
						</IconWrapper>
					</Text>
				</div> */}
			</div>
		</Layer>
	);
};
