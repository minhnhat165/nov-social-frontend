import { FocusModePanel } from './Layout';
import { FollowButton } from 'features/user/context';
import UserItem from 'features/user/components/UserItem';
import { getRecommendations } from 'api/userApi';
import { useQuery } from 'react-query';

export function WhoToFollow() {
	const { data } = useQuery('who-to-follow', getRecommendations);
	if (!data) return null;
	const { users } = data;
	if (!users.length) return null;
	return (
		<FocusModePanel title="Who to follow">
			<div className="flex flex-col gap-1">
				{users.map((user) => (
					<UserItem
						key={user._id}
						user={user}
						hasPreview
						end={<FollowButton size="xs" />}
					/>
				))}
			</div>
		</FocusModePanel>
	);
}
