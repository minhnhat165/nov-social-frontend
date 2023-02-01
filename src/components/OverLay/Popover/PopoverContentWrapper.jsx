import Layer from 'components/Layout/Layer';
import { forwardRef } from 'react';

const PopoverContentWrapper = forwardRef(
	({ children, arrow, ...props }, ref) => {
		return (
			<Layer ref={ref} {...props} id="tooltip" role="tooltip">
				{children}
				{arrow && <div id="arrow" data-popper-arrow></div>}
			</Layer>
		);
	}
);

export default PopoverContentWrapper;
