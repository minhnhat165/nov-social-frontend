import {
	EditAudience,
	PostPhotoEditor,
	PostPollEditor,
	PostTextEditor,
	ToolBar,
} from './components';
import { getDataEditor, uploadPostImages } from './utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Avatar } from 'components/DataDisplay';
import { Divider } from 'components/Layout';
import Layer from 'components/Layout/Layer';
import { POST } from 'constants/post';
import { PostEditorContext } from './context';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

export const editorModes = {
	CREATE: 'create',
	EDIT: 'edit',
};

const PostEditor = ({ initial, onSubmit, autoFocus, mode, onCanceled }) => {
	const fullName = useSelector((state) => state.auth.user?.name);
	const lastName = useMemo(() => {
		if (!fullName) return 'friend';
		const name = fullName.split(' ');
		return name[name.length - 1];
	}, [fullName]);

	const userId = useSelector((state) => state.auth.user?._id);
	const [placeholder, setPlaceholder] = useState(`What's new, ${lastName}?`);
	const [isValid, setIsValid] = useState(false);
	const [isDirty, setIsDirty] = useState(false);
	const [dirtyFields, setDirtyFields] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isFocused, setIsFocused] = useState(autoFocus);

	const [hasContent, setHasContent] = useState(false);
	const [hasPhoto, setHasPhoto] = useState(initial?.photos.length > 0);
	const [hasPoll, setHasPoll] = useState(
		initial?.poll &&
			typeof initial.poll === 'object' &&
			initial.poll !== null
			? true
			: false,
	);

	const contentEditorRef = useRef(null);
	const pollEditorRef = useRef(null);
	const photoEditorRef = useRef(null);
	const audienceEditorRef = useRef(null);

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const newPost = { ...initial };
			const newPhotos = await uploadPostImages(
				photoEditorRef.current.getPhotoFiles(),
				userId,
			);
			if (hasPoll) {
				newPost.poll = pollEditorRef.current.getPoll();
			} else newPost.poll = null;
			Object.assign(newPost, {
				...getDataEditor(contentEditorRef, hasContent),
				photos: [...photoEditorRef.current.getPhotos(), ...newPhotos],
				visibility: audienceEditorRef.current.getVisibility(),
			});
			await onSubmit(newPost);
			handleReset();
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
		setHasPoll(false);
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

	useEffect(() => {
		if (hasPoll) {
			setPlaceholder('What do you want to ask? (require)');
		} else {
			setPlaceholder(`What's new, ${lastName}?`);
		}
	}, [hasPoll, lastName]);

	return (
		<PostEditorContext.Provider
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
				hasPoll,
				setHasPoll,
			}}
		>
			<Layer
				responsive
				className={clsx(
					'relative z-50 flex w-full transform flex-col rounded-xl pt-4 shadow transition-all',
					isFocused && 'min-h-[160px]',
				)}
			>
				<div className="flex flex-1">
					<PostSideRight />
					<div className="flex flex-1 flex-col pr-4">
						{isFocused && <EditAudience ref={audienceEditorRef} />}
						<PostPhotoEditor ref={photoEditorRef}>
							<PostTextEditor
								placeholder={placeholder}
								contentEditorRef={contentEditorRef}
							/>

							{hasPoll && (
								<PostPollEditor pollEditorRef={pollEditorRef} />
							)}
						</PostPhotoEditor>
					</div>
				</div>
				{isFocused && <Divider />}
				<ToolBar
					onUploadImage={photoEditorRef?.current?.triggerUpload}
					onSubmit={handleSubmit}
					onCanceled={onCanceled}
				/>
			</Layer>
		</PostEditorContext.Provider>
	);
};

PostEditor.propTypes = {
	initial: PropTypes.object,
	mode: PropTypes.oneOf(Object.values(editorModes)),
};

PostEditor.defaultProps = {
	initial: {
		content: '',
		hashtags: [],
		mentions: [],
		visibility: POST.VISIBILITY.PUBLIC,
		photos: [],
		poll: null,
	},
	mode: editorModes.CREATE,
};

export default PostEditor;

function PostSideRight() {
	const avatar = useSelector((state) => state.auth.user?.avatar);
	return (
		<div className="pl-4 pr-2">
			<Avatar src={avatar} className="border-2 border-primary-500/50" />
		</div>
	);
}
