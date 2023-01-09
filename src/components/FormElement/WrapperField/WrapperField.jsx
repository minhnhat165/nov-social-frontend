import clsx from 'clsx';
import { SlideFrom } from 'components/Effect/Transition';
import PropTypes from 'prop-types';
const sizes = {
	sm: 'text-sm',
	md: 'text-base',
	lg: 'text-base',
};
const WrapperField = ({ label, htmlId, error, helper, children, size }) => {
	return (
		<div className="mt-2">
			<label
				htmlFor={htmlId}
				className={clsx(
					'cursor-pointer pb-2 font-bold capitalize text-slate-800 dark:text-dark-200',
					sizes[size]
				)}
			>
				{label}
			</label>
			<div className="flex items-center gap-2">{children}</div>
			<div className="relative z-10">
				<SlideFrom show={!!error}>
					<span className="absolute  left-1/2 w-[94%] -translate-x-1/2 rounded-md rounded-t-none bg-red-400 p-1 text-center text-sm capitalize text-white">
						{error}
					</span>
				</SlideFrom>
			</div>
		</div>
	);
};

WrapperField.propTypes = {
	label: PropTypes.string,
	htmlId: PropTypes.string,
	error: PropTypes.string,
	children: PropTypes.node,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	helper: PropTypes.string,
};

WrapperField.defaultProps = {
	label: 'label',
	htmlId: 'htmlId',
	error: '',
	size: 'md',
	helper: '',
};

export default WrapperField;
