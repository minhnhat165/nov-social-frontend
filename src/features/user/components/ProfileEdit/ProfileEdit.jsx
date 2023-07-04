import * as yup from 'yup';

import {
	AvatarUploader,
	CoverPhotoUploader,
	Form,
	Input,
	Textarea,
} from 'components/DataEntry';

import { Button } from 'components/Action';
import { Footer } from 'components/DataDisplay/Card';
import { Link } from 'react-router-dom';
import { Text } from 'components/Typography';
import { checkUsernameAvailability } from 'api/userApi';
import { getDirtyFields } from 'utils/formFns';
import getImageFileCompression from 'utils/getImageFileCompression';
import useDebounce from 'hooks/useDebounce';
import { useEffect } from 'react';
import useUpdateProfile from 'features/user/hooks/useUpdateProfile';

let defaultUsername = '';

const schema = yup.object().shape({
	name: yup.string().max(60).required('Display name is a required field'),
	username: yup
		.string()
		.max(60)
		.required('Username is a required field')
		.matches(
			/^[a-zA-Z0-9_]+$/,
			'Username can only contain letters, numbers and underscores',
		),
	bio: yup.string().max(160),
	avatar: yup.mixed(),
	cover: yup.mixed(),
});
export const ProfileEdit = ({ profile, onCancel, onSuccess }) => {
	const updateProfile = useUpdateProfile({
		onSuccess: () => {
			onSuccess();
			defaultUsername = '';
		},
	});
	const handleSubmit = async (data) => {
		const dirtyData = getDirtyFields(data, profile);
		if (
			dirtyData?.avatar instanceof File ||
			dirtyData.avatar instanceof Blob
		) {
			dirtyData.avatar = await getImageFileCompression(dirtyData.avatar);
		}
		if (
			dirtyData?.cover instanceof Blob ||
			dirtyData.cover instanceof File
		) {
			dirtyData.cover = await getImageFileCompression(dirtyData.cover);
		}

		updateProfile.mutate(dirtyData);
	};
	return (
		<Form
			schema={schema}
			className=""
			options={{
				mode: 'onChange',
			}}
			onSubmit={handleSubmit}
			defaultValues={{
				name: profile?.name,
				bio: profile?.bio,
				avatar: profile?.avatar,
				cover: profile?.cover,
				username: profile?.username,
			}}
		>
			{({
				register,
				setValue,
				watch,
				getFieldState,
				setError,
				clearErrors,
				formState: { errors, isDirty, isValid },
			}) => (
				<>
					<div className="overflow-y-overlay flex aspect-square w-[480px] flex-col px-4">
						<Section title="Profile photo">
							<AvatarUploader
								onChange={(value) => {
									setValue('avatar', value, {
										shouldDirty: true,
									});
								}}
								defaultImage={profile.avatar}
							/>
						</Section>
						<Section title="Cover photo">
							<CoverPhotoUploader
								defaultImage={profile?.cover}
								onRemove={() =>
									setValue('cover', 'remove', {
										shouldDirty: true,
									})
								}
								onChange={(value) => {
									if (value)
										setValue('cover', value, {
											shouldDirty: true,
										});
								}}
							/>
						</Section>
						<Section title="Display name">
							<Input
								defaultValue={profile.name}
								registration={register('name')}
								error={errors.name?.message}
							/>
						</Section>
						<Section
							title="
            Username"
						>
							<UsernameInput
								registration={register('username')}
								error={errors.username?.message}
								{...{
									getFieldState,
									setError,
									clearErrors,
									watch,
								}}
							/>
						</Section>
						<Section title="Bio">
							<Textarea
								maxLength={160}
								rows={3}
								registration={register('bio')}
								error={errors.bio?.message}
								count={watch('bio')?.length}
							/>
						</Section>
					</div>
					<Footer className="flex items-center">
						<Link
							to={`/profile/${profile._id}/about`}
							className="clickable text-primary-700 hover:underline dark:text-primary-500 dark:hover:text-primary-600"
							onClick={onCancel}
						>
							Advance profile edit
						</Link>
						<div className="flex flex-1 justify-end gap-2">
							<Button
								// variant="text"

								color="secondary"
								className="min-w-[96px]"
								onClick={onCancel}
							>
								Cancel
							</Button>
							<Button
								className="min-w-[96px]"
								type="submit"
								disabled={!isDirty || !isValid}
								loading={updateProfile.isLoading}
							>
								Save
							</Button>
						</div>
					</Footer>
				</>
			)}
		</Form>
	);
};

const Section = ({ title, children }) => {
	return (
		<div className="mb-6 flex flex-col">
			<Text as="h4" level={3} className="mb-2 font-bold">
				{title}
			</Text>
			{children}
		</div>
	);
};

ProfileEdit.propTypes = {};

function UsernameInput({
	registration,
	error,
	watch,
	getFieldState,
	setError,
	clearErrors,
}) {
	const { invalid } = getFieldState('username');
	const username = watch('username');
	const debounceValue = useDebounce(username, 500);
	const handleCheckEmailExisted = async () => {
		try {
			if (!defaultUsername) defaultUsername = username;
			if (!username || username === defaultUsername) return;
			const res = await checkUsernameAvailability(username);
			if (!res.available) {
				setError('username', {
					type: 'manual',
					message: 'Username already used',
				});
			} else {
				clearErrors('username');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (invalid) return;
		handleCheckEmailExisted();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [invalid, debounceValue]);
	return (
		<Input
			startDecorator="@"
			{...{
				registration,
				error,
			}}
		/>
	);
}
