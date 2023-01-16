import React, { useId, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const SelectBox = ({ title, min, max, value, onChange }) => {
	const id = useId();
	const { t } = useTranslation();
	const optionList = useMemo(() => {
		const list = [];
		for (var i = min; i <= max; i++) {
			list.push(i);
		}
		return list;
	}, [max]);

	// print list of years to the console:
	return (
		<select
			id={id}
			value={value}
			className="flex max-h-[53.33px] w-full flex-1 cursor-pointer appearance-none flex-col gap-1 rounded-xl border border-gray-300 bg-gray-200 p-4 font-bold capitalize text-light-text-regular outline-none hover:border-primary focus:border-blue-500 focus:ring-primary dark:border-dark-border dark:bg-dark-regular dark:text-dark-text-regular dark:placeholder-gray-400 dark:hover:border-primary"
			onChange={(e) => onChange(e.target.value)}
		>
			<option className="capitalize">{t(title)}</option>
			{optionList.map((option) => (
				<option key={option} className="hover:bg-red-400" value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

export default SelectBox;
