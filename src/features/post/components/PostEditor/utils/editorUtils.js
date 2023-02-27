function extractHashtags(content) {
	const regex = /#(\w+)/g;
	const matches = content.match(regex);
	return matches && matches.length > 0
		? matches.map((word) => word.slice(1))
		: [];
}

function extractMentions(content) {
	const regex = /@(\w+)/g;
	return content.match(regex) || [];
}

export { extractHashtags, extractMentions };
