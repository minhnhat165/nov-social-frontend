import { useEffect, useMemo, useRef, useState } from 'react';

import { Button } from 'components/Action';
import { Input } from 'components/DataEntry';
import Layer from 'components/Layout/Layer';
import Option from './Option';
import { Text } from 'components/Typography';
import socket from 'configs/socket-config';
import { useMutation } from 'react-query';
import { usePost } from '../../Post';
import { useSelector } from 'react-redux';
import { vote } from 'api/pollApi';

export const Poll = ({ maxShow = 3 }) => {
	const { poll: _poll } = usePost();

	const [poll, setPoll] = useState(_poll);

	const {
		_id: pollId,
		allowMultipleVotes = false,
		allowAddNewOptions = false,
		options: defaultOptions = [],
	} = poll;

	const { mutate } = useMutation(vote, {
		onSuccess: (data) => {
			// console.log(data);
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const userId = useSelector((state) => state.auth.user?._id);

	const [options, setOptions] = useState(defaultOptions);

	useEffect(() => {
		setOptions(defaultOptions);
	}, [defaultOptions]);

	const totalVote = useMemo(() => {
		return options.reduce((acc, cur) => acc + cur.votes, 0);
	}, [options]);

	const [isShowMore, setIsShowMore] = useState(options.length <= maxShow);

	const handleVote = (e) => {
		mutate({ pollId, optionId: e.target.value });
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

	useEffect(() => {
		socket.emit('client.poll.join', pollId);
		socket.on('server.poll.vote', (poll) => {
			setOptions(poll.options);
		});
		socket.on('server.poll.update', (poll) => {
			console.log(poll);
			setPoll(poll);
		});
		return () => {
			socket.off('server.poll.vote');
			socket.emit('client.poll.leave', pollId);
			socket.off('server.poll.update');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pollId]);

	return (
		<Layer>
			<form ref={formRef} className="flex flex-col gap-2">
				{isShowMore
					? options.map((option) => (
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
					: options
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

				{options.length > maxShow && (
					<div className="flex items-center gap-2">
						<Text
							onClick={() => setIsShowMore((prev) => !prev)}
							className="cursor-pointer"
							primary
						>
							{isShowMore
								? 'Show less'
								: `Show more (${options.length - maxShow})`}
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
