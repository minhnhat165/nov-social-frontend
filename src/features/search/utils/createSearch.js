import { nanoid } from 'nanoid';

export const searchType = {
	USER: 'user',
	KEYWORD: 'keyword',
};

const createSearch = (type, text, data) => {
	const search = {
		_id: nanoid(),
		type,
		text,
		data,
	};
	return search;
};

export default createSearch;
