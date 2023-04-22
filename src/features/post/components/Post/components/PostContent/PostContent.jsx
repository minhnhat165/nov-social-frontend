import './styles/editorStyle.css';

import { useEffect, useRef, useState } from 'react';

import { ArrowDropDownIcon } from 'components/Icon';
import { Button } from 'components/Action';
import { RichTextEditor } from 'components/DataEntry';
import clsx from 'clsx';
import { usePost } from '../../Post';

export const PostContent = () => {
	const { content } = usePost();
	const [isExpanded, setIsExpanded] = useState(false);
	const [expandable, setExpansible] = useState(false);

	const contentRef = useRef(null);

	useEffect(() => {
		if (contentRef?.current) {
			// if height is less than 40px, then it's not expanded
			setExpansible(contentRef.current.clientHeight > 159);
		}
	}, [contentRef]);

	return (
		<div
			ref={contentRef}
			className={clsx(
				'post-content relative mb-2',
				expandable && 'h-40 overflow-y-hidden',
				isExpanded && 'h-auto',
			)}
		>
			<RichTextEditor readOnly={true} initial={content} />

			{expandable && !isExpanded && (
				<div
					onClick={() => setIsExpanded(true)}
					className="absolute bottom-0 flex h-16 w-full items-end justify-center bg-gradient-to-t from-slate-50 to-transparent text-center align-text-bottom dark:from-dark-800"
				>
					<Button
						rounded
						startIcon={<ArrowDropDownIcon />}
						variant="text"
					>
						Read more
					</Button>
				</div>
			)}
		</div>
	);
};
