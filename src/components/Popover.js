import { AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import AnimationWrapper from './Animate/AnimationWrapper';
import { zoom } from './Animate/variants';

const Popover = ({
	visible: initial,
	setVisible: setInitial,
	className,
	children,
	render,
	animate = zoom,
	onHide = () => {},
	hideOnClickParent,
	placement = 'bottom center',
	hover,
	hoverDelay = 400,
	shadow,
}) => {
	const elRef = useRef();
	const [visible, setVisible] = useState(initial);

	const timerEnter = useRef(null);
	const timerLeave = useRef(null);

	const onMouseEnter = () => {
		if (timerLeave.current) {
			clearTimeout(timerLeave.current);
		}
		timerEnter.current = setTimeout(() => {
			setVisible(true);
		}, hoverDelay);
	};

	const onMouseLeave = () => {
		timerLeave.current = setTimeout(() => {
			setVisible(false);
		}, 200);
		if (timerEnter.current) {
			clearTimeout(timerEnter.current);
		}
	};

	useEffect(() => {
		setVisible(initial);
	}, [initial]);

	useEffect(() => {
		if (setInitial) setInitial(visible);
	}, [setInitial, visible]);

	useOnClickOutside(elRef, () => {
		setVisible(false);
		onHide();
	});

	const hoverProps = useMemo(() => {
		if (!hover) return {};
		return {
			onMouseEnter: onMouseEnter,
			onMouseLeave: onMouseLeave,
		};
	}, []);

	const renderPosition = useMemo(() => {
		const elementPermanent = (
			<div
				{...hoverProps}
				onClick={() => {
					if (hideOnClickParent) setVisible((prev) => !prev);
					else setVisible(true);
				}}
			>
				{children}
			</div>
		);
		const elementPopup = (
			<div className="relative z-[96]">
				<AnimatePresence>
					{visible && (
						<AnimationWrapper animation={animate}>
							<div
								{...hoverProps}
								className={`popover absolute rounded-xl ${
									shadow ? 'shadow-md shadow-[#0e0e0eab]' : ''
								} dark:border-dark-border ${placement} ${className}`}
							>
								{render}
							</div>
						</AnimationWrapper>
					)}
				</AnimatePresence>
				{hover && (
					<div
						{...hoverProps}
						className="absolute top-0 left-0 h-2 w-full"
					></div>
				)}
			</div>
		);
		if (placement.includes('top'))
			return (
				<>
					{elementPopup}
					{elementPermanent}
				</>
			);
		return (
			<>
				{elementPermanent}
				{elementPopup}
			</>
		);
	}, [
		animate,
		children,
		className,
		hideOnClickParent,
		hover,
		hoverProps,
		placement,
		render,
		visible,
	]);

	return <div ref={elRef}>{renderPosition}</div>;
};

export default Popover;
