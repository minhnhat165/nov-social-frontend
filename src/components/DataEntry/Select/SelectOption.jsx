import { forwardRef, useEffect } from 'react';

import { CircleCheckIcon } from 'components/Icon';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelectContext } from './Select';

const SelectOption = forwardRef(
	(
		{ as, value, isHover, isSelected, children, defaultSelected, ...props },
		ref,
	) => {
		const { setOptions, setSelectedOption } = useSelectContext();
		// in dev mode, this will cause a warning
		const Tag = as;

		useEffect(() => {
			if (defaultSelected) {
				setSelectedOption({ value, label: children });
			}
			setOptions((prev) => {
				if (prev.some((option) => option.value === value)) return prev;
				return [...prev, { value, label: children }];
			});
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		return (
			<Tag
				{...props}
				ref={ref}
				className={clsx(
					' flex h-10 cursor-pointer items-center justify-between rounded-lg px-2 text-[15px]',
					isSelected
						? 'select-none font-bold text-primary-700 dark:text-primary-500'
						: 'text-normal',
					isHover &&
						'bg-primary-50 !text-primary-700 dark:bg-primary-900/20 dark:!text-primary-500',
				)}
			>
				{children}
				{isSelected && (
					<CircleCheckIcon className="h-5 w-5 text-primary-700 transition-colors" />
				)}
			</Tag>
		);
	},
);

SelectOption.propTypes = {
	as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	isHover: PropTypes.bool,
	isSelected: PropTypes.bool,
	children: PropTypes.node,
	defaultSelected: PropTypes.bool,
};

SelectOption.defaultProps = {
	as: 'li',
	isHover: false,
	isSelected: false,
	children: null,
	defaultSelected: false,
};

export default SelectOption;
