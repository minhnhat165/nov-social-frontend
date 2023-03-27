import '@draft-js-plugins/linkify/lib/plugin.css';
import '../styles/editorStyle.css';

import { EditorState, convertFromRaw } from 'draft-js';
import {
	forwardRef,
	memo,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';

import Editor from '@draft-js-plugins/editor';
import MentionItem from './MentionItem';
import PropTypes from 'prop-types';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createMentionPlugin from '@draft-js-plugins/mention';
import hashtagStyles from '../styles/hashtagStyles.module.css';
import mentionStyles from '../styles/mentionStyles.module.css';
import useGetMentions from 'features/user/hooks/useGetMentions';

const ContentEditor = forwardRef(
	(
		{
			initial,
			placeholder,
			onEmptyChange,
			onDirtyChange,
			autoFocus,
			...props
		},
		ref,
	) => {
		const initialEditorState = useMemo(() => {
			if (initial) {
				return EditorState.createWithContent(
					convertFromRaw(JSON.parse(initial)),
				);
			}
			return EditorState.createEmpty();
		}, [initial]);

		const [editorState, setEditorState] = useState(initialEditorState);
		const [fontSize, setFontSize] = useState(1.2);
		const editor = useRef(null);
		const [open, setOpen] = useState(false);
		const { mentions, setQuery } = useGetMentions();
		const { MentionSuggestions, plugins } = useMemo(() => {
			const linkifyPlugin = createLinkifyPlugin({});

			const hashtagPlugin = createHashtagPlugin({
				theme: hashtagStyles,
			});
			const mentionPlugin = createMentionPlugin({
				entityMutability: 'IMMUTABLE',
				supportWhitespace: true,
				theme: mentionStyles,
			});
			const { MentionSuggestions } = mentionPlugin;
			const plugins = [mentionPlugin, hashtagPlugin, linkifyPlugin];
			return { plugins, MentionSuggestions };
		}, []);

		const onOpenChange = useCallback((_open) => {
			setOpen(_open);
		}, []);
		const onSearchChange = useCallback(({ value }) => {
			setQuery(value);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		const onChange = (newEditorState) => {
			const initialPlainText = initialEditorState
				.getCurrentContent()
				.getPlainText();
			const newPlainText = newEditorState
				.getCurrentContent()
				.getPlainText();
			if (newPlainText.length > 100) {
				setFontSize(1);
			} else {
				setFontSize(1.2);
			}

			onDirtyChange && onDirtyChange(initialPlainText !== newPlainText);
			onEmptyChange && onEmptyChange(newPlainText.length === 0);
			setEditorState(newEditorState);
		};

		const reset = () => {
			setEditorState(EditorState.createEmpty());
		};

		useImperativeHandle(
			ref,
			() => ({
				editorState,
				reset,

				// eslint-disable-next-line react-hooks/exhaustive-deps
			}),
			[editorState],
		);

		useEffect(() => {
			if (editor.current && autoFocus) {
				editor.current.focus();
				setEditorState(EditorState.moveFocusToEnd(editorState));
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [autoFocus, editor]);
		return (
			<div
				{...props}
				style={{
					fontSize: `${fontSize}rem`,
				}}
			>
				<Editor
					plugins={plugins}
					placeholder={placeholder}
					editorState={editorState}
					onChange={onChange}
					autoFocus={autoFocus}
					ref={editor}
				/>
				<MentionSuggestions
					open={open}
					onOpenChange={onOpenChange}
					suggestions={mentions}
					onSearchChange={onSearchChange}
					entryComponent={MentionItem}
				/>
			</div>
		);
	},
);

ContentEditor.propTypes = {
	initial: PropTypes.string,
	onEmpty: PropTypes.func,
	hasContent: PropTypes.func,
	dirtyState: PropTypes.func,
};

const MemoizedContentEditor = memo(ContentEditor);

export { MemoizedContentEditor as ContentEditor };
