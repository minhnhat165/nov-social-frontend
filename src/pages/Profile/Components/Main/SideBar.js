import React from 'react';
import { useSelector } from 'react-redux';
import { getFollowings, getUserPhotos } from '../../../../api/userApi';
import UserList from '../../../../components/UserList';
import WidgetPhoto from '../../../../components/WidgetPhoto';
import WidgetUserInfo from '../../../../components/WidgetUserInfo';
import { useAsync } from '../../../../hooks/useAsync';

const LIMIT_PHOTO = 12;
const LIMIT_FOLLOWING = 9;

const SideBar = () => {
	const user = useSelector((state) => state.profile.user);
	const { value: photos } = useAsync(
		() => getUserPhotos(user._id, LIMIT_PHOTO),
		[user._id]
	);
	const { value: followings } = useAsync(
		() => getFollowings(user._id, LIMIT_FOLLOWING),
		[user._id]
	);
	return (
		<div className="flex w-full flex-col gap-4 pb-4">
			<div>
				<div className="relative flex w-full items-center justify-center rounded-xl ">
					<div className="absolute top-1/2 left-0 h-[1px] w-full -translate-y-1/2 bg-primary/50"></div>
					<span className="button circle relative  border border-primary/50 bg-dark-very-light p-2 px-2 text-center text-xl dark:text-dark-text-regular">
						<i className="fa-duotone fa-circle-info"></i>
					</span>
				</div>
				<WidgetUserInfo user={user} />
			</div>
			<div>
				<div className="dark:bg-dark-regulars relative flex w-full items-center justify-center rounded-xl">
					<div className="absolute top-1/2 left-0 h-[1px] w-full -translate-y-1/2 bg-primary/50"></div>
					<span className="button circle relative border border-primary/50 bg-dark-very-light px-2 text-center text-xl font-light dark:text-dark-text-regular">
						<i className="fa-duotone fa-image"></i>
					</span>
				</div>
				<WidgetPhoto photos={photos} />
			</div>
			<div>
				<div className="dark:bg-dark-regulars relative flex w-full items-center justify-center rounded-xl">
					<div className="absolute top-1/2 left-0 h-[1px] w-full -translate-y-1/2 bg-primary/50"></div>
					<span className="button circle relative border border-primary/50 bg-dark-very-light px-2 text-center text-xl font-light dark:text-dark-text-regular">
						<i className="fa-duotone fa-user-group"></i>
					</span>
				</div>
				<div className="mt-4 w-full rounded-xl px-2 pt-4 dark:bg-dark-regular">
					{followings?.length > 0 && <UserList users={followings} />}
					<div className="py-2">
						<div className="cursor-pointer rounded-lg py-3 text-center text-primary transition-all dark:border-dark-border dark:hover:bg-dark-light">
							See all followings
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
