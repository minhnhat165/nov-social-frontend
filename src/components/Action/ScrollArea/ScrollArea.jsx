import './ScrollArea.css';

import {
	Corner,
	Root,
	Scrollbar,
	Thumb,
	Viewport,
} from '@radix-ui/react-scroll-area';

export const ScrollArea = ({
	children,
	thumbStyle = 'dark:bg-gray-500 bg-gray-700 opacity-50',
	className,
}) => {
	return (
		<Root
			className={`ScrollAreaRoot h-full w-full overflow-hidden  ${className}`}
		>
			<Viewport className="ScrollAreaViewport h-full w-full">
				{children}
			</Viewport>
			<Scrollbar
				className="ScrollAreaScrollbar rounded-sm"
				orientation="vertical"
			>
				<Thumb className={`ScrollAreaThumb ${thumbStyle}`} />
			</Scrollbar>
			<Corner className="ScrollAreaCorner" />
		</Root>
	);
};
