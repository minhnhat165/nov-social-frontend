import { Button, IconButton } from 'components/Action';
import {
	ClockIcon,
	ColorPaletteIcon,
	FaceSmileIcon,
	ImageIcon,
	MapPinIcon,
	PollIcon,
} from 'components/Icon';

import Picker from '@emoji-mart/react';
import { Popover } from 'components/OverLay';
import data from '@emoji-mart/data';
import { editorModes } from '../PostEditor';
import useDarkMode from 'hooks/useDarkMode';
import { usePostEditor } from '../context';
import { useScreenMode } from 'hooks/useScreenMode';

export const ToolBar = ({
	onSubmit,
	onUploadImage,
	onCanceled,
	onAddEmoji,
}) => {
	const [isDarkMode] = useDarkMode();
	const {
		isLoading,
		setIsFocused,
		isValid,
		isDirty,
		mode,
		hasPoll,
		setHasPoll,
	} = usePostEditor();
	const { isMobile } = useScreenMode();

	const handleTriggerImage = () => {
		setIsFocused(true);
		onUploadImage();
	};

	const handleTriggerPoll = () => {
		if (hasPoll) return;
		setIsFocused(true);
		setHasPoll(true);
	};

	return (
		<div className="mt-auto flex h-14 items-center justify-between px-4">
			<div className="flex">
				<IconButton
					disabled={isLoading}
					onClick={handleTriggerImage}
					variant="text"
					size="sm"
					color="secondary"
					rounded
				>
					<ImageIcon />
				</IconButton>
				<IconButton
					disabled={isLoading}
					onClick={handleTriggerPoll}
					variant="text"
					color="secondary"
					size="sm"
					rounded
				>
					<PollIcon />
				</IconButton>
				<IconButton variant="text" color="secondary" size="sm" rounded>
					<ColorPaletteIcon />
				</IconButton>
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
				{!isMobile && (
					<>
						<IconButton
							variant="text"
							color="secondary"
							size="sm"
							rounded
						>
							<ClockIcon />
						</IconButton>
						<IconButton
							variant="text"
							color="secondary"
							size="sm"
							rounded
						>
							<MapPinIcon />
						</IconButton>
					</>
				)}
			</div>
			<div className="flex gap-2">
				{mode === editorModes.EDIT && (
					<Button
						onClick={onCanceled}
						size="sm"
						color="secondary"
						rounded
						className="min-w-[80px]"
						disabled={isLoading}
					>
						Cancel
					</Button>
				)}
				<Button
					onClick={onSubmit}
					size="sm"
					disabled={!isValid || !isDirty}
					rounded
					className="min-w-[80px]"
					loading={isLoading}
				>
					{mode === editorModes.EDIT ? 'Save' : 'Post'}
				</Button>
			</div>
		</div>
	);
};
