import React from 'react';
import { Popover as PopoverLib } from 'react-tiny-popover';

const Popover = ({ children, content }) => {
	const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
	return (
		<PopoverLib
			isOpen={isPopoverOpen}
			positions={['right']}
			content={content}
		>
			<div onClick={() => setIsPopoverOpen((prev) => !prev)}>
				{children}
			</div>
		</PopoverLib>
	);
};

export default Popover;
