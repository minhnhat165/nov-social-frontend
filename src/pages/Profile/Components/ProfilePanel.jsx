import {
	CalendarDaysIcon,
	ChatBubbleBottomCenterTextIcon,
	CubeTransparentIcon,
	FacebookIcon,
	GoogleIcon,
	PencilSquareIcon,
	TwitterIcon,
	UserPlusIcon,
} from 'components/Icon';

import Avatar from 'components/DataDisplay/Avatar';
import Button from 'components/Action/Button';
import Card from 'components/DataDisplay/Card';
import IconButton from 'components/Action/IconButton';
import Modal from 'components/OverLay/Modal';
import Navbar from './Navbar';
import ProfileEdit from 'features/user/components/ProfileEdit';
import Text from 'components/Typography/Text';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const ProfilePanel = ({ profile }) => {
	const isUser = useSelector((state) => state.auth.user._id === profile._id);

	return (
		<Card
			level={1}
			className="max-w-96 flex h-full w-[24vw] flex-col gap-3 overflow-hidden shadow"
		>
			<Cover cover={profile.cover} />
			<Card
				level={0}
				className="mx-2 flex flex-col gap-3 px-2 pb-3 shadow"
			>
				<ProfileAvatar avatar={profile.avatar} name={profile.name} />
				<DisplayName name={profile.name} />
				<ProfileBio bio={profile.bio} />
				<ProfileJoinDate date={profile.createdAt} />
				<ProfileProvider provider={profile.provider} />
				<Statistical
					followers={profile?.followers?.length}
					following={profile?.following?.length}
					posts={profile?.posts?.length}
				/>
				<Action isUser={isUser} profile={profile} />
			</Card>
			<Card className="mt-auto p-2">
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

const Edit = ({ profile }) => (
	<Modal.Control>
		<Modal.Trigger>
			<Button
				size="lg"
				rounded
				color="secondary"
				startIcon={<PencilSquareIcon />}
			>
				Edit Profile
			</Button>
		</Modal.Trigger>
		<Modal>
			<Modal.Close />
			<Modal.Props>
				{({ onClose }) => {
					return (
						<Modal.Panel>
							<Modal.Panel.Header>
								Edit Profile
							</Modal.Panel.Header>
							<ProfileEdit
								profile={profile}
								onCancel={onClose}
								onSuccess={onClose}
							/>
						</Modal.Panel>
					);
				}}
			</Modal.Props>
		</Modal>
	</Modal.Control>
);

export default ProfilePanel;

function Action({ isUser, profile }) {
	return (
		<div className="flex flex-1 items-center justify-center gap-4 px-2">
			{isUser ? (
				<Edit profile={profile} />
			) : (
				<>
					<IconButton size="lg" rounded color="secondary">
						<ChatBubbleBottomCenterTextIcon />
					</IconButton>
					<Button
						size="lg"
						rounded
						color="secondary"
						startIcon={<UserPlusIcon />}
					>
						Follow
					</Button>
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
		<Card
			level={4}
			className="aspect-[3/1] w-full shrink-0 overflow-hidden rounded-b-none"
		>
			<Card.Image src={cover} />
		</Card>
	);
}

function ProfileAvatar({ avatar, name }) {
	if (!avatar && !name) return null;
	return (
		<div className="h-12 px-2">
			<div className="relative flex -translate-y-1/2 justify-center">
				<Avatar
					size="max"
					src={avatar}
					alt={name}
					className="ring-4 ring-slate-50 dark:ring-dark-800"
				/>
			</div>
		</div>
	);
}

function DisplayName({ name }) {
	if (!name) return null;
	return (
		<div className="relative px-2 text-center">
			<Text as="h2" className={clsx('text-xl font-bold')}>
				{name}
			</Text>
		</div>
	);
}

function ProfileBio({ bio }) {
	if (!bio) return null;
	return (
		<Text as="p" className="px-2 text-center" level={1}>
			{bio}
		</Text>
	);
}

function ProfileJoinDate({ date }) {
	return (
		<Text
			as="div"
			level={1}
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
