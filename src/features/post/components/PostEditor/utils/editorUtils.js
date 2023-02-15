function extractHashtags(content) {
	const regex = /#(\w+)/g;
	return content.match(regex) || [];
}

function extractMentions(content) {
	const regex = /@(\w+)/g;
	return content.match(regex) || [];
}

export { extractHashtags, extractMentions };
