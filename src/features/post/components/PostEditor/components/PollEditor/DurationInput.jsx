import React, { useEffect, useMemo, useState } from 'react';

import { ChevronUpDownIcon } from 'components/Icon';
import { IconWrapper } from 'components/DataDisplay';
import { Select } from 'components/DataEntry';
import { Text } from 'components/Typography';
import { usePoll } from '.';

function DurationInput() {
	const { duration, setDuration } = usePoll();
	const initial = useMemo(() => {
		const day = Math.floor(duration / (24 * 60 * 60 * 1000));
		const hour = Math.floor(
			(duration % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
		);
		const minute = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));
		return { day, hour, minute };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [day, setDay] = useState(initial.day);
	const [hour, setHour] = useState(initial.hour);
	const [minute, setMinute] = useState(initial.minute);

	useEffect(() => {
		const duration = day * 24 * 60 + hour * 60 + minute;
		setDuration(duration * 60 * 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [day, hour, minute]);

	return (
		<div className="mt-2 flex gap-2">
			<Select onChange={setDay}>
				<Select.Trigger className="flex-1">
					{({ selectedOption, toggleSelect, setTriggerRef }) => (
						<Trigger
							toggleSelect={toggleSelect}
							setTriggerRef={setTriggerRef}
							selectedOption={selectedOption}
							type="day"
						/>
					)}
				</Select.Trigger>
				<Select.Options>
					{[...Array(8)].map((_, index) => (
						<Select.Option
							value={index}
							key={index}
							defaultSelected={index === initial.day}
						>
							{index}
						</Select.Option>
					))}
				</Select.Options>
			</Select>

			<Select onChange={setHour}>
				<Select.Trigger className="flex-1">
					{({ selectedOption, toggleSelect, setTriggerRef }) => (
						<Trigger
							toggleSelect={toggleSelect}
							setTriggerRef={setTriggerRef}
							selectedOption={selectedOption}
							type="hour"
						/>
					)}
				</Select.Trigger>
				<Select.Options>
					{[...Array(24)].map((_, index) => {
						return (
							<Select.Option
								value={index}
								key={index}
								defaultSelected={index === initial.hour}
							>
								{index}
							</Select.Option>
						);
					})}
				</Select.Options>
			</Select>

			<Select onChange={setMinute}>
				<Select.Trigger className="flex-1">
					{({ selectedOption, toggleSelect, setTriggerRef }) => (
						<Trigger
							toggleSelect={toggleSelect}
							setTriggerRef={setTriggerRef}
							selectedOption={selectedOption}
							type="minute"
						/>
					)}
				</Select.Trigger>
				<Select.Options>
					{[...Array(60)].map((_, index) => {
						return (
							<Select.Option
								value={index}
								key={index}
								defaultSelected={index === initial.minute}
							>
								{index}
							</Select.Option>
						);
					})}
				</Select.Options>
			</Select>
		</div>
	);
}

function Trigger({ toggleSelect, setTriggerRef, selectedOption, type }) {
	return (
		<button
			onClick={toggleSelect}
			ref={setTriggerRef}
			className="clickable flex h-10 flex-1 items-center justify-between rounded-lg pl-3 pr-2 dark:bg-dark-700"
			color="secondary"
		>
			<Text>
				{selectedOption ? `${selectedOption.value} ${type}` : `${type}`}
			</Text>
			<IconWrapper size={7} className="text-normal">
				<ChevronUpDownIcon />
			</IconWrapper>
		</button>
	);
}

export default DurationInput;
