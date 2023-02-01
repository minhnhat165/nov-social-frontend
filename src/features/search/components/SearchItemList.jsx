import SearchItem from './SearchItem';

const SearchItemList = ({ list, onClick, onRemove }) => {
	return (
		<div className="flex flex-col gap-2">
			{list.map((item) => (
				<SearchItem
					key={item._id}
					search={item}
					onClick={onClick}
					onRemove={onRemove}
				/>
			))}
		</div>
	);
};

export default SearchItemList;
