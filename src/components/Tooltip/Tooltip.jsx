import { Children, cloneElement, isValidElement, useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import PropTypes from 'prop-types';

const Tooltip = ({ children, content, placement }) => {
	const id = useId();
	const childrenWithProps = Children.map(children, (child) => {
		if (isValidElement(child)) {
			return cloneElement(child, {
				id: id,
				'data-tooltip-content': content,
				'data-tooltip-place': placement,
			});
		}
		return child;
	});
	return (
		<>
			{childrenWithProps}
			<ReactTooltip
				anchorId={id}
				className="bg-slate-800 text-slate-50 dark:bg-dark-100 dark:text-dark-800"
			/>
		</>
	);
};

Tooltip.propTypes = {
	children: PropTypes.node.isRequired,
	content: PropTypes.string.isRequired,
	placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

Tooltip.defaultProps = {
	placement: 'top',
};

export default Tooltip;
