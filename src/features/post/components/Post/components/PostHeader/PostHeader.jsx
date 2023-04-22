import { Avatar, IconWrapper } from 'components/DataDisplay';
import {
	Cog6ToothIcon,
	GlobeAsiaAustraliaIcon,
	LockClosedIcon,
	UserIcon,
} from 'components/Icon';

import { PostMenu } from '../PostMenu';
import { ProfilePreviewWrapper } from 'features/user/components';
import { Text } from 'components/Typography';
import { UserProvider } from 'features/user/context';
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
		<div className="flex gap-2 px-2 pl-4">
			<UserProvider user={author}>
				<ProfilePreviewWrapper>
					<Avatar src={author.avatar} />
				</ProfilePreviewWrapper>
				<div className="flex flex-1">
					<div>
						<ProfilePreviewWrapper>
							<Text as="p" className="font-bold">
								{author?.name}
							</Text>
						</ProfilePreviewWrapper>
						<div className="flex items-center gap-1">
							<ProfilePreviewWrapper>
								<Text level={3} className="text-sm">
									@{author?.username}
								</Text>
							</ProfilePreviewWrapper>
							<Text
								level={3}
								className="pb-2 leading-3"
								size="lg"
								bold
							>
								.
							</Text>
							<Text level={3} className="text-sm">
								{timeDisplay}
							</Text>
							<Text
								level={3}
								className="pb-2 leading-3"
								size="lg"
								bold
							>
								.
							</Text>
							<IconWrapper className="text-normal" size={4}>
								{AudienceIcon}
							</IconWrapper>
						</div>
					</div>
					<PostMenu />
				</div>
			</UserProvider>
		</div>
	);
};
