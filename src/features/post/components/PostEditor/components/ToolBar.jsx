import { Button, IconButton } from 'components/Action';
import {
	ClockIcon,
	ColorPaletteIcon,
	FaceSmileIcon,
	ImageIcon,
	MapPinIcon,
	PollIcon,
} from 'components/Icon';

import { editorModes } from '../PostEditor';
import { usePostEditor } from '../context';

export const ToolBar = ({ onSubmit, onUploadImage, onCanceled }) => {
	const {
		isLoading,
		setIsFocused,
		isValid,
		isDirty,
		mode,
		hasPoll,
		setHasPoll,
	} = usePostEditor();

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
					onClick={handleTriggerImage}
					variant="text"
					size="sm"
					rounded
				>
					<ImageIcon />
				</IconButton>
				<IconButton
					onClick={handleTriggerPoll}
					variant="text"
					size="sm"
					rounded
				>
					<PollIcon />
				</IconButton>
				<IconButton variant="text" size="sm" rounded>
					<ColorPaletteIcon />
				</IconButton>
				<IconButton variant="text" size="sm" rounded>
					<FaceSmileIcon />
				</IconButton>
				<IconButton variant="text" size="sm" rounded>
					<ClockIcon />
				</IconButton>
				<IconButton variant="text" size="sm" rounded>
					<MapPinIcon />
				</IconButton>
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
