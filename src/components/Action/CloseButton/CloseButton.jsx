import { IconButton } from '../IconButton';
import { IconWrapper } from 'components/DataDisplay';
import { XMarkIcon } from 'components/Icon';

export const CloseButton = ({
	icon = <XMarkIcon />,
	size = 'sm',
	...props
}) => {
	return (
		<IconButton
			type="button"
			rounded
			size={size}
			color="secondary"
			{...props}
		>
			<IconWrapper>{icon}</IconWrapper>
		</IconButton>
	);
};
