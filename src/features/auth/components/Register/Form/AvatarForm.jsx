import AvatarUploader from 'components/AvatarUploader';
const AvatarForm = ({ register, initialValue, setValue }) => {
	return (
		<AvatarUploader
			initialValue={initialValue}
			onChange={(file) => {
				setValue('avatar', { 0: file, length: 1 });
			}}
		/>
	);
};

export default AvatarForm;
