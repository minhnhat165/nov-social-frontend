import { IconButton, SwitchButton } from 'components/Action';

import { Cog6ToothIcon } from 'components/Icon';
import { Popover } from 'components/OverLay';
import { Text } from 'components/Typography';
import { usePoll } from '.';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

const Setting = () => {
	const {
		hasDuration,
		setHasDuration,
		setDuration,
		allowAddNewOptions,
		allowMultipleVotes,
		setAllowAddNewOptions,
		setAllowMultipleVotes,
		options,
	} = usePoll();

	return (
		<Popover
			interactive
			placement="top-end"
			render={
				<Popover.Content
					level={0}
					className="flex flex-col gap-4 p-4 shadow-3xl"
				>
					<Popover.Arrow />
					<Item title="Allow multiple choices">
						<SwitchButton
							disabled={options.some(
								(option) => option.votes > 0,
							)}
							isOn={allowMultipleVotes}
							onChange={setAllowMultipleVotes}
						/>
					</Item>

					<Item title="Allow viewers to add options">
						<SwitchButton
							isOn={allowAddNewOptions}
							onChange={setAllowAddNewOptions}
						/>
					</Item>

					<Item title="Set a duration for the poll">
						<SwitchButton
							isOn={hasDuration}
							onChange={(isHasDuration) => {
								setHasDuration(isHasDuration);
								if (isHasDuration)
									setDuration(ONE_DAY_IN_MILLISECONDS);
								else setDuration(null);
							}}
						/>
					</Item>
				</Popover.Content>
			}
		>
			<div className="flex flex-col gap-2">
				<IconButton color="secondary">
					<Cog6ToothIcon />
				</IconButton>
			</div>
		</Popover>
	);
};

const Item = ({ title, children }) => (
	<div className="flex items-center justify-between gap-3">
		<Text>{title}</Text>
		{children}
	</div>
);

export default Setting;
