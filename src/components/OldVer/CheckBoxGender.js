import React from 'react';

import Button from './ButtonOld';
import { useTranslation } from 'react-i18next';

const genders = ['female', 'male', 'other'];

const CheckBoxGender = (props) => {
	const { t } = useTranslation();
	return (
		<div className="flex flex-col gap-1">
			<label className="text-left font-bold text-light-text-bold dark:text-dark-text-regular">
				{t('Gender')}
			</label>
			<div className="flex gap-2">
				{genders.map((gender) => (
					<Button
						key={gender}
						flex-1
						p-0
						relative
						w-full
						bg-transparent
					>
						<input
							type="radio"
							name="gender"
							value={gender}
							className="peer absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 accent-blue-500"
							id={gender}
							{...props.register('gender')}
						/>
						<label
							className="flex w-full cursor-pointer items-center justify-between rounded-xl
              border border-gray-300
              bg-slate-200 p-4 font-bold 
              capitalize text-light-text-regular hover:border-primary peer-checked:border-primary-bold 
              dark:border-dark-border dark:bg-dark-regular dark:text-dark-text-regular"
							htmlFor={gender}
						>
							{t(gender)}
						</label>
					</Button>
				))}
			</div>
		</div>
	);
};

export default CheckBoxGender;
