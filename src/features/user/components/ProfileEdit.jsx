import * as yup from 'yup';

import AvatarUploader from 'components/DataEntry/AvatarUploader';
import Button from 'components/Action/Button';
import CoverPhotoUploader from 'components/DataEntry/CoverPhotoUploader/CoverPhotoUploader';
import Form from 'components/DataEntry/Form';
import InputField from 'components/DataEntry/InputField';
import { Link } from 'react-router-dom';
import Text from 'components/Typography/Text';
import TextareaField from 'components/DataEntry/TextareaField';
import useUpdateProfile from '../hooks/useUpdateProfile';

const schema = yup.object().shape({
	name: yup.string().max(60).required('Display name is a required field'),
	bio: yup.string().max(160),
	avatar: yup.mixed(),
	cover: yup.mixed(),
});

const ProfileEdit = ({ profile, onCancel, onSuccess }) => {
	const updateProfile = useUpdateProfile({ onSuccess });
	const handleSubmit = (data) => {
		const formData = new FormData();
		Object.keys(data).forEach((key) => {
			if (data[key] !== profile[key]) {
				formData.append(key, data[key]);
			}
		});
		updateProfile.mutate(formData);
	};
	return (
		<div className="mb-14 w-[480px]">
			<Form
				schema={schema}
				className="overflow-y-overlay flex aspect-square w-full flex-col px-4"
				options={{
					mode: 'onChange',
				}}
				onSubmit={handleSubmit}
				defaultValues={{
					name: profile?.name,
					bio: profile?.bio,
					avatar: profile?.avatar,
					cover: profile?.cover,
				}}
			>
				{({
					register,
					setValue,
					watch,
					formState: { errors, isDirty, isValid },
				}) => (
					<>
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
									setValue('cover', value, {
										shouldDirty: true,
									});
								}}
							/>
						</Section>
						<Section title="Display name">
							<InputField
								defaultValue={profile.name}
								registration={register('name')}
								error={errors.name?.message}
							/>
						</Section>
						<Section title="Bio">
							<TextareaField
								maxLength={160}
								rows={3}
								registration={register('bio')}
								error={errors.bio?.message}
								count={watch('bio')?.length}
							/>
						</Section>
						<div className="fixed bottom-0 left-0 flex h-14 w-full items-center justify-center rounded-b-xl border-t bg-white px-4 dark:border-dark-700 dark:bg-dark-800">
							<Link
								to={`/profile/${profile._id}/about`}
								className="clickable text-primary-700 hover:underline dark:text-primary-500 dark:hover:text-primary-600"
								onClick={onCancel}
							>
								Advance profile edit
							</Link>
							<div className="ml-auto flex gap-2">
								<Button
									variant="text"
									color="secondary"
									onClick={onCancel}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									disabled={!isDirty || !isValid}
									loading={updateProfile.isLoading}
								>
									Save
								</Button>
							</div>
						</div>
					</>
				)}
			</Form>
		</div>
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

export default ProfileEdit;
