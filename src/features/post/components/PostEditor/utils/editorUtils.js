import { convertToRaw } from 'draft-js';

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

const getDataEditor = (contentEditorRef, hasContent) => {
	if (!hasContent) return {};
	const editorState = contentEditorRef.current.editorState;
	const currentContentState = editorState.getCurrentContent();
	const raw = convertToRaw(currentContentState);
	const entityMap = raw.entityMap;
	const mentions = [];
	Object.values(entityMap).forEach((entity) => {
		if (entity.type === 'mention') {
			mentions.push(entity.data.mention._id);
		}
	});
	return {
		content: JSON.stringify(raw),
		hashtags: extractHashtags(currentContentState.getPlainText()),
		mentions,
	};
};

export { extractHashtags, extractMentions, getDataEditor };
