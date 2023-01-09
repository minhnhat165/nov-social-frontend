import { XmarkIcon } from 'components/Icon';
import IconButton from 'components/IconButton';

const CloseButton = (props) => {
	return (
		<IconButton
			type="button"
			rounded
			size="sm"
			variant="text"
			color="light"
			{...props}
		>
			<XmarkIcon className="text-lg" />
		</IconButton>
	);
};

export default CloseButton;
