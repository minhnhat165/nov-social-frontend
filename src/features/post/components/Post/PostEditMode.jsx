import { cloneObject, getModifiedFields } from 'utils';

import PostEditor from '../PostEditor';
import { editorModes } from '../PostEditor/PostEditor';
import { useUpdatePost } from 'features/post/hooks';

export function PostEditMode({ post, setIsEditing, onUpdatePost }) {
	const { mutateAsync } = useUpdatePost({
		onSuccess: (data) => {
			setIsEditing(false);
			onUpdatePost(data);
		},
	});

	return (
		<div className="border border-primary-500 sm:rounded-xl">
			<PostEditor
				autoFocus={true}
				initial={cloneObject(post)} // clone to avoid mutating the original post
				mode={editorModes.EDIT}
				onCanceled={() => setIsEditing(false)}
				onSubmit={async (newPost) => {
					await mutateAsync({
						_id: post._id,
						...getModifiedFields(post, newPost),
					});
				}}
			/>
		</div>
	);
}
