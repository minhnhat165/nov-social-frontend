import { Button, IconButton } from 'components/Action';
import {
	ClockIcon,
	ColorPaletteIcon,
	FaceSmileIcon,
	ImageIcon,
	MapPinIcon,
	PollIcon,
} from 'components/Icon';

export const ToolBar = ({
	onSubmit,
	disabled,
	onUploadImage,
	onPoll,
	isLoading,
	setIsFocused,
}) => {
	return (
		<div className="mt-auto flex h-14 items-center justify-between px-4">
			<div className="flex">
				<IconButton
					onClick={() => {
						setIsFocused(true);
						onUploadImage();
					}}
					variant="text"
					size="sm"
					rounded
				>
					<ImageIcon />
				</IconButton>
				<IconButton
					onClick={() => {
						setIsFocused(true);
						onPoll();
					}}
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
			<div>
				<Button
					onClick={onSubmit}
					size="sm"
					disabled={disabled}
					rounded
					className="min-w-[80px]"
					loading={isLoading}
				>
					Post
				</Button>
			</div>
		</div>
	);
};
