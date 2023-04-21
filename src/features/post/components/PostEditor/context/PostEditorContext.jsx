import { createContext, useContext } from 'react';

export const editorModes = {
	CREATE: 'create',
	EDIT: 'edit',
};
export const PostEditorContext = createContext({
	isLoading: false,
	setIsOpenPoll: () => {},
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
	hasPoll: false,
	setHasPoll: () => {},
});

export const usePostEditor = () => useContext(PostEditorContext);
