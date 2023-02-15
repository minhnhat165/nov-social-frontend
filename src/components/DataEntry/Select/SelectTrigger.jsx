import { ChevronUpDownIcon } from 'components/Icon';
import IconWrapper from 'components/Icon/IconWrapper';
import PropTypes from 'prop-types';
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

	return (
		<button
			type="button"
			ref={setTriggerRef}
			onClick={(e) => {
				setIsOpen((prev) => !prev);
			}}
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
	children: PropTypes.node,
};

export default SelectTrigger;
