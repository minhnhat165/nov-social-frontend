import PropTypes from 'prop-types';
import { SlideFrom } from 'components/Effect/Transition';
import clsx from 'clsx';

const labelStyles = {
	sm: 'text-sm pb-1',
	md: 'text-base pb-1',
	lg: 'text-base pb-2',
	xl: 'text-xl pb-3',
};

const WrapperField = ({ label, htmlId, error, helper, children, size }) => {
	return (
		<div className="w-full">
			{label && (
				<label
					htmlFor={htmlId}
					className={clsx(
						'mt-2 flex cursor-pointer font-bold capitalize text-slate-800 dark:text-dark-200',
						labelStyles[size],
					)}
				>
					{label}
				</label>
			)}
			{children}
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
	label: '',
	htmlId: 'htmlId',
	error: '',
	size: 'md',
	helper: '',
};

export default WrapperField;
