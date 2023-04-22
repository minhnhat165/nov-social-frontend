import '@draft-js-plugins/linkify/lib/plugin.css';
import './styles/editorStyle.css';

import { EditorState, convertFromRaw, getDefaultKeyBinding } from 'draft-js';
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
import { MentionItem } from './components';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createMentionPlugin from '@draft-js-plugins/mention';
import hashtagStyles from './styles/hashtagStyles.module.css';
import mentionStyles from './styles/mentionStyles.module.css';
import useGetMentions from 'features/user/hooks/useGetMentions';

const RichTextEditor = forwardRef(
	(
		{
			initial,
			placeholder,
			onEmptyChange,
			onDirtyChange,
			autoFocus = false,
			readOnly,
			fontSizeDefault = 1.2,
			fontSizeReduced = 1,
			enterToSubmit = false,
			className,
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
		const [fontSize, setFontSize] = useState(fontSizeDefault);
		const editorRef = useRef(null);
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

				mentionPrefix: '@',
				mentionTrigger: '@',
				// using username to display the mention
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
				setFontSize(fontSizeReduced);
			} else {
				setFontSize(fontSizeDefault);
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
				isEmpty:
					editorState.getCurrentContent().getPlainText().length === 0,

				// eslint-disable-next-line react-hooks/exhaustive-deps
			}),
			[editorState],
		);

		useEffect(() => {
			if (editorRef.current && autoFocus) {
				// editorRef.current.focus();
				setTimeout(() => {
					editorRef.current.focus();
				}, 1);
				setEditorState(EditorState.moveFocusToEnd(editorState));
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [autoFocus, editorRef]);

		function handleKeyCommand(command) {
			if (command === 'submit') {
				// Your code here
				return 'handled';
			}
			return 'not-handled';
		}

		function keyBindingFn(event) {
			if (event.keyCode === 13 && enterToSubmit) {
				editorRef.current.blur();
				return 'submit';
			}
			return getDefaultKeyBinding(event);
		}

		return (
			<div
				{...props}
				className={clsx(
					className,
					readOnly ? 'editor-readonly' : 'editor',
				)}
				style={{
					fontSize: `${fontSize}rem`,
				}}
			>
				<Editor
					readOnly={readOnly}
					plugins={plugins}
					placeholder={placeholder}
					editorState={editorState}
					onChange={onChange}
					autoFocus={autoFocus}
					ref={editorRef}
					handleKeyCommand={handleKeyCommand}
					keyBindingFn={keyBindingFn}
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

RichTextEditor.propTypes = {
	initial: PropTypes.string,
	onEmpty: PropTypes.func,
	hasContent: PropTypes.func,
	dirtyState: PropTypes.func,
	fontSizeDefault: PropTypes.number,
	fontSizeReduced: PropTypes.number,
};

const MemoizedRichTextEditor = memo(RichTextEditor);

export { MemoizedRichTextEditor as RichTextEditor };

