export const getEmoji = (endKey, text) => {
	const matchEmojisKey = Object.keys(emojiKey).filter((emoji) => {
		return emojiKey[emoji].endKey === endKey;
	});
	const lastWord = text.split(' ').pop().toLowerCase();
	const keyExact = matchEmojisKey.filter((key) => {
		return lastWord === key.slice(0, -1);
	});
	return keyExact.length ? emojiKey[keyExact[0]].name : null;
};

export const emojiKey = {
	':)': {
		name: 'slight_smile',
		emoji: '🙂',
		endKey: ')',
	},
	':(': {
		name: 'slight_frown',
		emoji: '🙁',
		endKey: '(',
	},
	':d': {
		name: 'grinning',
		emoji: '😀',
		endKey: 'd',
	},
	':p': {
		name: 'stuck_out_tongue',
		emoji: '😛',
		endKey: 'p',
	},
	':o': {
		name: 'open_mouth',
		emoji: '😮',
		endKey: 'o',
	},
	':*': {
		name: 'kissing_heart',
		emoji: '😘',
		endKey: '*',
	},
	'<3': {
		name: 'heart',
		emoji: '❤️',
		endKey: '3',
	},
	':3': {
		name: 'curly_lips',
		emoji: '👄',
		endKey: '3',
	},
	'(y)': {
		name: 'thumbsup',
		emoji: '👍',
		endKey: ')',
	},
	'8)': {
		name: 'sunglasses',
		emoji: '😎',
		endKey: ')',
	},
	':|': {
		name: 'neutral_face',
		emoji: '😐',
		endKey: '|',
	},
	':/': {
		name: 'confused',
		emoji: '😕',
		endKey: '/',
	},
	'<(")': {
		name: 'penguin',
		emoji: '🐧',
		endKey: ')',
	},
	';)': {
		name: 'wink',
		emoji: '😉',
		endKey: ')',
	},
	ogc: {
		name: 'underage',
		emoji: '🔞',
		endKey: 'c',
	},
	':v': {
		name: 'v',
		emoji: '✌️',
		endKey: 'v',
	},
	'(^^^)': {
		name: 'shark',
		emoji: '🦈',
		endKey: ')',
	},
};
export const listEmojiEndKey = Object.values(emojiKey).map(
	(item) => item.endKey,
);
