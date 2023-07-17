import { replaceTextWithEmoji } from '../utils';

export const text2EmojiPlugin = {
	keyBindingFn: (e, { getEditorState, setEditorState }) => {
		console.log(e.key, e.shiftKey);
		if (e.key === ':' && e.shiftKey) {
			const editorState = getEditorState();
			const selection = editorState.getSelection();
			const currentContent = editorState.getCurrentContent();
			const currentBlock = currentContent.getBlockForKey(
				selection.getStartKey(),
			);
			const blockText = currentBlock.getText();
			const triggerText = ':)';
			if (blockText.endsWith(triggerText)) {
				setEditorState(
					replaceTextWithEmoji(currentContent, triggerText, '😀'),
				);
				return 'handled';
			}
		}
		return 'not-handled';
	},
};
