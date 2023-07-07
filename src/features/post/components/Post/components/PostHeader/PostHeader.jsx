import { Avatar, IconWrapper, TimeDisplay } from 'components/DataDisplay';
import {
	Cog6ToothIcon,
	GlobeAsiaAustraliaIcon,
	LockClosedIcon,
	UserIcon,
} from 'components/Icon';

import { POST } from 'constants/post';
import { PostMenu } from '../PostMenu';
import { ProfilePreviewWrapper } from 'features/user/components';
import { Text } from 'components/Typography';
import { UserProvider } from 'features/user/context';
import { useMemo } from 'react';
import { usePost } from '../../Post';

const { VISIBILITY } = POST;
export const PostHeader = () => {
	const { post } = usePost();
	const { visibility, author, createdAt } = post;

	const AudienceIcon = useMemo(() => {
		switch (visibility) {
			case VISIBILITY.PUBLIC:
				return <GlobeAsiaAustraliaIcon />;
			case VISIBILITY.PRIVATE:
				return <LockClosedIcon />;
			case VISIBILITY.FOLLOWER:
				return <UserIcon className="h-4 w-4" />;
			case VISIBILITY.CUSTOM:
				return <Cog6ToothIcon />;
			default:
				return <GlobeAsiaAustraliaIcon />;
		}
	}, [visibility]);

	return (
		<div className="flex gap-2 px-2 sm:pl-4">
			<UserProvider user={author}>
				<ProfilePreviewWrapper>
					<Avatar src={author.avatar} />
				</ProfilePreviewWrapper>
				<div className="flex flex-1">
					<div>
						<ProfilePreviewWrapper>
							<Text as="span" className="font-bold">
								{author?.name}
							</Text>
						</ProfilePreviewWrapper>
						<div className="flex  items-center justify-start gap-1">
							<div className="w-fit">
								<ProfilePreviewWrapper>
									<Text
										level={3}
										as="span"
										className="text-sm"
									>
										@{author?.username}
									</Text>
								</ProfilePreviewWrapper>
							</div>
							<Text
								level={3}
								className="pb-2 leading-3"
								size="lg"
								bold
							>
								.
							</Text>
							<Text level={3} className="text-sm">
								<TimeDisplay date={createdAt} />
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
