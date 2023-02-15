import './style.css';

import {
	ChevronUpDownIcon,
	ClockIcon,
	FaceSmileIcon,
	ImageIcon,
	LockClosedIcon,
	MapPinIcon,
	PollIcon,
} from 'components/Icon';
import {
	ContentState,
	EditorState,
	convertFromRaw,
	convertToRaw,
} from 'draft-js';
import { useMemo, useRef, useState } from 'react';

import Avatar from 'components/DataDisplay/Avatar';
import Button from 'components/Action/Button';
import ColorPaletteIcon from 'components/Icon/ColorPaletteIcon';
import Editor from '@draft-js-plugins/editor';
import IconButton from 'components/Action/IconButton';
import IconWrapper from 'components/Icon/IconWrapper';
import { Image } from 'components/DataDisplay/Card';
import ImgUploader from 'components/DataEntry/ImgUploader';
import Layer from 'components/Layout/Layer';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import { extractHashtags } from './utils/editorUtils';
import hashtagStyles from './hashtagStyles.module.css';
import { useSelector } from 'react-redux';

const PostEditor = ({ initial }) => {
	const content = useMemo(() => {
		if (initial) {
			return convertFromRaw(initial);
		}
		return ContentState.createFromText('');
	}, [initial]);

	const avatar = useSelector((state) => state.auth.user.avatar);
	const [isFocused, setIsFocused] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const lastName = useSelector((state) => state.auth.user.lastName);
	const hashtagPlugin = createHashtagPlugin({
		theme: hashtagStyles,
	});

	const plugins = [hashtagPlugin];

	const [editorState, setEditorState] = useState(() =>
		EditorState.createWithContent(content),
	);

	// Event handler to handle editor changes
	function onChange(newEditorState) {
		// Check if the editor content has changed and if the editor is not empty
		const currentContentState = newEditorState.getCurrentContent();
		if (currentContentState.getPlainText().length === 0) {
			setIsValid(false);
		} else {
			setIsValid(true);
		}
		setEditorState(newEditorState);
	}

	const handlePost = () => {
		const currentContentState = editorState.getCurrentContent();
		const raw = convertToRaw(currentContentState);
		const newPost = {
			content: JSON.stringify(raw, null, 2),
			hashtags: extractHashtags(currentContentState.getPlainText()),
		};
		console.log(newPost);
	};

	return (
		<Layer
			onClick={() => setIsFocused(true)}
			className="mb-4 flex w-full flex-col rounded-xl bg-slate-50 pt-4 shadow-md"
		>
			<ImgUploader>
				<div className="flex flex-1">
					<div className="px-4">
						<Avatar src={avatar} />
					</div>
					<div className="flex flex-1 flex-col">
						{isFocused && <EditAudience />}
						<div className="overflow-y-overlay mt-2 w-full rounded-xl pr-4">
							<div className="mb-4">
								<Editor
									plugins={plugins}
									placeholder={`What's on your mind, ${
										lastName ? lastName : 'friend'
									}?`}
									editorState={editorState}
									onChange={onChange}
								/>
							</div>
							<div className="mb-4 rounded-xl border border-dark-500 p-2">
								<ImgUploader.Preview>
									<Image className="h-auto w-full rounded-xl" />
								</ImgUploader.Preview>
							</div>
						</div>
					</div>
				</div>
				{isFocused && (
					<div className="h-[1px] w-full bg-slate-200 px-4 dark:bg-dark-500"></div>
				)}
				<div className="mt-auto flex h-14 items-center justify-between px-4">
					<div className="flex">
						<ImgUploader.Trigger>
							<IconButton variant="text" size="sm" rounded>
								<ImageIcon />
							</IconButton>
						</ImgUploader.Trigger>
						<IconButton variant="text" size="sm" rounded>
							<FaceSmileIcon />
						</IconButton>
						<IconButton variant="text" size="sm" rounded>
							<PollIcon />
						</IconButton>
						<IconButton variant="text" size="sm" rounded>
							<ClockIcon />
						</IconButton>
						<IconButton variant="text" size="sm" rounded>
							<ColorPaletteIcon />
						</IconButton>
						<IconButton variant="text" size="sm" rounded>
							<MapPinIcon />
						</IconButton>
					</div>
					<div>
						<Button
							onClick={handlePost}
							size="sm"
							disabled={!isValid}
							rounded
							className="min-w-[80px]"
						>
							Post
						</Button>
					</div>
				</div>
			</ImgUploader>
		</Layer>
	);
};

const EditAudience = () => (
	<div className="mb-4 flex w-fit min-w-[96px] shrink-0 cursor-pointer items-center gap-1 rounded-full py-0.5 px-2 text-sm dark:bg-primary-500 dark:text-dark-700 dark:hover:bg-primary-300">
		<IconWrapper size={3}>
			<LockClosedIcon />
		</IconWrapper>
		<span>Public</span>
		<IconWrapper size={4} className="ml-auto">
			<ChevronUpDownIcon />
		</IconWrapper>
	</div>
);

PostEditor.propTypes = {};

export default PostEditor;
