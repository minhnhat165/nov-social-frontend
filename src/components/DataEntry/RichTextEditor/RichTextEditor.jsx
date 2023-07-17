import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import './styles/editorStyle.css';

import { EditorState, convertFromRaw, getDefaultKeyBinding } from 'draft-js';
import addEmoji, { Mode } from './utils/addEmoji';
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
import { FaceSmileIcon } from 'components/Icon';
import { IconWrapper } from 'components/DataDisplay';
import { MentionItem } from './components';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createMentionPlugin from '@draft-js-plugins/mention';
import { emojiKey } from './utils/getEmoji';
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
			const emojiPlugin = createEmojiPlugin({
				selectButtonContent: (
					<IconWrapper>
						<FaceSmileIcon />
					</IconWrapper>
				),
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
			const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
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
				EmojiSelect,
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

		const handleInsertEmoji = useCallback((emoji) => {
			setEditorState((prevState) => {
				const newEditorState = addEmoji(prevState, emoji);
				return newEditorState;
			});
		}, []);

		useImperativeHandle(
			ref,
			() => ({
				editorState,
				addEmoji: handleInsertEmoji,
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
			[editorState, handleInsertEmoji],
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

		function handleKeyCommand(command, editorState) {
			switch (command) {
				case command.startsWith('emoji') ? command : null:
					const emoji = command.split('emoji-')[1];
					const newEditorState = addEmoji(
						editorState,
						emoji,
						Mode.REPLACE,
					);
					setEditorState(newEditorState);

					return 'handled';
				case 'submit':
					return 'handled';
				default:
			}
			return 'not-handled';
		}

		function keyBindingFn(event) {
			const key = event.key.toLowerCase();
			if (key === 'enter' && enterToSubmit) {
				editorRef.current.blur();
				return 'submit';
			}
			// get all key of emojiKey to array

			if (key === ' ') {
				const selection = editorState.getSelection();
				const currentContent = editorState.getCurrentContent();
				const currentBlock = currentContent.getBlockForKey(
					selection.getStartKey(),
				);
				const blockText = currentBlock.getText();
				const lastWord = blockText.split(' ').pop().toLowerCase();
				const emoji = emojiKey[lastWord]?.emoji;
				if (emoji) {
					return 'emoji-' + emoji;
				}
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
