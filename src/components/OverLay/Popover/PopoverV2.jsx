import Tippy from '@tippyjs/react/headless';

const Popover = ({ children, content }) => {
	return (
		<Tippy
			render={(attrs) => (
				<div
					{...attrs}
					className="rounded-md bg-slate-700 p-2 text-slate-50"
				>
					{content}
				</div>
			)}
		>
			{children}
		</Tippy>
	);
};

export default Popover;
