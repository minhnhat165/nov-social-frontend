import { useId } from 'react';
import PopoverContent from './PopoverContent';

const Popover = ({ visible, hoverContent, placement, children }) => {
	const id = useId();

	return (
		<>
			{<div id={id}>{children}</div>}
			{visible && <PopoverContent id={id}>{hoverContent}</PopoverContent>}
		</>
	);
};

export default Popover;
