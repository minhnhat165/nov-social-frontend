import { Avatar, Card, FullViewImage } from 'components/DataDisplay';
import {
	CalendarDaysIcon,
	ChatBubbleBottomCenterTextIcon,
	CubeTransparentIcon,
	FacebookIcon,
	GoogleIcon,
	PencilSquareIcon,
	TwitterIcon,
} from 'components/Icon';
import { Follow, ProfileEdit } from 'features/user/components';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components/Action';
import { IconButton } from 'components/Action';
import { Modal } from 'components/OverLay';
import Navbar from './Navbar';
import { Text } from 'components/Typography';
import { cloneObject } from 'utils';
import clsx from 'clsx';
import { updateProfile } from 'store/slices/profileSlice';
import { useMemo } from 'react';
import { useModal } from 'hooks/useModal';

const ProfilePanel = ({ profile }) => {
	const isUser = useSelector(
		(state) => state.auth?.user?._id === profile?._id,
	);

	return (
		<Card
			responsive
			level={1}
			className="flex h-full w-screen flex-col gap-3 overflow-hidden shadow sm:w-96"
		>
			<Cover cover={profile.cover} />
			<Card
				level={0}
				className="mx-2 flex flex-col gap-3 px-2 pb-3 shadow"
			>
				<ProfileAvatar avatar={profile.avatar} name={profile.name} />
				<DisplayName name={profile.name} />
				<ProfileBio bio={profile.bio} />
				{profile.createdAt && (
					<ProfileJoinDate date={profile.createdAt} />
				)}
				<ProfileProvider provider={profile.provider} />
				<Statistical
					followers={profile?.followersCount}
					following={profile?.followingCount}
					posts={profile?.posts?.length}
				/>
				<Action isUser={isUser} profile={profile} />
			</Card>
			<Card className="mt-auto">
				<Navbar />
			</Card>
		</Card>
	);
};

const NumberAndText = ({ number, text }) => {
	return (
		<div className="flex-1 p-2 text-center">
			<Text className="text-lg font-bold">{number || 0}</Text>
			<Text level={4} as="p" className="text-slate-400">
				{text}
			</Text>
		</div>
	);
};

const Provider = ({ type }) => {
	const providerLogo = useMemo(() => {
		switch (type) {
			case 'facebook':
				return <FacebookIcon className="h-12 w-12" />;
			case 'google':
				return <GoogleIcon className="h-8 w-8" />;
			case 'twitter':
				return <TwitterIcon />;
			default:
				return (
					<CubeTransparentIcon className="h-8 w-8 text-primary-700 dark:text-primary-500" />
				);
		}
	}, [type]);

	return (
		<div className="flex h-10 w-10 items-center justify-center rounded-full">
			{providerLogo}
		</div>
	);
};

const Edit = ({ profile }) => {
	const { isOpen, close, open } = useModal();
	return (
		<>
			<Button
				onClick={open}
				size="md"
				rounded
				color="secondary"
				startIcon={<PencilSquareIcon />}
			>
				Edit Profile
			</Button>
			<Modal open={isOpen} onClose={close}>
				<Modal.Panel>
					<Modal.Header>Edit Profile</Modal.Header>

					<ProfileEdit
						profile={cloneObject(profile)}
						onCancel={close}
						onSuccess={close}
					/>
				</Modal.Panel>
			</Modal>
		</>
	);
};

export default ProfilePanel;

function Action({ isUser, profile }) {
	const dispatch = useDispatch();
	return (
		<div className="flex items-center justify-center gap-4 px-2 py-1">
			{isUser ? (
				<Edit profile={profile} />
			) : (
				<>
					<IconButton size="md" rounded color="secondary">
						<ChatBubbleBottomCenterTextIcon />
					</IconButton>
					<Follow
						followId={profile._id}
						followed={profile.followed}
						onChange={(followed) => {
							dispatch(
								updateProfile({
									followed,
									followersCount: followed
										? profile.followersCount + 1
										: profile.followersCount - 1,
								}),
							);
						}}
					>
						<Follow.Button />
					</Follow>
				</>
			)}
		</div>
	);
}

function Statistical({ followers, following, posts }) {
	return (
		<div className="border-500 -mx-2 flex h-[72px] border-y dark:border-dark-800">
			<NumberAndText number={followers} text="Followers" />
			<NumberAndText number={following} text="Following" />
			<NumberAndText number={posts} text="Posts" />
		</div>
	);
}

function Cover({ cover }) {
	return (
		<FullViewImage src={cover}>
			<Card
				responsive
				level={4}
				className="aspect-[3/1] w-full shrink-0 overflow-hidden !rounded-b-none"
			>
				<Card.Image src={cover} />
			</Card>
		</FullViewImage>
	);
}

function ProfileAvatar({ avatar, name }) {
	if (!avatar && !name) return null;
	return (
		<div className="relative h-12 px-2">
			<div className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center rounded-full">
				<FullViewImage src={avatar}>
					<Avatar
						size="max"
						src={avatar}
						alt={name}
						className="ring-4 ring-slate-50 dark:ring-dark-800"
					/>
				</FullViewImage>
			</div>
		</div>
	);
}

function DisplayName({ name }) {
	if (!name) return null;
	return (
		<div className="relative mt-2 px-2 text-center">
			<Text as="h2" className={clsx('text-xl font-bold')}>
				{name}
			</Text>
		</div>
	);
}

function ProfileBio({ bio }) {
	if (!bio) return null;
	return (
		<Text as="p" className="px-2 text-center italic" level={2}>
			<Text primary as="span">
				"
			</Text>{' '}
			{bio}
			<Text primary as="span">
				{' '}
				"
			</Text>
		</Text>
	);
}

function ProfileJoinDate({ date }) {
	return (
		<Text
			as="div"
			level={2}
			className="flex items-center justify-center gap-1 px-2"
		>
			<CalendarDaysIcon className="inline-block h-4 w-4" />
			Joined on{' '}
			{Intl.DateTimeFormat('en-US', {
				year: 'numeric',
				month: 'long',
			}).format(new Date(date))}
		</Text>
	);
}

function ProfileProvider({ provider }) {
	return (
		<div className="flex justify-center">
			<Provider type={provider} />
		</div>
	);
}
