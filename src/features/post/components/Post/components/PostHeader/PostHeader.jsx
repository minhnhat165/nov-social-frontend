import React, { useMemo } from 'react';

import { EllipsisHorizontalIcon } from 'components/Icon';
import { IconButton } from 'components/Action';
import { Popover } from 'components/OverLay';
import { PostMenu } from '../PostMenu';
import { Text } from 'components/Typography';
import { usePost } from '../../Post';

export const PostHeader = () => {
	const { author, createdAt } = usePost();
	const timeDisplay = useMemo(() => {
		const now = new Date();
		let timeDiff = Math.floor(
			(now.getTime() - new Date(createdAt).getTime()) / 1000,
		); // calculate time difference in seconds

		if (timeDiff < 60) {
			return `just now`;
		}

		timeDiff = Math.floor(timeDiff / 60); // calculate time difference in minutes

		if (timeDiff < 60) {
			return `${timeDiff} m`;
		}

		timeDiff = Math.floor(timeDiff / 60); // calculate time difference in hours

		if (timeDiff < 24) {
			return `${timeDiff}h`;
		}

		timeDiff = Math.floor(timeDiff / 24); // calculate time difference in days

		if (timeDiff < 365) {
			const date = new Date(createdAt);
			const options = { day: '2-digit', month: 'short' };
			return date.toLocaleDateString('en-US', options);
		}

		return Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: '2-digit',
		}).format(new Date(createdAt));
	}, [createdAt]);

	return (
		<div className="flex">
			<div className="flex-1">
				<Text as="p" className="font-bold leading-4">
					{author?.name}
				</Text>
				<Text level={3} className="text-xs">
					{timeDisplay}
				</Text>
			</div>
			<Popover
				placement="bottom-end"
				hideOnClick
				offset={[5, 5]}
				render={
					<Popover.Content
						level={0}
						className="flex max-h-[200px] w-60 flex-col gap-2 drop-shadow-[0_0_6px_rgba(0,0,0,0.2)] dark:shadow-2xl"
					>
						<Popover.Arrow />
						<PostMenu />
					</Popover.Content>
				}
			>
				<IconButton rounded variant="text" color="secondary" size="sm">
					<EllipsisHorizontalIcon />
				</IconButton>
			</Popover>
		</div>
	);
};
