import {
	Cog6ToothIcon,
	EllipsisHorizontalIcon,
	GlobeAsiaAustraliaIcon,
	LockClosedIcon,
	UserIcon,
} from 'components/Icon';
import React, { useMemo } from 'react';

import { IconButton } from 'components/Action';
import { IconWrapper } from 'components/DataDisplay';
import { Popover } from 'components/OverLay';
import { PostMenu } from '../PostMenu';
import { Text } from 'components/Typography';
import { audienceTypes } from 'features/post/components/PostEditor/components';
import { usePost } from '../../Post';

export const PostHeader = () => {
	const { post } = usePost();
	const { visibility, author, createdAt } = post;
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

	const AudienceIcon = useMemo(() => {
		switch (visibility) {
			case audienceTypes.PUBLIC:
				return <GlobeAsiaAustraliaIcon />;
			case audienceTypes.PRIVATE:
				return <LockClosedIcon />;
			case audienceTypes.FOLLOWERS:
				return <UserIcon className="h-4 w-4" />;
			case audienceTypes.CUSTOM:
				return <Cog6ToothIcon />;
			default:
				return <GlobeAsiaAustraliaIcon />;
		}
	}, [visibility]);

	return (
		<div className="flex">
			<div className="flex-1">
				<Text as="p" className="font-bold">
					{author?.name}
				</Text>
				<div className="flex items-center gap-2">
					<Text level={3} className="text-sm">
						{timeDisplay}
					</Text>
					<IconWrapper className="text-normal" size={4}>
						{AudienceIcon}
					</IconWrapper>
				</div>
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
					<IconWrapper>
						<EllipsisHorizontalIcon className="h-8 w-8" />
					</IconWrapper>
				</IconButton>
			</Popover>
		</div>
	);
};
