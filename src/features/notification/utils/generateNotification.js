import {
	CakeIcon,
	CalendarDaysIcon,
	ChatBubbleBottomCenterTextIcon,
	SparklesIcon,
	TagIcon,
	UsersIcon,
} from 'components/Icon';

import { NOTIFICATION_TYPES } from 'configs/constants';
import { routePaths } from 'routes/routeConfig';

export const generateNotification = (data) => {
	let icon = <SparklesIcon />;
	let link = '/';
	const { entity = {}, type } = data;
	const { data: entityData = {}, type: entityType = null } = entity;
	switch (type) {
		case NOTIFICATION_TYPES.FOLLOW:
			icon = <UsersIcon className="text-white" />;
			link = `${routePaths.PROFILE}/${entityData?._id}`;
			break;
		case NOTIFICATION_TYPES.LIKE:
			icon = <SparklesIcon className="text-primary-500" />;
			switch (entityType) {
				case 'comment':
					link = `${routePaths.POST}/${entityData?.postId}?commentId=${entityData?._id}`;
					break;
				case 'post':
				default:
					link = `${routePaths.POST}/${entityData?._id}`;
			}
			break;
		case NOTIFICATION_TYPES.COMMENT:
			icon = (
				<ChatBubbleBottomCenterTextIcon className="text-green-500" />
			);
			switch (entityType) {
				case 'comment':
					link = `${routePaths.POST}/${entityData?.postId}?commentId=${entityData?._id}`;
					break;
				default:
					link = `${routePaths.POST}/${entityData?._id}`;
			}
			break;
		case NOTIFICATION_TYPES.TAG:
			icon = <TagIcon className="text-yellow-500" />;
			switch (entityType) {
				case 'comment':
					link = `${routePaths.POST}/${entityData?.postId}?commentId=${entityData?._id}`;
					break;
				case 'post':
				default:
					link = `${routePaths.POST}/${entityData?._id}`;
			}
			break;
		case NOTIFICATION_TYPES.BIRTHDAY:
			icon = <CakeIcon className="text-pink-500" />;
			link = `${routePaths.PROFILE}/${data?.sender?._id}`;
			break;
		case NOTIFICATION_TYPES.EVENT:
			icon = <CalendarDaysIcon className="text-blue-500" />;
			link = `${routePaths.PROFILE}/${data?.sender?._id}`;
			break;
		default:
			break;
	}
	return { icon, link };
};
