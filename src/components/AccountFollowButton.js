import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import AccountQuickView from './AccountQuickView';
import FollowButton from './ButtonOld/FollowButton';
import Follow from './Follow';

const AccountFollowButton = ({
	user,
	className,
	subName,
	nameClickAble,
	avatarClickAble,
	accountPreviewAble,
}) => {
	const { _id: currentUserId } = useSelector((state) => state.auth.user);
	const RightComponent = useMemo(() => {
		if (currentUserId !== user._id)
			return <Follow followId={user._id} Button={FollowButton} />;
	}, []);
	return (
		<AccountQuickView
			className={className}
			subName={subName}
			nameClickAble={nameClickAble}
			avatarClickAble={avatarClickAble}
			accountPreviewAble={accountPreviewAble}
			user={user}
			RightComponent={RightComponent}
		/>
	);
};

export default AccountFollowButton;
