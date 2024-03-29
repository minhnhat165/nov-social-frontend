import { DropdownDatePicker } from '../DropdownDatePicker';
import PropTypes from 'prop-types';
import WrapperField from '../WrapperField';
import { useId } from 'react';

export const InputDate = ({
	size,
	label,
	error,
	helper,
	initialValue,
	onChange,
}) => {
	const id = useId();
	return (
		<WrapperField
			label={label}
			htmlId={id}
			error={error}
			size={size}
			helper={helper}
			className="w-full"
		>
			<DropdownDatePicker
				size={size}
				initialDate={initialValue}
				onChange={(value) => onChange(value)}
			/>
		</WrapperField>
	);
};

InputDate.propTypes = {
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	label: PropTypes.string,
	className: PropTypes.string,
	error: PropTypes.string,
	helper: PropTypes.string,
	placeholder: PropTypes.string,
	registration: PropTypes.object,
	type: PropTypes.oneOf(['date']),
	initialValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Date),
	]),
};

InputDate.defaultProps = {
	size: 'md',
	type: 'date',
	initialValue: null,
};
