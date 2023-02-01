import AvatarUploader from 'components/DataEntry/AvatarUploader';
const AvatarForm = ({ register, initialValue, setValue }) => {
	return (
		<AvatarUploader
			defaultFile={initialValue?.length > 0 ? initialValue[0] : null}
			onChange={(file) => {
				setValue('avatar', { 0: file, length: 1 });
			}}
		/>
	);
};

export default AvatarForm;
