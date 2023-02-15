import AvatarUploader from 'components/DataEntry/AvatarUploader';
import getImageFromFile from 'utils/getImageFromFile';

const AvatarForm = ({ initialValue, setValue }) => {
	return (
		<AvatarUploader
			defaultImage={getImageFromFile(
				initialValue?.length > 0 ? initialValue[0] : null,
			)}
			onChange={(file) => {
				setValue('avatar', { 0: file, length: 1 });
			}}
		/>
	);
};

export default AvatarForm;
