import { SearchIcon, XMarkIcon } from 'components/Icon';

import Text from 'components/Typography/Text';
import UserItem from 'features/user/components/UserItem';
import { useMemo } from 'react';

const SearchItem = ({ search, onClick, onRemove }) => {
	const { data, type } = search;
	const { user, keyword } = data;

	const handleClick = () => {
		onClick(search);
	};

	const handleRemove = (e) => {
		e.stopPropagation();
		onRemove(search._id);
	};

	const item = useMemo(() => {
		switch (type) {
			case 'keyword':
				return (
					<KeywordItem
						keyword={keyword}
						onClick={handleClick}
						end={
							onRemove && <RemoveButton onClick={handleRemove} />
						}
					/>
				);
			case 'user':
				return (
					<UserItem
						user={user}
						onClick={handleClick}
						end={
							onRemove && <RemoveButton onClick={handleRemove} />
						}
					/>
				);
			default:
				return null;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type, keyword, user]);

	return item;
};

const KeywordItem = ({ keyword, onClick, end }) => {
	return (
		<div
			onClick={onClick}
			className="flex cursor-pointer items-center overflow-hidden rounded-xl p-2 transition-all hover:bg-slate-200 dark:hover:bg-dark-700"
		>
			<div className="mr-2 shrink-0">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 dark:bg-dark-900">
					<SearchIcon className="text-normal h-5 w-5" />
				</div>
			</div>
			<div className="mr-2 overflow-hidden">
				<Text className="block truncate text-[15px]">{keyword}</Text>
			</div>
			{end && <div className="ml-auto">{end}</div>}
		</div>
	);
};

const RemoveButton = ({ onClick }) => {
	return (
		<div
			onClick={onClick}
			className="clickable flex h-6 w-6 items-center justify-center rounded-full hover:bg-slate-300 dark:hover:bg-dark-500"
		>
			<XMarkIcon className="text-normal h-4 w-4" />
		</div>
	);
};

const List = ({ children }) => {
	return <div className="flex flex-col gap-2">{children}</div>;
};

SearchItem.List = List;

export default SearchItem;
