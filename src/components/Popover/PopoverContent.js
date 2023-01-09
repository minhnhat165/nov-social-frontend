import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const PopoverContent = ({ children, id }) => {
	useEffect(() => {
		const popoverEl = document.getElementById(id);
		const popoverContentEl = document.getElementById(id + '-content');
		const parentScroll = document.getElementById(id).closest('.scrollAble');
		const handleChangePositionContent = () => {
			const { left, top, height } = popoverEl.getBoundingClientRect();
			popoverContentEl.style.left = left + 'px';
			popoverContentEl.style.top = top + window.screenY + height + 'px';
		};
		console.log(parentScroll);
		handleChangePositionContent();
		window.addEventListener('resize', handleChangePositionContent);
		return () => {
			window.removeEventListener('resize', handleChangePositionContent);
		};
	}, []);

	return createPortal(
		<div id={id + '-content'} className="absolute">
			{children}
		</div>,
		document.getElementById('root')
	);
};

export default PopoverContent;
