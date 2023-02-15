const XIcon = ({ color, ...props }) => (
	<svg viewBox="0 0 100 100" className="animate-x" {...props}>
		<path
			d="M10 10 L90 90"
			stroke={color}
			strokeWidth="15"
			strokeLinecap="round"
		/>
		<path
			d="M90 10 L10 90"
			stroke={color}
			strokeWidth="15"
			strokeLinecap="round"
		/>
	</svg>
);

export default XIcon;
