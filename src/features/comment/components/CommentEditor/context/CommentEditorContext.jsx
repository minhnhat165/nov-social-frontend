import { createContext, useContext } from 'react';

export const editorModes = {
	CREATE: 'create',
	EDIT: 'edit',
};
export const CommentEditorContext = createContext({
	isLoading: false,
	isFocused: false,
	setIsFocused: () => {},
	isValid: true,
	isDirty: false,
	setIsValid: () => {},
	setIsDirty: () => {},
	mode: editorModes.CREATE,
	initial: {},
	hasContent: false,
	handleDirty: () => {},
	setCurrentFeats: () => {},
	setHasContent: () => {},
	hasPhotos: false,
	setHasPhotos: () => {},
});

export const useCommentEditor = () => useContext(CommentEditorContext);
