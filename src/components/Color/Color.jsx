import PropTypes from 'prop-types';

const Color = ({ colorName }) => {
	return (
		<div>
			<ul className="flex gap-4">
				<div className={`h-10 w-10 rounded-full bg-dark-mode-50`}></div>
				<div
					className={`h-10 w-10 rounded-full bg-dark-mode-100`}
				></div>
				<div
					className={`h-10 w-10 rounded-full bg-dark-mode-200`}
				></div>
				<div
					className={`h-10 w-10 rounded-full bg-dark-mode-300`}
				></div>
				<div
					className={`h-10 w-10 rounded-full bg-dark-mode-400`}
				></div>
				<div
					className={`h-10 w-10 rounded-full bg-dark-mode-500`}
				></div>
				<div
					className={`h-10 w-10 rounded-full bg-dark-mode-600`}
				></div>
				<div
					className={`h-10 w-10 rounded-full bg-dark-mode-700`}
				></div>
				<div
					className={`h-10 w-10 rounded-full bg-dark-mode-800`}
				></div>
				<div
					className={`h-10 w-10 rounded-full bg-dark-mode-900`}
				></div>
			</ul>
		</div>
	);
};

Color.propTypes = {
	colorName: PropTypes.string,
};

Color.defaultProps = {
	colorName: 'blue',
};
export default Color;
