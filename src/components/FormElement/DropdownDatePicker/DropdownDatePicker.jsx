import { t } from 'i18next';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import getMaxDayOfMonth from 'utils/getMaxDayOfMonth';
import SelectField from '../SelectField';

const DropdownDatePicker = ({ initialDate, onChange }) => {
	const currentDate = new Date();
	const [month, setMonth] = useState(initialDate.getMonth());
	const [year, setYear] = useState(initialDate.getFullYear());
	const [day, setDay] = useState(initialDate.getDate());

	const maxDayOfMonth = useMemo(() => {
		return getMaxDayOfMonth(month, year);
	}, [month, year]);
	useEffect(() => {
		if (month && day && year) {
			const date = new Date(year, month, day);
			if (date === initialDate) return;
			onChange(date);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [month, day, year]);

	return (
		<div className="flex w-full flex-col gap-1">
			<div className="flex gap-2">
				<SelectField
					options={[
						{ value: 0, label: 'January' },
						{ value: 1, label: 'February' },
						{ value: 2, label: 'March' },
						{ value: 3, label: 'April' },
						{ value: 4, label: 'May' },
						{ value: 5, label: 'June' },
						{ value: 6, label: 'July' },
						{ value: 7, label: 'August' },
						{ value: 8, label: 'September' },
						{ value: 9, label: 'October' },
						{ value: 10, label: 'November' },
						{ value: 11, label: 'December' },
					]}
					label="month"
					defaultValue={month}
					onChange={(e) => {
						setMonth(e.target.value);
					}}
				/>

				<SelectField
					label={t('Day')}
					options={Array.from({ length: maxDayOfMonth }, (_, i) => ({
						value: i + 1,
						label: i + 1,
					}))}
					defaultValue={day}
					onChange={(e) => {
						setDay(e.target.value);
					}}
				/>

				<SelectField
					label={t('Year')}
					options={Array.from(
						{ length: currentDate.getFullYear() - 1900 },
						(_, i) => {
							return {
								value: 1900 + i + 1,
								label: 1900 + i + 1,
							};
						}
					).reverse()}
					defaultValue={year}
					onChange={(e) => {
						setYear(e.target.value);
					}}
				/>
			</div>
		</div>
	);
};

DropdownDatePicker.propTypes = {
	initialDate: PropTypes.instanceOf(Date),
	onChange: PropTypes.func,
};
DropdownDatePicker.defaultProps = {
	initialDate: new Date(),
	onChange: () => {},
};

export default DropdownDatePicker;
