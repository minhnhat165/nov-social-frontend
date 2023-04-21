import { PaperAirplaneIcon, PhotoIcon } from 'components/Icon';

import { IconButton } from 'components/Action';
import { useCommentEditor } from '../context';

export const CommentToolBar = ({ onSubmit, onUploadImage, onCanceled }) => {
	const { setIsFocused, isValid, isDirty, isLoading } = useCommentEditor();

	const handleTriggerImage = () => {
		setIsFocused(true);
		onUploadImage();
	};

	return (
		<div className="mt-auto flex items-center justify-end">
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
