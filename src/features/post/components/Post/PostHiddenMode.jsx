import { Card, IconWrapper } from 'components/DataDisplay';

import { ArchiveBoxXMarkIcon } from 'components/Icon';
import { Button } from 'components/Action';
import { Text } from 'components/Typography';

export function PostHiddenMode({ onUnHidePost }) {
	return (
		<Card className="flex h-14 items-center justify-between px-4 ">
			<div className="flex items-center gap-2">
				<IconWrapper>
					<ArchiveBoxXMarkIcon className="text-normal" />
				</IconWrapper>
				<Text level={2}>Post hidden</Text>
			</div>
			<Button onClick={onUnHidePost} size="sm" color="secondary" rounded>
				Undo
			</Button>
		</Card>
	);
}
