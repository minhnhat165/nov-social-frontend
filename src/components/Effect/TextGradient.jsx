import clsx from 'clsx';
const TextGradient = ({ className, color, children }) => {
	return (
		<span
			className={clsx(
				`bg-gradient-to-r bg-clip-text font-bold  uppercase text-transparent`,
				color,
				className
			)}
		>
			{children}
		</span>
	);
};

export default TextGradient;
