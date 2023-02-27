import { EditorState, convertFromRaw } from 'draft-js';
import { useEffect, useMemo, useState } from 'react';

import Editor from '@draft-js-plugins/editor';
import { Link } from 'react-router-dom';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createMentionPlugin from '@draft-js-plugins/mention';
import hashtagStyles from './styles/hashtagStyles.module.css';
import mentionStyles from './styles/mentionStyles.module.css';
import { usePost } from '../../Post';

export const PostContent = () => {
	const { content } = usePost();
	const convertToEditorState = (content) => {
		if (content) {
			return EditorState.createWithContent(
				convertFromRaw(JSON.parse(content)),
			);
		}
		return EditorState.createEmpty();
	};

	const [editorState, setEditorState] = useState(
		convertToEditorState(content),
	);

	const [fontSize, setFontSize] = useState('text-lg');

	useEffect(() => {
		const newEditorState = convertToEditorState(content);
		setEditorState(newEditorState);
		if (newEditorState.getCurrentContent().getPlainText().length < 100)
			setFontSize('text-lg');
		else setFontSize('text-base');
	}, [content]);

	const { plugins } = useMemo(() => {
		const linkifyPlugin = createLinkifyPlugin({});

		const hashtagPlugin = createHashtagPlugin({
			theme: hashtagStyles,
		});
		const mentionPlugin = createMentionPlugin({
			entityMutability: 'IMMUTABLE',
			supportWhitespace: true,
			theme: mentionStyles,
			mentionComponent: MentionItem,
		});
		// eslint-disable-next-line no-shadow
		const { MentionSuggestions } = mentionPlugin;
		// eslint-disable-next-line no-shadow
		const plugins = [mentionPlugin, hashtagPlugin, linkifyPlugin];
		return { plugins, MentionSuggestions };
	}, []);

	const onChange = (newEditorState) => {
		setEditorState(newEditorState);
	};

	return (
		<div className={`mb-2 ${fontSize}`}>
			<Editor
				readOnly
				plugins={plugins}
				editorState={editorState}
				onChange={onChange}
			/>
		</div>
	);
};
const MentionItem = ({ mention }) => {
	return (
		<Link
			to={`profile/${mention._id}`}
			className="inline-block rounded bg-primary-700 p-0.5 leading-none text-white dark:bg-primary-500"
		>
			<span>{mention.name}</span>
		</Link>
	);
};

PostContent.propTypes = {};
