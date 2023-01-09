import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { updateUser } from '../../../../api/userApi';
import Box from '../../../../components/Box';
import Button from '../../../../components/ButtonOld';
import CheckBoxGender from '../../../../components/CheckBoxGender';
import DropdownDatePicker from '../../../../components/DropdownDatePicker';
import InputField from '../../../../components/InputField';
import LoadingOverlay from '../../../../components/LoadingOverlay';
import TitleLine from '../../../../components/TitleLine';
import UpLoadAvatar from '../../../../components/UpLoadAvatar';
import { setUser } from '../../../../redux/slices/authSlice';
import CoverPhotoUpLoad from '../CoverPhotoUpLoad';
const schema = yup.object().shape({
	name: yup.string().required('name is a required field'),
	gender: yup.string().required('Gender is a required field'),
	phoneNumber: yup.string(),
	homeTown: yup.string(),
	address: yup.string(),
	dateOfBirth: yup
		.date()
		.max(
			new Date(),
			'Are you a time traveler? Please enter valid birth date'
		),
});
const ProfileEditForm = ({ user }) => {
	const [isEditName, setIsEditName] = useState(false);
	const [avatar, setAvatar] = useState(user?.avatar);
	const [cover, setCover] = useState(user?.cover);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [date, setDate] = useState();
	const {
		register,
		setValue,
		getValues,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: { ...user },
		mode: 'all',
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		setValue('dateOfBirth', date, { shouldValidate: true });
	}, [date]);

	const handleSubmit = async () => {
		const data = getValues();
		function getFormData(object) {
			const formData = new FormData();
			Object.keys(object).forEach((key) =>
				formData.append(key, object[key] ? object[key] : '')
			);
			return formData;
		}
		const formData = getFormData(data);
		setIsLoading(true);
		try {
			if (avatar) formData.set('avatar', avatar);
			if (cover) formData.set('cover', cover);
			const res = await updateUser(formData);
			let action = setUser(res.data.data);
			dispatch(action);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	return (
		<Box
			header={
				<div className="mb-4">
					Edit your <span className="text-primary">Profile</span>
				</div>
			}
		>
			<form
				className="flex w-[840px] border-t dark:border-dark-border"
				onSubmit={() => {}}
			>
				<div className="flex w-1/3 flex-col items-center justify-center gap-2 border-r p-2 pt-4 dark:border-dark-border">
					<div className="flex w-full flex-1 flex-col items-center justify-center gap-2">
						<UpLoadAvatar
							initialImage={user.avatar}
							setAvatarSelected={setAvatar}
						/>
						<div className="flex shrink-0 flex-col justify-start gap-2 text-center text-2xl font-bold dark:text-dark-text-bold">
							{isEditName ? (
								<input
									type="text"
									{...register('name')}
									autoFocus
									autoComplete="current-password"
									onFocus={(e) => {
										var val = e.target.value;
										e.target.value = '';
										e.target.value = val;
									}}
									className="border-primary caret-primary w-full animate-pulse border-b bg-transparent px-2 text-center outline-none"
								/>
							) : (
								<span>{user.name}</span>
							)}
							<div className="w-full cursor-pointer">
								{isEditName ? (
									<i
										onClick={() => {
											setIsEditName(false);
											setValue('name', user.name, {
												shouldValidate: true,
											});
										}}
										className="fa-duotone fa-circle-xmark"
									></i>
								) : (
									<i
										onClick={() => setIsEditName(true)}
										className="fa-duotone fa-pen-circle"
									></i>
								)}
							</div>
						</div>
					</div>
					<div className="flex w-full justify-evenly gap-2">
						<Button medium className="w-full">
							Cancel
						</Button>
						<Button
							medium
							primary
							className="w-full"
							disabled={!isValid}
							onClick={handleSubmit}
						>
							Update
						</Button>
					</div>
				</div>
				<div className="scrollAble mt-1 h-full max-h-[580px] flex-1 flex-col justify-between p-4 px-8">
					<div className="flex flex-1 flex-col gap-8">
						<section className="w-full">
							<TitleLine>
								<i className="fa-duotone fa-image"></i>
							</TitleLine>
							<label className="mb-1 block text-left font-bold text-light-text-bold dark:text-dark-text-regular">
								Cover photo
							</label>
							<div className="h-52 w-full overflow-hidden rounded-xl dark:bg-dark-bold">
								<CoverPhotoUpLoad
									img={user.cover}
									onChange={setCover}
								/>
							</div>
						</section>
						<section className="flex flex-col gap-2">
							<TitleLine>
								<i className="fa-duotone fa-circle-info"></i>
							</TitleLine>
							<DropdownDatePicker
								setDate={setDate}
								initialDate={user?.dateOfBirth}
							/>
							{errors.dateOfBirth ? (
								<span className="block text-left text-base text-red-500">
									{t(errors.dateOfBirth.message)}
								</span>
							) : (
								''
							)}
							<CheckBoxGender register={register} />
						</section>
						<section className="flex flex-col gap-2">
							<TitleLine>
								<i className="fa-duotone fa-plus"></i>
							</TitleLine>
							<InputField
								label="Phone number"
								placeholder="Phone number"
								type="tel"
								name="phoneNumber"
								error={errors.phoneNumber}
								register={register}
							/>

							<InputField
								label="Home town"
								placeholder="Address"
								type="text"
								name="homeTown"
								register={register}
								error={errors.homeTown}
							/>
							<InputField
								label="Current town/city"
								placeholder="Address"
								type="text"
								name="address"
								register={register}
								error={errors.address}
							/>
						</section>
					</div>
				</div>
			</form>
			{isLoading && <LoadingOverlay />}
		</Box>
	);
};

export default ProfileEditForm;
