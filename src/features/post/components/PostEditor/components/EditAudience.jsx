import {
	ChevronUpDownIcon,
	Cog6ToothIcon,
	GlobeAsiaAustraliaIcon,
	LockClosedIcon,
	UserIcon,
} from 'components/Icon';
import React, { useMemo } from 'react';
import { Select, SelectTrigger } from 'components/DataEntry';

import { IconWrapper } from 'components/DataDisplay';
import PropTypes from 'prop-types';

const EditAudience = ({ onChange, defaultValue }) => {
	const options = useMemo(() => {
		return [
			{
				icon: <GlobeAsiaAustraliaIcon />,
				label: 'Public',
				value: 'public',
				defaultSelected: defaultValue === 'public',
			},
			{
				icon: <UserIcon />,

				label: 'Follower',
				value: 'friends',
				defaultSelected: defaultValue === 'followers',
			},
			{
				icon: <LockClosedIcon />,
				label: 'Only me',
				value: 'private',
				defaultSelected: defaultValue === 'private',
			},
			{
				icon: <Cog6ToothIcon />,
				label: 'Custom',
				value: 'custom',
				defaultSelected: defaultValue === 'custom',
			},
		];
	}, [defaultValue]);

	return (
		<Select onChange={onChange}>
			<SelectTrigger className="h-8 text-sm">
				{({ selectedOption, setTriggerRef, toggleSelect }) => (
					<div
						ref={setTriggerRef}
						onClick={toggleSelect}
						className="mb-[10px] flex w-fit min-w-[96px] shrink-0 cursor-pointer items-center gap-1 rounded-full bg-primary-700 py-0.5 px-2 text-sm text-slate-50 dark:bg-primary-500  dark:text-dark-700 dark:hover:bg-primary-300"
					>
						{selectedOption?.label || 'Public'}
						<IconWrapper size={4} className="ml-auto">
							<ChevronUpDownIcon />
						</IconWrapper>
					</div>
				)}
			</SelectTrigger>

			<Select.Options className="w-36 shadow-3xl">
				{options.map((option) => (
					<Select.Option
						key={option.value}
						value={option.value}
						defaultSelected={option.defaultSelected}
					>
						<div className="flex items-center gap-1">
							<IconWrapper size={4}>{option.icon}</IconWrapper>
							<span>{option.label}</span>
						</div>
					</Select.Option>
				))}
			</Select.Options>
		</Select>
	);
};
EditAudience.propTypes = {
	onChange: PropTypes.func,
};

export { EditAudience };
