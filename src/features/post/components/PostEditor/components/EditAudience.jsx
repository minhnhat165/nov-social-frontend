import {
	ChevronUpDownIcon,
	Cog6ToothIcon,
	GlobeAsiaAustraliaIcon,
	LockClosedIcon,
	UserIcon,
} from 'components/Icon';
import React, {
	forwardRef,
	useImperativeHandle,
	useMemo,
	useState,
} from 'react';
import { Select, SelectTrigger } from 'components/DataEntry';

import { IconWrapper } from 'components/DataDisplay';
import { POST } from 'constants/post';
import PropTypes from 'prop-types';
import { usePostEditor } from '../context';

const EditAudience = forwardRef((props, ref) => {
	const { initial, handleDirty } = usePostEditor();
	const { visibility: defaultVisibility } = initial;

	const [visibility, setVisibility] = useState(defaultVisibility);

	const { VISIBILITY } = POST;

	const options = useMemo(() => {
		return [
			{
				icon: <GlobeAsiaAustraliaIcon />,
				label: 'Public',
				value: VISIBILITY.PUBLIC,
				defaultSelected: defaultVisibility === VISIBILITY.PUBLIC,
			},
			{
				icon: <UserIcon />,

				label: 'Follower',
				value: VISIBILITY.FOLLOWER,
				defaultSelected: defaultVisibility === VISIBILITY.FOLLOWER,
			},
			{
				icon: <LockClosedIcon />,
				label: 'Only me',
				value: VISIBILITY.PRIVATE,
				defaultSelected: defaultVisibility === VISIBILITY.PRIVATE,
			},
			{
				icon: <Cog6ToothIcon />,
				label: 'Custom',
				value: VISIBILITY.CUSTOM,
				defaultSelected: defaultVisibility === VISIBILITY.CUSTOM,
			},
		];
	}, [defaultVisibility]);

	useImperativeHandle(
		ref,
		() => {
			return {
				getVisibility: () => visibility,
			};
		},
		[visibility],
	);

	return (
		<Select
			onChange={(value) => {
				handleDirty('visibility', value !== visibility);
				setVisibility(value);
			}}
		>
			<SelectTrigger className="h-8 text-sm">
				{({ selectedOption, setTriggerRef, toggleSelect }) => (
					<div
						ref={setTriggerRef}
						onClick={toggleSelect}
						className="mb-[10px] flex w-fit min-w-[96px] shrink-0 cursor-pointer items-center gap-1 rounded-full bg-primary-700 px-2 py-0.5 text-sm text-slate-50 dark:bg-primary-500  dark:text-dark-700 dark:hover:bg-primary-300"
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
});
EditAudience.propTypes = {
	onChange: PropTypes.func,
};

export { EditAudience };
