import {
	Cog6ToothIcon,
	GlobeAsiaAustraliaIcon,
	LockClosedIcon,
	UserIcon,
} from 'components/Icon';

import { IconWrapper } from 'components/DataDisplay';
import { PostMenu } from '../PostMenu';
import { Text } from 'components/Typography';
import { audienceTypes } from 'features/post/components/PostEditor/components';
import { getDiffTime } from 'utils';
import { useMemo } from 'react';
import { usePost } from '../../Post';

export const PostHeader = () => {
	const { post } = usePost();
	const { visibility, author, createdAt } = post;
	const timeDisplay = useMemo(() => {
		return getDiffTime(createdAt);
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
		<div className="flex flex-1">
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
			<PostMenu />
		</div>
	);
};
