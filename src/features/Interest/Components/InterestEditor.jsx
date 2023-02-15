import { useMemo, useState } from 'react';

import CancelOrOk from 'components/Action/CancelOrOk';
import Card from 'components/DataDisplay/Card';
import Chip from 'components/DataDisplay/Chip';
import Modal from 'components/OverLay/Modal';
import ScrollArea from 'components/Action/ScrollArea';
import Search from 'components/DataEntry/Search';
import { Select } from 'components/DataEntry';
import Text from 'components/Typography/Text';
import useGetCategories from '../hooks/useGetCategory';
import useSearchInterest from '../hooks/useSearchInterest';
import useUpdateProfile from 'features/user/hooks/useUpdateProfile';

const InterestEditor = ({ onCancel, defaultSelected }) => {
	const { isLoading, data, setSearch, search, isFetching, setCategory } =
		useSearchInterest();
	const [selected, setSelected] = useState(defaultSelected);
	const { data: categories } = useGetCategories();

	const { mutate, isLoading: updateLoading } = useUpdateProfile({
		onSuccess: () => {
			onCancel();
		},
	});

	// handle selection of interest
	const handleSelect = (interest) => {
		setSelected((prev) => {
			const existingInterest = prev.find(
				(item) => item._id === interest._id,
			);
			if (existingInterest) {
				return prev.filter((item) => item._id !== interest._id);
			}
			return [...prev, interest];
		});
	};

	const handleSubmit = () => {
		const listId = selected.map((interest) => interest._id);
		mutate({
			interests: listId,
		});
	};

	// filter by id  of 2 objects
	const resData = useMemo(() => {
		if (!data || !data.length) return [];
		return data.filter((item) => {
			return !selected.find(
				(selectedItem) => selectedItem._id === item._id,
			);
		});
	}, [data, selected]);

	return (
		<Modal.Panel className="w-[480px]">
			<Modal.Header>Add hobbies</Modal.Header>
			<div className="flex gap-2 px-4">
				<Search
					loading={isLoading || isFetching}
					className="flex-1"
					placeholder="Search for hobbies"
					debounce
					onChange={(value) => {
						setSearch(value.trim());
					}}
				/>
				<Select
					onChange={(value) => {
						setCategory(value);
					}}
				>
					<Select.Trigger>All</Select.Trigger>
					<Select.Options>
						<Select.Option value="" defaultSelected>
							All
						</Select.Option>
						{categories?.map((category) => (
							<Select.Option
								key={category._id}
								value={category.slug}
							>
								{category.name}
							</Select.Option>
						))}
					</Select.Options>
				</Select>
			</div>
			<div className="flex aspect-square w-full flex-col gap-2 px-4">
				{selected.length > 0 && (
					<SelectBoard
						interests={selected}
						onClickItem={handleSelect}
					/>
				)}
				<ResultBoard
					searchKey={search}
					interests={resData}
					handleSelect={handleSelect}
				/>
			</div>
			<Modal.Footer>
				<div className="ml-auto">
					<CancelOrOk
						onCancel={onCancel}
						onOk={handleSubmit}
						okLoading={updateLoading}
					/>
				</div>
			</Modal.Footer>
		</Modal.Panel>
	);
};

export default InterestEditor;

function SelectBoard({ interests, onClickItem }) {
	return (
		<div className="w-full">
			<Text as="h4" className="flex h-10 items-center">
				Selected hobbies
			</Text>
			<Card
				level={0}
				className="scrollbar-track-transparent max-h-40 min-h-[112px] w-full flex-1 flex-col flex-wrap gap-2 overflow-y-scroll rounded-xl px-2 py-2 "
			>
				{interests.map((interest) => (
					<Chip
						icon={interest.icon}
						key={interest.slug}
						className="mx-1 my-1"
						onClick={() => {
							onClickItem(interest);
						}}
						onRemove={() => {
							onClickItem(interest);
						}}
					>
						{interest.name}
					</Chip>
				))}
			</Card>
		</div>
	);
}

function ResultBoard({ searchKey, interests, handleSelect }) {
	return (
		<div className="flex flex-1 flex-col overflow-hidden">
			{searchKey && (
				<Text as="h4" className="flex h-10 items-center">
					Search for "{searchKey}"
				</Text>
			)}
			<ScrollArea className="flex-1">
				{interests?.map((interest) => (
					<Chip
						className="m-1"
						icon={interest.icon}
						key={interest.slug}
						onClick={() => {
							handleSelect(interest);
						}}
					>
						{interest.name}
					</Chip>
				))}
			</ScrollArea>
		</div>
	);
}
