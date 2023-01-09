import images from 'assets/images';
import clsx from 'clsx';
import UploadField from 'components/FormElement/UploadField';
import { UserIcon } from 'components/Icon';
import useUploadImg from 'hooks/useUpLoadImg';
const AvatarForm = ({ register, initialValue, setValue }) => {
	const { imagePreview, handleUpload } = useUploadImg(
		initialValue,
		(file) => {
			setValue('avatar', { 0: file, length: 1 });
		}
	);

	return (
		<UploadField
			registration={register('avatar', {
				onChange: handleUpload,
			})}
			accept="image/*"
		>
			{({ id }) => (
				<div className=" flex h-[264px] w-full flex-col items-center justify-center rounded-xl bg-slate-100 dark:bg-dark-700">
					<AvatarUpLoad inputId={id} previewImg={imagePreview} />
					<div className="mt-4 text-slate-800 dark:text-dark-200">
						<span>Upload a profile picture.</span>
					</div>
				</div>
			)}
		</UploadField>
	);
};

const AvatarUpLoad = ({ previewImg, size = 'h-32 w-32', inputId }) => {
	return (
		<div
			className={clsx(
				'relative aspect-square max-w-fit rounded-full border p-2',
				previewImg
					? 'border-primary-700 dark:border-primary-500'
					: 'border-slate-400 dark:border-dark-600'
			)}
		>
			<div
				className={clsx(
					'flex items-center justify-center overflow-hidden rounded-full bg-slate-300 dark:bg-dark-800',
					size
				)}
			>
				{previewImg ? (
					<img
						alt="avatar"
						style={{ margin: 0 }}
						src={previewImg}
						className="block h-full w-full object-cover"
					/>
				) : (
					<UserIcon className="text-8xl text-primary-700 dark:text-primary-500" />
				)}
			</div>
			<div className="absolute top-[2px] right-[2px] h-10 w-10">
				<label
					htmlFor={inputId}
					className="text-primary-bold hover:bg-primary-bold flex h-full w-full cursor-pointer items-center  justify-center rounded-full border-2 border-slate-100 bg-slate-300 transition-all hover:bg-primary-700 hover:text-dark-50 active:scale-95 dark:border-dark-700 dark:bg-dark-800 dark:text-dark-100 dark:hover:bg-primary-500 dark:hover:text-dark-50"
				>
					<i className="fa-solid fa-plus "></i>
				</label>
			</div>
		</div>
	);
};

export default AvatarForm;
