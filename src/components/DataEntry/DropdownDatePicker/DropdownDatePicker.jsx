import PropTypes, { oneOfType } from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

import { Select } from '../Select';
import clsx from 'clsx';
import getMaxDayOfMonth from 'utils/getMaxDayOfMonth';
import getMonthString from 'utils/getMonthString';

const currentDate = new Date();
const sizes = {
	sm: 'h-9 px-3 text-sm !rounded-lg',
	md: 'h-10 px-4 text-base !rounded-lg',
	lg: 'h-12 px-4 text-base !rounded-xl',
	xl: 'h-14 px-4 text-base !rounded-xl',
};
export const DropdownDatePicker = ({ initialDate, onChange, size }) => {
	const [defaultMonth] = useState(initialDate?.getMonth());
	const [defaultYear] = useState(initialDate?.getFullYear());
	const [defaultDay] = useState(initialDate?.getDate());

	const [month, setMonth] = useState(defaultMonth);
	const [year, setYear] = useState(defaultYear);
	const [day, setDay] = useState(defaultDay);

	const maxDayOfMonth = useMemo(() => {
		return getMaxDayOfMonth(month, year);
	}, [month, year]);
	useEffect(() => {
		if (month && day && year) {
			const date = new Date(year, month, day);
			onChange(date);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [month, day, year]);

	const monthOptions = useMemo(() => {
		const options = Array.from({ length: 12 }, (_, i) => {
			return {
				value: i,
				label: getMonthString(i),
			};
		});

		return options.map((option) => {
			return (
				<Select.Option
					defaultSelected={option.value === defaultMonth}
					key={option.value}
					value={option.value}
				>
					{option.label}
				</Select.Option>
			);
		});
	}, [defaultMonth]);

	const dayOptions = useMemo(() => {
		const options = Array.from({ length: maxDayOfMonth }, (_, i) => {
			return {
				value: i + 1,
				label: i + 1,
			};
		});

		return options.map((option) => {
			return (
				<Select.Option
					defaultSelected={option.value === defaultDay}
					key={option.value}
					value={option.value}
				>
					{option.label}
				</Select.Option>
			);
		});
	}, [defaultDay, maxDayOfMonth]);

	const yearOptions = useMemo(() => {
		const options = Array.from({ length: 100 }, (_, i) => {
			return {
				value: currentDate.getFullYear() - i,
				label: currentDate.getFullYear() - i,
			};
		});

		return options.map((option) => {
			return (
				<Select.Option
					defaultSelected={option.value === defaultYear}
					key={option.value}
					value={option.value}
				>
					{option.label}
				</Select.Option>
			);
		});
	}, [defaultYear]);

	return (
		<div className="flex w-full flex-col gap-1">
			<div className="flex justify-between gap-2">
				<Select onChange={(value) => setMonth(value)}>
					<Select.Trigger
						className={clsx(
							'!bg-slate-100 dark:!bg-dark-700',
							sizes[size],
						)}
					>
						Month
					</Select.Trigger>
					<Select.Options>{monthOptions}</Select.Options>
				</Select>

				<Select
					onChange={(value) => {
						setDay(value);
					}}
				>
					<Select.Trigger
						className={clsx(
							'!bg-slate-100 dark:!bg-dark-700',
							sizes[size],
						)}
					>
						Day
					</Select.Trigger>
					<Select.Options>{dayOptions}</Select.Options>
				</Select>

				<Select
					onChange={(value) => {
						setYear(value);
					}}
				>
					<Select.Trigger
						className={clsx(
							'!bg-slate-100 dark:!bg-dark-700',
							sizes[size],
						)}
					>
						Year
					</Select.Trigger>
					<Select.Options>{yearOptions}</Select.Options>
				</Select>
			</div>
		</div>
	);
};

DropdownDatePicker.propTypes = {
	initialDate: oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
	onChange: PropTypes.func,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};
DropdownDatePicker.defaultProps = {
	// initialDate: new Date(),
	onChange: () => {},
	size: 'md',
};
