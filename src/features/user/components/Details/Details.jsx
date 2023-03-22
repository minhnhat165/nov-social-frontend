import {
	CakeIcon,
	GenderIcon,
	HomeIcon,
	MailIcon,
	MapPinIcon,
	PencilIcon,
	PhoneIcon,
} from 'components/Icon';
import { Card, IconWrapper } from 'components/DataDisplay';

import { Button } from 'components/Action';
import DetailsEditor from './DetailsEditor';
import { Modal } from 'components/OverLay';
import { Text } from 'components/Typography';
import { parsePhoneNumber } from 'libphonenumber-js';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const Details = ({ isOwner }) => {
	const dateOfBirth = useSelector((state) => state.profile.data.dateOfBirth);
	const address = useSelector((state) => state.profile.data.address);
	const homeTown = useSelector((state) => state.profile.data.homeTown);
	const phoneNumber = useSelector((state) => state.profile.data.phoneNumber);
	const email = useSelector((state) => state.profile.data.email);
	const gender = useSelector((state) => state.profile.data.gender);
	const profilePrivate =
		useSelector((state) => state.profile.data?.profilePrivate) || [];

	const formattedDateOfBirth = useMemo(() => {
		if (!dateOfBirth) return null;

		return Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}).format(new Date(dateOfBirth));
	}, [dateOfBirth]);

	const formattedPhoneNumber = useMemo(() => {
		if (!phoneNumber) return null;
		return parsePhoneNumber('+' + phoneNumber);
	}, [phoneNumber]);

	return (
		<Card className="h-fit w-full">
			<Card.Header className="flex items-center justify-between">
				<Card.Title>Details</Card.Title>
				{isOwner && (
					<DetailsEdit
						details={{
							dateOfBirth,
							address,
							homeTown,
							phoneNumber,
							email,
							gender,
							profilePrivate,
						}}
					/>
				)}
			</Card.Header>
			<Card.Body className="flex flex-col gap-2">
				<div className="-mx-2 pb-2">
					{homeTown && !profilePrivate.includes('homeTown') && (
						<Item
							title="From"
							value={homeTown}
							icon={<HomeIcon />}
						/>
					)}
					{address && !profilePrivate.includes('address') && (
						<Item
							title="Lives in"
							value={address}
							icon={<MapPinIcon />}
						/>
					)}
					{formattedDateOfBirth &&
						!profilePrivate.includes('dateOfBirth') && (
							<Item
								title="Day of birth"
								value={formattedDateOfBirth}
								icon={<CakeIcon />}
							/>
						)}

					{gender && !profilePrivate.includes('gender') && (
						<Item
							title="Gender"
							value={gender}
							icon={<GenderIcon />}
						/>
					)}

					{formattedPhoneNumber &&
						!profilePrivate.includes('phoneNumber') && (
							<Item
								title="Phone"
								value={formattedPhoneNumber.formatInternational()}
								icon={<PhoneIcon />}
							/>
						)}

					{email && !profilePrivate.includes('email') && (
						<Item title="Email" value={email} icon={<MailIcon />} />
					)}
				</div>
			</Card.Body>
		</Card>
	);
};

const Item = ({ title, value, icon }) => {
	return (
		<div className="flex items-center p-2">
			<IconWrapper className="text-normal shrink-0">{icon}</IconWrapper>
			<Text level={2} className="ml-2 truncate text-[15px]">
				{title}
				<Text className="ml-1 font-bold">{value}</Text>
			</Text>
		</div>
	);
};

const DetailsEdit = ({ details }) => {
	return (
		<Modal.Root>
			<Modal.Trigger>
				<Button
					rounded
					color="secondary"
					startIcon={<PencilIcon />}
					size="sm"
				>
					Edit
				</Button>
			</Modal.Trigger>
			<Modal>
				<Modal.Props>
					{({ closeModal }) => (
						<DetailsEditor
							details={details}
							onCancel={closeModal}
							onSubmit={closeModal}
						/>
					)}
				</Modal.Props>
			</Modal>
		</Modal.Root>
	);
};
