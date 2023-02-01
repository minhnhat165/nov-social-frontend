import IconButton from 'components/Action/IconButton';
import IconWrapper from 'components/Icon/IconWrapper';
import { XMarkIcon } from 'components/Icon';

const CloseButton = ({ icon = <XMarkIcon />, ...props }) => {
	return (
		<IconButton
			type="button"
			rounded
			size="sm"
			variant="text"
			color="light"
			{...props}
		>
			<IconWrapper>{icon}</IconWrapper>
		</IconButton>
	);
};

export default CloseButton;
