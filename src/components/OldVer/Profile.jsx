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
import IconWrapper from 'components/Icon/IconWrapper';
import Intro from 'features/user/components/Intro';
import Modal from 'components/OverLay/Modal';
import Navbar from './Navbar';
import ProfileEdit from 'features/user/components/ProfileEdit';
import Text from 'components/Typography/Text';
import Tooltip from 'components/OverLay/Tooltip';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const ProfilePanel = ({ profile }) => {
	const isUser = useSelector((state) => state.auth.user._id === profile._id);

	return (
		<div className="relative flex h-full flex-col">
			<Card className="left-0 top-0 aspect-[3/1] w-[680px] overflow-hidden rounded-bl-none shadow-none">
				<Card.Image src={profile.cover}></Card.Image>
			</Card>
			<div className="flex flex-1 gap-2">
				<Card className="relative flex h-full w-[340px] flex-col gap-2 rounded-t-none p-2 shadow">
					{/* <Cover cover={profile.cover} /> */}
					<ProfileAvatar
						avatar={profile.avatar}
						name={profile.name}
					/>
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
					<div className="mt-auto">
						<Navbar />
					</div>
				</Card>
				<div className="w-[340px] pt-2">
					<Intro />
				</div>
			</div>
		</div>
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
				return <FacebookIcon />;
			case 'google':
				return <GoogleIcon />;
			case 'twitter':
				return <TwitterIcon />;
			default:
				return (
					<CubeTransparentIcon className="text-primary-700 dark:text-primary-500" />
				);
		}
	}, [type]);

	return (
		<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 dark:bg-dark-700">
			<IconWrapper>{providerLogo}</IconWrapper>
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
		<div className="flex-1s flex items-center justify-center gap-4">
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
		<div className="border-500 flex h-[72px] border-y dark:border-dark-600">
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
			className="aspect-video w-full shrink-0 overflow-hidden"
		>
			<Card.Image src={cover} />
		</Card>
	);
}

function ProfileAvatar({ avatar, name }) {
	if (!avatar && !name) return null;
	return (
		<div className="h-12">
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
		<div className="relative text-center">
			<Text as="h2" className={clsx('text-xl font-bold')}>
				{name}
			</Text>
		</div>
	);
}

function ProfileBio({ bio }) {
	if (!bio) return null;
	return (
		<Tooltip interactive content={bio}>
			<div>
				<Text as="p" className="truncate px-2 text-center" level={1}>
					{bio}
				</Text>
			</div>
		</Tooltip>
	);
}

function ProfileJoinDate({ date }) {
	return (
		<Text
			as="div"
			level={1}
			className="flex items-center justify-center gap-1"
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

// import {
// 	CalendarDaysIcon,
// 	ChatBubbleBottomCenterTextIcon,
// 	CubeTransparentIcon,
// 	FacebookIcon,
// 	GoogleIcon,
// 	PencilSquareIcon,
// 	TwitterIcon,
// 	UserPlusIcon,
// } from 'components/Icon';

// import Avatar from 'components/DataDisplay/Avatar';
// import Button from 'components/Action/Button';
// import Card from 'components/DataDisplay/Card';
// import IconButton from 'components/Action/IconButton';
// import IconWrapper from 'components/Icon/IconWrapper';
// import Intro from 'features/user/components/Intro';
// import Modal from 'components/OverLay/Modal';
// import Navbar from './Navbar';
// import ProfileEdit from 'features/user/components/ProfileEdit';
// import Text from 'components/Typography/Text';
// import Tooltip from 'components/OverLay/Tooltip';
// import clsx from 'clsx';
// import { useMemo } from 'react';
// import { useSelector } from 'react-redux';

// const ProfilePanel = ({ profile }) => {
// 	const isUser = useSelector((state) => state.auth.user._id === profile._id);

// 	return (
// 		<div className="relative">
// 			<Card className="left-0 top-0 aspect-[100/37] w-[710px] rounded-bl-none p-2 shadow-none">
// 				<div className="h-full w-full rounded-xl bg-slate-500"></div>
// 			</Card>
// 			<Card className="relative flex h-fit w-80 flex-col gap-3 rounded-t-none p-2 shadow">
// 				{/* <Cover cover={profile.cover} /> */}
// 				<ProfileAvatar avatar={profile.avatar} name={profile.name} />
// 				<DisplayName name={profile.name} />
// 				<ProfileBio bio={profile.bio} />
// 				<ProfileJoinDate date={profile.createdAt} />
// 				<ProfileProvider provider={profile.provider} />
// 				<Statistical
// 					followers={profile?.followers?.length}
// 					following={profile?.following?.length}
// 					posts={profile?.posts?.length}
// 				/>
// 				<Action isUser={isUser} profile={profile} />
// 				<div className="mt-auto">
// 					<Navbar />
// 				</div>
// 			</Card>
// 			<Intro />
// 		</div>
// 	);
// };

// const NumberAndText = ({ number, text }) => {
// 	return (
// 		<div className="flex-1 p-2 text-center">
// 			<Text className="text-lg font-bold">{number || 0}</Text>
// 			<Text level={4} as="p" className="text-slate-400">
// 				{text}
// 			</Text>
// 		</div>
// 	);
// };

// const Provider = ({ type }) => {
// 	const providerLogo = useMemo(() => {
// 		switch (type) {
// 			case 'facebook':
// 				return <FacebookIcon />;
// 			case 'google':
// 				return <GoogleIcon />;
// 			case 'twitter':
// 				return <TwitterIcon />;
// 			default:
// 				return (
// 					<CubeTransparentIcon className="text-primary-700 dark:text-primary-500" />
// 				);
// 		}
// 	}, [type]);

// 	return (
// 		<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 dark:bg-dark-700">
// 			<IconWrapper>{providerLogo}</IconWrapper>
// 		</div>
// 	);
// };

// const Edit = ({ profile }) => (
// 	<Modal.Control>
// 		<Modal.Trigger>
// 			<Button
// 				size="lg"
// 				rounded
// 				color="secondary"
// 				startIcon={<PencilSquareIcon />}
// 			>
// 				Edit Profile
// 			</Button>
// 		</Modal.Trigger>
// 		<Modal>
// 			<Modal.Close />
// 			<Modal.Props>
// 				{({ onClose }) => {
// 					return (
// 						<Modal.Panel>
// 							<Modal.Panel.Header>
// 								Edit Profile
// 							</Modal.Panel.Header>
// 							<ProfileEdit
// 								profile={profile}
// 								onCancel={onClose}
// 								onSuccess={onClose}
// 							/>
// 						</Modal.Panel>
// 					);
// 				}}
// 			</Modal.Props>
// 		</Modal>
// 	</Modal.Control>
// );

// export default ProfilePanel;

// function Action({ isUser, profile }) {
// 	return (
// 		<div className="flex flex-1 items-center justify-center gap-4">
// 			{isUser ? (
// 				<Edit profile={profile} />
// 			) : (
// 				<>
// 					<IconButton size="lg" rounded color="secondary">
// 						<ChatBubbleBottomCenterTextIcon />
// 					</IconButton>
// 					<Button
// 						size="lg"
// 						rounded
// 						color="secondary"
// 						startIcon={<UserPlusIcon />}
// 					>
// 						Follow
// 					</Button>
// 				</>
// 			)}
// 		</div>
// 	);
// }

// function Statistical({ followers, following, posts }) {
// 	return (
// 		<div className="border-500 flex h-[72px] border-y dark:border-dark-600">
// 			<NumberAndText number={followers} text="Followers" />
// 			<NumberAndText number={following} text="Following" />
// 			<NumberAndText number={posts} text="Posts" />
// 		</div>
// 	);
// }

// function Cover({ cover }) {
// 	return (
// 		<Card
// 			level={4}
// 			className="aspect-video w-full shrink-0 overflow-hidden"
// 		>
// 			<Card.Image src={cover} />
// 		</Card>
// 	);
// }

// function ProfileAvatar({ avatar, name }) {
// 	if (!avatar && !name) return null;
// 	return (
// 		<div className="h-12">
// 			<div className="relative flex -translate-y-1/2 justify-center">
// 				<Avatar
// 					size="max"
// 					src={avatar}
// 					alt={name}
// 					className="ring-4 ring-slate-50 dark:ring-dark-800"
// 				/>
// 			</div>
// 		</div>
// 	);
// }

// function DisplayName({ name }) {
// 	if (!name) return null;
// 	return (
// 		<div className="relative text-center">
// 			<Text as="h2" className={clsx('text-xl font-bold')}>
// 				{name}
// 			</Text>
// 		</div>
// 	);
// }

// function ProfileBio({ bio }) {
// 	if (!bio) return null;
// 	return (
// 		<Tooltip interactive content={bio}>
// 			<div>
// 				<Text as="p" className="truncate px-2 text-center" level={1}>
// 					{bio}
// 				</Text>
// 			</div>
// 		</Tooltip>
// 	);
// }

// function ProfileJoinDate({ date }) {
// 	return (
// 		<Text
// 			as="div"
// 			level={1}
// 			className="flex items-center justify-center gap-1"
// 		>
// 			<CalendarDaysIcon className="inline-block h-4 w-4" />
// 			Joined on{' '}
// 			{Intl.DateTimeFormat('en-US', {
// 				year: 'numeric',
// 				month: 'long',
// 			}).format(new Date(date))}
// 		</Text>
// 	);
// }

// function ProfileProvider({ provider }) {
// 	return (
// 		<div className="flex justify-center">
// 			<Provider type={provider} />
// 		</div>
// 	);
// }
