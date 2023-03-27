import React, { useId, useMemo } from 'react';

import { ChevronRightIcon } from 'components/Icon';
import { IconWrapper } from 'components/DataDisplay';
import PropTypes from 'prop-types';
import { Text } from 'components/Typography';
import clsx from 'clsx';

const Option = ({ option, total, isVoted, isCheckbox, name, onChange }) => {
	const id = useId();
	const { value, votes, _id } = option;

	const percent = useMemo(() => {
		if (total === 0) return 0;
		return Math.round((votes / total) * 100);
	}, [votes, total]);

	return (
		<label
			htmlFor={id}
			className="cursor-pointer rounded-lg bg-slate-200 p-2 px-3 dark:bg-dark-700"
		>
			<div className="flex items-center gap-2 pb-2">
				<input
					id={id}
					type={isCheckbox ? 'checkbox' : 'radio'}
					defaultChecked={isVoted}
					value={_id}
					name={name}
					className={clsx(
						'checked:bg-primary-700 dark:bg-dark-600 dark:checked:bg-primary-500 ',
						isCheckbox && 'rounded',
					)}
					onChange={onChange}
				/>
				<div className="text-normal text-center">{value}</div>
				<div
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
					}}
					className="clickable ml-auto flex items-center hover:opacity-70"
				>
					<Text className="font-bold">{percent}%</Text>
					<Text primary>
						<IconWrapper size={5}>
							<ChevronRightIcon strokeWidth={2.5} />
						</IconWrapper>
					</Text>
				</div>
			</div>
			<div className="h-2 w-full rounded-full bg-slate-300 dark:bg-dark-600">
				<div
					className="h-full rounded-full bg-primary-500 transition-all duration-500"
					style={{
						width: `${percent}%`,
					}}
				/>
			</div>
		</label>
	);
};
Option.propTypes = {
	option: PropTypes.object.isRequired,
	total: PropTypes.number,
	isVoted: PropTypes.bool,
	isCheckbox: PropTypes.bool,
	name: PropTypes.string,
	onChange: PropTypes.func,
};

export default Option;
