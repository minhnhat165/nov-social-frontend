const { nanoid } = require('nanoid');

export const historyType = {
	USER: 'user',
	KEYWORD: 'keyword',
};

const createSearchHistory = (type = historyType.KEYWORD, text, data = null) => {
	const history = {
		_id: nanoid(),
		type,
		text,
		data: {
			...data,
		},
	};
	return history;
};

export default createSearchHistory;
