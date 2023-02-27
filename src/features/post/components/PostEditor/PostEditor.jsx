import { ContentEditor, EditAudience, PollEditor, ToolBar } from './components';
import { getImageWithDimension, uploadImage } from 'utils/cloundinaryUtils';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Avatar } from 'components/DataDisplay';
import { CloseButton } from 'components/Action';
import Layer from 'components/Layout/Layer';
import PreviewBox from './components/PreviewBox';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { convertToRaw } from 'draft-js';
import { extractHashtags } from './utils/editorUtils';
import { useSelector } from 'react-redux';
import useUploadImage from 'hooks/useUploadImage';

const PostEditor = ({ initial, onSubmit, autoFocus }) => {
	const avatar = useSelector((state) => state.auth.user?.avatar);
	const lastName = useSelector((state) => state.auth.user?.lastName);

	const userId = useSelector((state) => state.auth.user?._id);
	const [placeholder, setPlaceholder] = useState(
		`What's new, ${lastName ? lastName : 'friend'}?`,
	);

	const [visibility, setVisibility] = useState(initial.visibility);
	const [photos, setPhotos] = useState(initial.photos || []);
	const [isValid, setIsValid] = useState(true);
	const [isDirty, setIsDirty] = useState(false);
	const [dirtyFields, setDirtyFields] = useState([]);
	const [hasContent, setHasContent] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isFocused, setIsFocused] = useState(autoFocus);
	const [isOpenPoll, setIsOpenPoll] = useState(initial.poll ? true : false);
	const [isPollValid, setIsPollValid] = useState(false);

	const {
		open,
		files: photoFiles,
		getRootProps,
		onPaste,
		previews,
		isDragActive,
		removeByPreview,
		removeAll,
	} = useUploadImage({
		defaultImagesProp: initial.photos,
		onRemoveDefaultImage: (image) => {
			setPhotos(photos.filter((photo) => photo.url !== image.url));
		},
		multiple: true,
	});

	const contentEditorRef = useRef(null);
	const pollEditorRef = useRef(null);

	const uploadPostImages = async (file, userId) => {
		if (!file.length) return [];
		const publicIds = await Promise.all(
			file.map((file) => uploadImage(file, `${userId}/posts`, true)),
		);
		const postingWidthPhotos = publicIds.length > 1 ? 500 : 1000;
		return publicIds.map((publicId) => ({
			publicId,
			url: getImageWithDimension({
				publicId,
				width: postingWidthPhotos,
			}),
		}));
	};

	const getDataEditor = () => {
		if (!hasContent) return {};
		const editorState = contentEditorRef.current.editorState;
		const currentContentState = editorState.getCurrentContent();
		const raw = convertToRaw(currentContentState);
		const entityMap = raw.entityMap;
		const mentions = [];
		Object.values(entityMap).forEach((entity) => {
			if (entity.type === 'mention') {
				mentions.push(entity.data.mention._id);
			}
		});
		return {
			content: JSON.stringify(raw),
			hashtags: extractHashtags(currentContentState.getPlainText()),
			mentions,
		};
	};

	const handlePost = async () => {
		setIsLoading(true);
		const newPost = { ...initial };
		const newPhotos = await uploadPostImages(photoFiles, userId);
		if (isOpenPoll) {
			newPost.poll = pollEditorRef.current.getPoll();
		} else newPost.poll = null;

		Object.assign(newPost, {
			...getDataEditor(),
			photos: [...photos, ...newPhotos],
			visibility,
		});
		onSubmit(newPost);
		setIsLoading(false);
		handleReset();
	};

	const handleReset = () => {
		setIsFocused(false);
		setIsValid(true);
		setIsDirty(false);
		setDirtyFields([]);
		setHasContent(false);
		setPhotos([]);
		contentEditorRef.current.reset();
		setIsOpenPoll(false);
		removeAll();
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

	useEffect(() => {
		if (isOpenPoll) {
			if (hasContent && isPollValid) setIsValid(true);
			else setIsValid(false);
		} else {
			if (hasContent || photoFiles.length > 0 || photos.length > 0)
				setIsValid(true);
			else setIsValid(false);
		}
	}, [hasContent, photoFiles, photos, isPollValid, isOpenPoll]);

	useEffect(() => {
		handleDirty('visibility', visibility !== initial.visibility);
	}, [handleDirty, initial.visibility, visibility]);

	useEffect(() => {
		handleDirty('photos', photos.length !== initial.photos?.length);
	}, [handleDirty, initial.photos?.length, photos]);

	useEffect(() => {
		handleDirty('photos', photoFiles.length > 0);
	}, [handleDirty, photoFiles]);

	useEffect(() => {
		if (isOpenPoll) {
			setPlaceholder('What do you want to ask?');
			if (!initial.poll) handleDirty('poll', true);
			else handleDirty('poll', false);
		} else {
			setPlaceholder(`What's new, ${lastName ? lastName : 'friend'}?`);
			if (initial.poll) handleDirty('poll', true);
			else handleDirty('poll', false);
		}
	}, [handleDirty, initial.poll, isOpenPoll, lastName]);

	const handleContentEmpty = useCallback((isEmpty) => {
		setHasContent(!isEmpty);
	}, []);

	const handleContentDirty = useCallback(
		(isDirty) => {
			handleDirty('content', isDirty);
		},
		[handleDirty],
	);

	return (
		<Layer
			className={clsx(
				'flex w-full transform flex-col rounded-xl pt-4 shadow transition-all',
				isFocused && 'min-h-[160px]',
			)}
		>
			<div className="flex flex-1">
				<div className="pl-4 pr-2">
					<Avatar src={avatar} />
				</div>
				<div className="flex flex-1 flex-col pr-4">
					{isFocused && (
						<EditAudience
							onChange={setVisibility}
							defaultValue={visibility}
						/>
					)}
					<div
						{...getRootProps()}
						onPaste={onPaste}
						onClick={() => {
							setIsFocused(true);
						}}
						className="relative w-full rounded-xl"
					>
						<ContentEditor
							placeholder={placeholder}
							className="my-2"
							initial={initial.content}
							onEmptyChange={handleContentEmpty}
							onDirtyChange={handleContentDirty}
							autoFocus={isFocused}
							ref={contentEditorRef}
						/>

						{!!previews.length && (
							<PreviewBox
								previews={previews}
								onRemove={removeByPreview}
								className="border-normal mb-3 w-full rounded-xl border p-1"
							/>
						)}

						{isOpenPoll && (
							<div className="relative">
								<PollEditor
									ref={pollEditorRef}
									onValidChange={setIsPollValid}
									onDirtyChange={(isDirty) =>
										handleDirty('poll', isDirty)
									}
									initial={initial.poll}
								/>
								<CloseButton
									onClick={() => setIsOpenPoll(false)}
									className="absolute top-2 right-5"
								/>
							</div>
						)}

						{isDragActive && (
							<div className="absolute inset-0 animate-pulse rounded-xl border-2 border-dashed border-primary-500 bg-black/50" />
						)}
					</div>
				</div>
			</div>
			{isFocused && (
				<div className="h-[1px] w-full bg-slate-200 px-4 dark:bg-dark-700"></div>
			)}
			<ToolBar
				setIsFocused={setIsFocused}
				onPoll={() => {
					setIsOpenPoll(true);
					setIsFocused(true);
				}}
				onUploadImage={open}
				onSubmit={handlePost}
				disabled={!isValid || !isDirty}
				isLoading={isLoading}
			/>
		</Layer>
	);
};

PostEditor.propTypes = {
	initial: PropTypes.object,
};

PostEditor.defaultProps = {
	initial: {
		content: '',
		hashtags: [],
		mentions: [],
		visibility: 'public',
		photos: [],
		poll: null,
	},
};

export default PostEditor;
