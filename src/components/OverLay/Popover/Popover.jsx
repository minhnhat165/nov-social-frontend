import Tippy from '@tippyjs/react/headless';

const Popover = ({ children, content, ...props }) => {
	return (
		<Tippy {...props} render={(attrs) => <div {...attrs}>{content}</div>}>
			{children}
		</Tippy>
	);
};

export default Popover;
