import '@draft-js-plugins/linkify/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
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
import createEmojiPlugin from '@draft-js-plugins/emoji';
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
		const { MentionSuggestions, plugins, EmojiSuggestions } =
			useMemo(() => {
				const emojiPlugin = createEmojiPlugin({
					priorityList: {
						':smile:': ['1f642'],
						':slight_smile:': ['1f642'],
						':rage:': ['1f648'],
						':angry:': ['1f620'],
						':flushed:': ['1f633'],
						':cold_sweat:': ['1f630'],
						':cry:': ['1f622'],
						':sob:': ['1f62d'],
						':rofl:': ['1f923'],
					},
				});

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
				});
				const { MentionSuggestions } = mentionPlugin;
				const { EmojiSuggestions } = emojiPlugin;
				const plugins = [
					mentionPlugin,
					hashtagPlugin,
					linkifyPlugin,
					emojiPlugin,
				];

				return {
					plugins,
					MentionSuggestions,
					EmojiSuggestions,
				};
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
			onEmptyChange && onEmptyChange(newPlainText.trim().length === 0);
			setEditorState(newEditorState);
		};

		const reset = () => {
			setEditorState(EditorState.createEmpty());
		};

		const editorWrapperRef = useRef(null);

		useImperativeHandle(
			ref,
			() => ({
				editorState,
				reset,
				isEmpty:
					editorState.getCurrentContent().getPlainText().trim()
						.length === 0,
				focus: () => {
					setTimeout(() => {
						editorRef.current.focus();
						editorWrapperRef.current.scrollIntoView({
							behavior: 'smooth',
							block: 'center',
						});
					}, 10);
					setEditorState(EditorState.moveFocusToEnd(editorState));
				},
				setContent: (content) => {
					setEditorState(
						EditorState.createWithContent(
							convertFromRaw(JSON.parse(content)),
						),
					);
				},
			}),
			[editorState, editorRef, editorWrapperRef],
		);

		// scroll into view when editor is focused

		useEffect(() => {
			if (editorRef.current && autoFocus) {
				setTimeout(() => {
					editorRef.current.focus();
				}, 1);
				setEditorState((prev) => EditorState.moveFocusToEnd(prev));
			}
		}, [autoFocus]);

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
				ref={editorWrapperRef}
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
				<EmojiSuggestions />
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
