import {
	MagnifyingGlassMinusIcon,
	MagnifyingGlassPlusIcon,
} from 'components/Icon';

import { IconWrapper } from 'components/DataDisplay';
import { useEffect } from 'react';
import useLongPress from 'hooks/useLongPress';

export const Slider = ({
	defaultValue = 0,
	min = 0,
	max = 100,
	value,
	setValue,
	onChange = () => {},
	step = 1,
	...props
}) => {
	useEffect(() => {
		onChange(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const handleIncrease = () => {
		setValue((prev) => (prev + step >= max ? max : prev + step));
	};

	const handleDecrease = () => {
		setValue((prev) => (prev - step <= min ? min : prev - step));
	};

	const defaultOptions = {
		shouldPreventDefault: true,
		delay: 50,
	};

	const longPressDecrease = useLongPress(
		handleDecrease,
		handleDecrease,
		defaultOptions,
	);

	const longPressIncrease = useLongPress(
		handleIncrease,
		handleIncrease,
		defaultOptions,
	);

	return (
		<div className="flex w-full items-center justify-center">
			<div className="clickable text-normal" {...longPressDecrease}>
				<IconWrapper>
					<MagnifyingGlassMinusIcon />
				</IconWrapper>
			</div>
			<input
				type="range"
				min={min}
				max={max}
				value={value}
				step={step}
				{...props}
				onChange={(e) => {
					setValue(+e.target.value);
				}}
				className="mx-2 h-1 w-full cursor-pointer appearance-none rounded-lg bg-primary-500/50 accent-primary-700 dark:bg-primary-300/50 dark:accent-primary-500"
			/>
			<div className="clickable text-normal" {...longPressIncrease}>
				<IconWrapper>
					<MagnifyingGlassPlusIcon />
				</IconWrapper>
			</div>
		</div>
	);
};
