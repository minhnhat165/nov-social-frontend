import { useEffect, useState } from 'react';

import { CloseButton } from 'components/Action';
import { PollEditor } from 'components/DataEntry';
import { usePostEditor } from '../context';

export function PostPollEditor({ pollEditorRef }) {
	const { initial, setIsValid, hasContent, handleDirty, setHasPoll } =
		usePostEditor();

	const [isPollValid, setIsPollValid] = useState(false);

	const handleClose = () => setHasPoll(false);

	useEffect(() => {
		const isDirty = !initial.poll ? true : false;
		handleDirty('poll', isDirty);
		return () => {
			const isDirty = initial.poll ? true : false;
			handleDirty('poll', isDirty);
		};
	}, [handleDirty, initial.poll]);

	useEffect(() => {
		setIsValid(isPollValid && hasContent);
	}, [hasContent, isPollValid, setIsValid]);

	return (
		<div className="relative">
			<PollEditor
				ref={pollEditorRef}
				onValidChange={setIsPollValid}
				onDirtyChange={(isDirty) => handleDirty('poll', isDirty)}
				initial={initial.poll}
			/>
			<CloseButton
				onClick={handleClose}
				className="absolute right-5 top-2"
			/>
		</div>
	);
}
