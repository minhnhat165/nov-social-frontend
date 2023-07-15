import {
	createContext,
	forwardRef,
	useContext,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';

import { Button } from 'components/Action';
import DurationInput from './DurationInput';
import Layer from 'components/Layout/Layer';
import Option from './Option';
import { PlusIcon } from 'components/Icon';
import PropTypes from 'prop-types';
import Setting from './Setting';
import { Text } from 'components/Typography';
import { isEqual } from 'utils';
import { nanoid } from 'nanoid';
import { toast } from 'react-hot-toast';

const Context = createContext({
	isValid: false,
	setIsValid: () => {},
	hasDuration: false,
	setHasDuration: () => {},
	options: [],
	setOptions: () => {},
	handleOnchange: () => {},
	handleAddOption: () => {},
	handleRemoveOption: () => {},
	handleToggleDuration: () => {},
	handleDurationChange: () => {},
	duration: 0,
	setDuration: () => {},
	handleSave: () => {},
	handleCancel: () => {},
	allowAddNewOptions: false,
	setAllowAddNewOptions: () => {},
	allowMultipleVotes: false,
	setAllowMultipleVotes: () => {},
});

export const usePoll = () => {
	return useContext(Context);
};

const initialPoll = {
	options: [
		{
			_id: nanoid(),
			value: '',
			votes: 0,
			voters: [],
		},
		{
			_id: nanoid(),
			value: '',
			votes: 0,
			voters: [],
		},
	],
	duration: null,
	allowMultipleVotes: true,
	allowAddNewOptions: false,
};

const PollEditor = forwardRef(
	({ onValidChange, onDirtyChange, initial }, ref) => {
		if (!initial) {
			initial = initialPoll;
		}
		const [isValid, setIsValid] = useState(true);
		const [hasDuration, setHasDuration] = useState(!!initial.duration);
		const [duration, setDuration] = useState(initial.duration);
		const [allowMultipleVotes, setAllowMultipleVotes] = useState(
			initial.allowMultipleVotes,
		);
		const [allowAddNewOptions, setAllowAddNewOptions] = useState(
			initial.allowAddNewOptions,
		);
		const [options, setOptions] = useState(initial.options);

		useEffect(() => {
			const newPoll = {
				...initial,
				options: options,
				duration,
				allowMultipleVotes,
				allowAddNewOptions,
			};
			onDirtyChange(!isEqual(initial, newPoll));
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [
			allowAddNewOptions,
			allowMultipleVotes,
			duration,
			initial,
			initial.options,
			options,
		]);

		useImperativeHandle(
			ref,
			() => ({
				getPoll: () => {
					const poll = {
						...initial,
						options: options,
						duration,
						allowMultipleVotes,
						allowAddNewOptions,
					};
					return poll;
				},
			}),
			[
				allowAddNewOptions,
				allowMultipleVotes,
				duration,
				initial,
				options,
			],
		);

		const handleOnchange = (id, value) => {
			setOptions((prev) =>
				prev.map((option) => {
					if (option._id === id) {
						return {
							...option,
							value,
						};
					}
					return option;
				}),
			);
		};

		useEffect(() => {
			// validate options must have at least 2 options and all options must have value
			let valid = true;
			if (options.length < 2) {
				valid = false;
			}
			if (valid) {
				options.forEach((option) => {
					if (!option.value) {
						valid = false;
					}
				});
			}
			setIsValid(valid);
		}, [options]);

		useEffect(() => {
			onValidChange(isValid);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [isValid]);

		const handleAddOption = () => {
			setOptions((prev) => [
				...prev,
				{
					_id: nanoid(),
					value: '',
					votes: 0,
					voters: [],
				},
			]);
		};

		const handleRemoveOption = (id) => {
			if (options.length === 2) {
				toast.error('Poll must have at least 2 options');
				return;
			}
			setOptions((prev) => prev.filter((option) => option._id !== id));
		};

		return (
			<Context.Provider
				value={{
					isValid,
					setIsValid,
					hasDuration,
					setHasDuration,
					options,
					setOptions,
					handleOnchange,
					handleAddOption,
					handleRemoveOption,
					allowMultipleVotes,
					setAllowMultipleVotes,
					allowAddNewOptions,
					setAllowAddNewOptions,
					duration,
					setDuration,
				}}
			>
				<Layer className="border-normal relative mb-4 border p-4">
					<div className="flex items-center justify-between pb-6">
						<Text className="text-xl leading-4">Options</Text>
					</div>
					<div className="mb-3 flex flex-col gap-3">
						{options.map((option, index) => (
							<Option
								key={option._id}
								option={option}
								index={index}
							/>
						))}
					</div>
					<div className="flex gap-2">
						<Button
							startIcon={<PlusIcon />}
							color="secondary"
							className="primary-text flex-1"
							onClick={handleAddOption}
						>
							Add option
						</Button>
						<Setting />
					</div>
					{hasDuration && <DurationInput />}
				</Layer>
			</Context.Provider>
		);
	},
);

PollEditor.propTypes = {
	initial: PropTypes.object,
	onValidChange: PropTypes.func,
};

PollEditor.defaultProps = {
	initial: {
		options: [
			{
				_id: nanoid(),
				value: '',
			},
			{
				_id: nanoid(),
				value: '',
			},
		],
		duration: null,
		allowMultipleVotes: true,
		allowAddNewOptions: false,
	},
	onValidChange: () => {},
};

export { PollEditor };
