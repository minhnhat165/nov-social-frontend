import {
	getDataEditor,
	uploadCommentImages,
} from 'features/post/components/PostEditor/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Avatar } from 'components/DataDisplay';
import { CommentEditorContext } from './context';
import { CommentPhotoEditor } from './components/CommentPhotoEditor';
import { CommentTextEditor } from './components/CommentTextEditor';
import { CommentToolBar } from './components/CommentToolBar';
import Layer from 'components/Layout/Layer';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

export const editorModes = {
	CREATE: 'create',
	EDIT: 'edit',
};

export const CommentEditor = ({
	initial,
	placeholder = 'Write a comment...',
	onSubmit,
	autoFocus,
	mode,
	onCanceled,
}) => {
	const [isValid, setIsValid] = useState(true);
	const [isDirty, setIsDirty] = useState(false);
	const [dirtyFields, setDirtyFields] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isFocused, setIsFocused] = useState(autoFocus);
	const userAvatar = useSelector((state) => state.auth.user.avatar);

	const [hasContent, setHasContent] = useState(false);
	const [hasPhoto, setHasPhoto] = useState(initial?.photos.length > 0);

	const contentEditorRef = useRef(null);
	const photoEditorRef = useRef(null);

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const newComment = { ...initial };
			const newPhotos = await uploadCommentImages(
				photoEditorRef.current.getPhotoFiles(),
				newComment.path,
			);

			Object.assign(newComment, {
				...getDataEditor(contentEditorRef, hasContent),
				photos: [...newPhotos],
			});
			handleReset();
			await onSubmit(newComment);
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	const handleReset = () => {
		setIsFocused(false);
		setIsValid(true);
		setIsDirty(false);
		setDirtyFields([]);
		setHasContent(false);
		setHasPhoto(false);
		contentEditorRef.current.reset();
		photoEditorRef.current.reset();
	};
	const handleDirty = useCallback((field, isDirty) => {
		setDirtyFields((dirtyFields) => {
			if (isDirty) {
				if (!dirtyFields.includes(field))
					return [...dirtyFields, field];
				return dirtyFields;
			}
			return dirtyFields.filter((dirtyField) => dirtyField !== field);
		});
	}, []);

	useEffect(() => {
		if (dirtyFields.length > 0) setIsDirty(true);
		else setIsDirty(false);
	}, [dirtyFields]);

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey && isValid) {
			e.preventDefault();
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	};

	return (
		<CommentEditorContext.Provider
			value={{
				isLoading,
				isFocused,
				setIsFocused,
				isValid,
				isDirty,
				mode,
				initial,
				setIsValid,
				setIsDirty,
				hasContent,
				handleDirty,
				setHasContent,
				hasPhoto,
				setHasPhoto,
			}}
		>
			<Layer
				level={2}
				className={clsx(
					'flex w-full transform gap-2 shadow ',
					isFocused
						? 'flex-col rounded-xl p-2'
						: 'flex-row rounded-full p-1',
				)}
				onKeyDown={handleKeyDown}
			>
				<div className="flex flex-1">
					<div className="flex">
						<Avatar src={userAvatar} size="md" />
					</div>
					<div className="comment-content flex-1 px-2">
						<CommentPhotoEditor ref={photoEditorRef}>
							<CommentTextEditor
								placeholder={placeholder}
								contentEditorRef={contentEditorRef}
							/>
						</CommentPhotoEditor>
					</div>
				</div>
				<CommentToolBar
					onUploadImage={photoEditorRef?.current?.triggerUpload}
					onSubmit={handleSubmit}
					onCanceled={onCanceled}
				/>
			</Layer>
		</CommentEditorContext.Provider>
	);
};

CommentEditor.propTypes = {
	initial: PropTypes.object,
	mode: PropTypes.oneOf(Object.values(editorModes)),
};

CommentEditor.defaultProps = {
	initial: {
		content: '',
		hashtags: [],
		mentions: [],
		photos: [],
	},
	mode: editorModes.CREATE,
};
