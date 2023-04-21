import { Text } from 'components/Typography';
import { useEffect } from 'react';

export function KeyboardTextAction({
	action,
	keyName,
	keyDisplay,
	textAction,
}) {
	useEffect(() => {
		// add event listener to handle escape key
		const handleEscape = (e) => {
			if (e.key === keyName) {
				action();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="prose -mt-2 py-1.5">
			<Text as="kbd">
				Press{' '}
				<Text primary onClick={action} className="cursor-pointer">
					{keyDisplay}
				</Text>{' '}
				to {textAction}
			</Text>
		</div>
	);
}
