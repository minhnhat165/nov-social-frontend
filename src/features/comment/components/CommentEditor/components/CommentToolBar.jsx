import { FaceSmileIcon, PaperAirplaneIcon, PhotoIcon } from 'components/Icon';

import { IconButton } from 'components/Action';
import Picker from '@emoji-mart/react';
import { Popover } from 'components/OverLay';
import data from '@emoji-mart/data';
import { useCommentEditor } from '../context';
import useDarkMode from 'hooks/useDarkMode';

export const CommentToolBar = ({ onSubmit, onUploadImage, onAddEmoji }) => {
	const { setIsFocused, isValid, isDirty, isLoading } = useCommentEditor();
	const [isDarkMode] = useDarkMode();

	const handleTriggerImage = () => {
		setIsFocused(true);
		onUploadImage();
	};

	return (
		<div className="mt-auto flex items-center justify-end">
			<Popover
				render={(attrs) => (
					<Popover.Content {...attrs}>
						<Picker
							theme={isDarkMode ? 'dark' : 'light'}
							previewPosition="none"
							data={data}
							onEmojiSelect={({ native: emoji }) => {
								onAddEmoji(emoji);
							}}
						/>
					</Popover.Content>
				)}
			>
				<div>
					<IconButton
						variant="text"
						color="secondary"
						size="sm"
						rounded
					>
						<FaceSmileIcon />
					</IconButton>
				</div>
			</Popover>
			<IconButton
				disabled={isLoading}
				onClick={handleTriggerImage}
				size="sm"
				color="secondary"
				variant="text"
				className={'dark:hover:bg-dark-500'}
				rounded
			>
				<PhotoIcon />
			</IconButton>
			<IconButton
				disabled={!isValid || !isDirty}
				loading={isLoading}
				variant="text"
				size="sm"
				rounded
				onClick={onSubmit}
			>
				<PaperAirplaneIcon />
			</IconButton>
		</div>
	);
};
