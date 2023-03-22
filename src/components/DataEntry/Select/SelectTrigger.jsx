import PropTypes, { oneOfType } from 'prop-types';

import { ChevronUpDownIcon } from 'components/Icon';
import { IconWrapper } from 'components/DataDisplay';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useSelectContext } from '..';

const SelectTrigger = ({ children, className }) => {
	const { isOpen, setTriggerRef, setIsOpen, selectedOption, triggerRef } =
		useSelectContext();

	useEffect(() => {
		if (!isOpen && triggerRef) {
			triggerRef.focus();
		}
	}, [isOpen, triggerRef]);

	const toggleSelect = () => {
		setIsOpen((prev) => !prev);
	};

	return children && typeof children === 'function' ? (
		children({
			isOpen,
			selectedOption,
			setIsOpen,
			setTriggerRef,
			toggleSelect,
		})
	) : (
		<button
			type="button"
			ref={setTriggerRef}
			onClick={toggleSelect}
			className={clsx(
				'text-normal relative flex h-10 w-32 cursor-pointer items-center justify-between rounded-lg bg-slate-200 px-2 dark:bg-dark-900 dark:text-dark-50',
				className,
			)}
		>
			<div className="">{selectedOption?.label || children}</div>
			<IconWrapper className="-mr-2">
				<ChevronUpDownIcon />
			</IconWrapper>
		</button>
	);
};

SelectTrigger.propTypes = {
	children: oneOfType([PropTypes.node, PropTypes.func]),
};

export default SelectTrigger;
