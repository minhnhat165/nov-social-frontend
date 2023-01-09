import { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
// import AccountPreview from './AccountPreview/AccountPreview';
import AccountPreviewContainer from './AccountPreview/AccountPreviewContainer';
import Avatar from './Avatar';
import LinkToProfile from './LinkToProfile';
import TextLink from './TextLink';

const AccountQuickView = ({
	user,
	className,
	subName,
	RightComponent,
	nameClickAble,
	avatarClickAble,
	accountPreviewAble,
	showFollowButton,
}) => {
	const renderAvatar = useMemo(() => {
		let AvatarWrapper = Fragment;
		let AvatarWrapperProps = {};
		if (accountPreviewAble) {
			AvatarWrapperProps = {
				userId: user._id,
			};
			AvatarWrapper = AccountPreviewContainer;
		}
		const Wrap = avatarClickAble ? LinkToProfile : Fragment;
		const wrapProps = avatarClickAble ? { id: user._id } : null;

		return (
			<AvatarWrapper {...AvatarWrapperProps}>
				<div className="relative shrink-0">
					<Wrap {...wrapProps}>
						<Avatar url={user.avatar} />
						<div className="absolute top-0 left-0 bottom-0 right-0 rounded-full transition-all hover:bg-primary/20"></div>
					</Wrap>
				</div>
			</AvatarWrapper>
		);
	}, [user._id, user.avatar]);

	const renderName = useMemo(() => {
		return (
			<span className="font-bold leading-4 dark:text-dark-text-bold ">
				{nameClickAble ? (
					<TextLink text={user.name} link={`/profile/${user._id}`} />
				) : (
					user.name
				)}
			</span>
		);
	}, [nameClickAble, user._id, user.name]);

	return (
		<div
			className={`flex w-full items-center gap-2 rounded-xl p-[6px] text-[15px] ${className}`}
		>
			{renderAvatar}
			<div className="flex flex-1 flex-col overflow-hidden">
				{renderName}
				{subName}
			</div>
			<div className="shrink-0">{RightComponent}</div>
		</div>
	);
};

export default AccountQuickView;
