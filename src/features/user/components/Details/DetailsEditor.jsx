import 'react-phone-input-2/lib/style.css';

import * as yup from 'yup';

import {
	CakeIcon,
	GenderIcon,
	HomeIcon,
	MailIcon,
	MapPinIcon,
	PhoneIcon,
} from 'components/Icon';
import { CancelOrOk, SwitchButton } from 'components/Action';
import { Input, InputDate, RadioGroup } from 'components/DataEntry';

import { IconWrapper } from 'components/DataDisplay';
import { Modal } from 'components/OverLay';
import PhoneInput from 'react-phone-input-2';
import PropTypes from 'prop-types';
import { Text } from 'components/Typography';
import { getDirtyFields } from 'utils/formFns';
import { useForm } from 'react-hook-form';
import { useId } from 'react';
import useUpdateProfile from 'features/user/hooks/useUpdateProfile';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
	homeTown: yup.string(),
	address: yup.string(),
	gender: yup.string().required('Gender is a required field'),
	dateOfBirth: yup
		.date()
		.max(
			new Date(),
			'Are you a time traveler? Please enter valid birth date',
		),
	profilePrivate: yup.array().of(yup.string()),
});
const DetailsEditor = ({ details, onCancel, onSubmit }) => {
	const {
		register,
		setValue,
		handleSubmit,
		getValues,
		formState: { errors, isDirty, isValid },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			homeTown: details.homeTown,
			address: details.address,
			dateOfBirth: details.dateOfBirth,
			gender: details.gender,
			phoneNumber: details.phoneNumber,
			profilePrivate: details.profilePrivate || [],
		},
	});

	const { mutate, isLoading } = useUpdateProfile({
		onSuccess: () => {
			onSubmit();
		},
	});

	const handleSubmitData = (values) => {
		const dirtyData = getDirtyFields(values, details);

		mutate(dirtyData);
	};

	const handleSwitchPublic = ({ filedName, isPublic }) => {
		if (isPublic) {
			setValue(
				'profilePrivate',
				getValues('profilePrivate').filter(
					(field) => field !== filedName,
				),
				{
					shouldValidate: true,
					shouldDirty: true,
				},
			);
		} else {
			setValue(
				'profilePrivate',
				[...getValues('profilePrivate'), filedName],
				{
					shouldValidate: true,
					shouldDirty: true,
				},
			);
		}
	};

	const id = useId();

	return (
		<Modal.Panel responsive className="flex flex-col sm:w-[480px]">
			<Modal.Header>Details</Modal.Header>
			<form
				id={id}
				className="flex-1"
				onSubmit={handleSubmit(handleSubmitData)}
			>
				<div className="overflow-y-overlay flex aspect-square h-full w-full flex-1 flex-col gap-10 px-2 py-2 sm:aspect-square sm:h-fit sm:w-[480px] sm:px-4">
					<Section title="Places Lived">
						<InputItem
							isPublic={
								!getValues('profilePrivate').includes(
									'homeTown',
								)
							}
							name="homeTown"
							icon={<HomeIcon />}
							title="Hometown"
							onSwitch={handleSwitchPublic}
						>
							<Input
								type="text"
								size="md"
								registration={register('homeTown')}
							/>
						</InputItem>
						<InputItem
							icon={<MapPinIcon />}
							title="Location"
							name="address"
							onSwitch={handleSwitchPublic}
							isPublic={
								!getValues('profilePrivate').includes('address')
							}
						>
							<Input
								type="text"
								size="md"
								registration={register('address')}
							/>
						</InputItem>
					</Section>
					<Section
						title=" Basic Info
        "
					>
						<InputItem
							icon={<CakeIcon />}
							title="Date of birth"
							name="dateOfBirth"
							onSwitch={handleSwitchPublic}
							isPublic={
								!getValues('profilePrivate').includes(
									'dateOfBirth',
								)
							}
						>
							<InputDate
								initialValue={
									new Date(details.dateOfBirth) || null
								}
								onChange={(value) => {
									if (
										new Date(value).getTime() ===
										new Date(
											getValues('dateOfBirth'),
										).getTime()
									)
										return;

									setValue('dateOfBirth', value, {
										shouldValidate: true,
										shouldDirty: true,
									});
								}}
								error={errors.dateOfBirth?.message}
							/>
						</InputItem>
						<InputItem
							icon={<GenderIcon />}
							title="Gender"
							name="gender"
							onSwitch={handleSwitchPublic}
							isPublic={
								!getValues('profilePrivate').includes('gender')
							}
						>
							<RadioGroup
								size="md"
								options={[
									{
										name: 'male',
										value: 'male',
									},
									{
										name: 'female',
										value: 'female',
									},
									{
										name: 'other',
										value: 'other',
									},
								]}
								registration={register('gender')}
							/>
						</InputItem>
					</Section>
					<Section
						title="Contact Info
           "
					>
						<InputItem
							icon={<PhoneIcon />}
							title="Phone"
							name="phoneNumber"
							onSwitch={handleSwitchPublic}
							isPublic={
								!getValues('profilePrivate').includes(
									'phoneNumber',
								)
							}
						>
							<PhoneInput
								specialLabel=""
								country={'vn'}
								placeholder="Enter phone number"
								value={getValues('phoneNumber')}
								onChange={(value) => {
									setValue('phoneNumber', value, {
										shouldValidate: true,
										shouldDirty: true,
									});
								}}
							/>
						</InputItem>
						<InputItem
							icon={<MailIcon />}
							title="Email"
							name="email"
							onSwitch={handleSwitchPublic}
							isPublic={
								!getValues('profilePrivate').includes('email')
							}
						>
							<div className="flex h-10 w-full items-center justify-center">
								<Text className="text-center">
									{details.email}
								</Text>
							</div>
						</InputItem>
					</Section>
				</div>
			</form>
			<Modal.Footer>
				<div className="ml-auto">
          <CancelOrOk
            formId={id}
						onCancel={onCancel}
						okDisabled={!isDirty || !isValid}
						okLoading={isLoading}
					/>
				</div>
			</Modal.Footer>
		</Modal.Panel>
	);
};

DetailsEditor.propTypes = {
	details: PropTypes.object,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
};

DetailsEditor.defaultProps = {
	details: {},
	onCancel: () => {},
	onSubmit: () => {},
};

export default DetailsEditor;

const InputItem = ({ isPublic, icon, title, name, children, onSwitch }) => {
	return (
		<div className="flex w-full flex-col gap-2 p-2">
			<div className="flex items-center">
				<IconWrapper className="text-normal inline-block shrink-0">
					{icon}
				</IconWrapper>
				<Text level={2} className="ml-2 inline-block">
					{title}
				</Text>
				<div className="ml-auto">
					<SwitchButton
						size="sm"
						isOn={isPublic}
						onChange={(isOn) => {
							onSwitch({ filedName: name, isPublic: isOn });
						}}
					/>
				</div>
			</div>
			<div className="flex-1">{children}</div>

			{isPublic ? (
				<Text level={2} className="text-sm ">
					This info is set <Text className="font-bold">public</Text>.
					Anyone can see it.
				</Text>
			) : (
				<Text level={2} className="text-sm ">
					This info is set <Text className="font-bold">private</Text>.
					Only you can see it.
				</Text>
			)}
		</div>
	);
};

const Section = ({ title, children }) => {
	return (
		<div className="flex flex-col gap-2">
			<Text primary className="font-bold ">
				{title}
			</Text>
			{children}
		</div>
	);
};
