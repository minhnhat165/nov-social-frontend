import { EditorState, SelectionState } from 'draft-js';

export function replaceTextWithEmoji(contentState, triggerText, emojiText) {
	const blockMap = contentState.getBlockMap();
	let newContentState = contentState;
	blockMap.forEach((contentBlock) => {
		const plainText = contentBlock.getText();
		if (plainText.includes(triggerText)) {
			const selection = SelectionState.createEmpty(
				contentBlock.getKey(),
			).merge({
				anchorOffset: 0,
				focusOffset: plainText.length,
			});
			const replacedText = plainText.replace(triggerText, emojiText);
			const newBlock = contentBlock.merge({
				text: replacedText,
			});
			newContentState = newContentState.merge({
				blockMap: blockMap.set(contentBlock.getKey(), newBlock),
				selectionAfter: selection,
			});
		}
	});
	return EditorState.createWithContent(newContentState);
}
