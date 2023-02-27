import { useEffect, useMemo, useRef, useState } from 'react';

import { Button } from 'components/Action';
import { Input } from 'components/DataEntry';
import Layer from 'components/Layout/Layer';
import Option from './Option';
import { Text } from 'components/Typography';
import { usePost } from '../../Post';
import { useSelector } from 'react-redux';

export const Poll = ({ maxShow = 3 }) => {
	const { poll } = usePost();
	const {
		_id: pollId,
		allowMultipleVotes,
		allowAddNewOptions,
		options: defaultOptions,
	} = poll;

	const userId = useSelector((state) => state.auth.user?._id);

	const [options, setOptions] = useState(defaultOptions);

	useEffect(() => {
		setOptions(defaultOptions);
	}, [defaultOptions]);

	const totalVote = useMemo(() => {
		return options.reduce((acc, cur) => acc + cur.votes, 0);
	}, [options]);

	const optionsSorted = useMemo(() => {
		return options.sort((a, b) => b.votes - a.votes);
	}, [options]);

	const [isShowMore, setIsShowMore] = useState(
		optionsSorted.length <= maxShow,
	);

	const handleVote = (e) => {
		// get data from form
		const formData = new FormData(formRef.current);
		const optionsSelected = formData.getAll(pollId);
		// update options
		setOptions((prev) =>
			prev.map((option) => {
				const { _id, voters, votes } = option;
				if (optionsSelected.includes(_id)) {
					if (voters.includes(userId)) return option;
					return {
						...option,
						voters: [...voters, userId],
						votes: votes + 1,
					};
				} else {
					if (!voters?.includes(userId)) return option;
					return {
						...option,
						voters: voters.filter((voter) => voter !== userId),
						votes: votes - 1,
					};
				}
			}),
		);
	};

	const formRef = useRef(null);

	return (
		<Layer>
			<form ref={formRef} className="flex flex-col gap-2">
				{isShowMore
					? optionsSorted.map((option) => (
							<Option
								key={option._id}
								option={option}
								total={totalVote}
								isVoted={option?.voters?.includes(userId)}
								isCheckbox={allowMultipleVotes}
								name={pollId}
								onChange={handleVote}
							/>
					  ))
					: optionsSorted
							.slice(0, maxShow)
							.map((option) => (
								<Option
									key={option._id}
									option={option}
									total={totalVote}
									isVoted={option?.voters?.includes(userId)}
									isCheckbox={allowMultipleVotes}
									name={pollId}
									onChange={handleVote}
								/>
							))}

				{/* show more */}

				{optionsSorted.length > maxShow && (
					<div className="flex items-center gap-2">
						<Text
							onClick={() => setIsShowMore((prev) => !prev)}
							className="cursor-pointer"
							primary
						>
							{isShowMore
								? 'Show less'
								: `Show more (${
										optionsSorted.length - maxShow
								  })`}
						</Text>
					</div>
				)}
			</form>
			{isShowMore && allowAddNewOptions && <AddNewOption />}
		</Layer>
	);
};

const AddNewOption = ({ onSubmit }) => {
	const [value, setValue] = useState('');
	const [isShowForm, setIsShowForm] = useState(false);
	return (
		<div className="mt-2 flex items-center gap-2">
			{isShowForm ? (
				<>
					<Input
						value={value}
						size="md"
						onChange={(e) => setValue(e.target.value)}
						placeholder="Add new option"
						className="w-full"
					/>
					<Button
						disabled={!value.trim()}
						onClick={() => {
							onSubmit(value);
							setValue('');
							setIsShowForm(false);
						}}
					>
						Add
					</Button>
				</>
			) : (
				<Text
					onClick={() => setIsShowForm(true)}
					className="cursor-pointer"
					primary
				>
					Add new option
				</Text>
			)}
		</div>
	);
};
