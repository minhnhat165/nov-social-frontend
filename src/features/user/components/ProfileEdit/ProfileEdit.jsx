import * as yup from 'yup';

import AvatarUploader from 'components/DataEntry/AvatarUploader';
import Button from 'components/Action/Button';
import CoverPhotoUploader from 'components/DataEntry/CoverPhotoUploader';
import { Footer } from 'components/DataDisplay/Card';
import Form from 'components/DataEntry/Form';
import Input from 'components/DataEntry/InputField';
import { Link } from 'react-router-dom';
import Text from 'components/Typography/Text';
import TextareaField from 'components/DataEntry/Textarea';
import { getDirtyFields } from 'utils/formFns';
import getImageFileCompression from 'utils/getImageFileCompression';
import useUpdateProfile from 'features/user/hooks/useUpdateProfile';

const schema = yup.object().shape({
	name: yup.string().max(60).required('Display name is a required field'),
	bio: yup.string().max(160),
	avatar: yup.mixed(),
	cover: yup.mixed(),
});
const ProfileEdit = ({ profile, onCancel, onSuccess }) => {
	const updateProfile = useUpdateProfile({ onSuccess });
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
			}}
		>
			{({
				register,
				setValue,
				watch,
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
						<Section title="Bio">
							<TextareaField
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

export default ProfileEdit;
