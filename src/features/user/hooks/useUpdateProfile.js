import { updateProfile as api } from 'api/userApi';
import { getFormData } from 'utils/formFns';
import { toast } from 'react-hot-toast';
import { updateProfile } from 'store/slices/profileSlice';
import { updateUser } from 'store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';

const useUpdateProfile = ({ onSuccess }) => {
	const dispatch = useDispatch();

	return useMutation(
		(data) => {
			const formData = getFormData(data);
			return api(formData);
		},
		{
			onSuccess: ({ data }) => {
				dispatch(updateProfile(data));
				const name = data.name;
				const avatar = data.avatar;

				// Check if the user has submitted a name and/or avatar to update
				if (name || avatar) {
					// Create an object with the user's update
					const userDataUpdate = {};
					if (name) {
						userDataUpdate.name = name;
					}
					if (avatar) {
						userDataUpdate.avatar = avatar;
					}
					// Check that the object is not empty
					if (Object.keys(userDataUpdate).length > 0) {
						dispatch(updateUser(userDataUpdate));
					}
				}

				toast.success('Profile updated successfully');
				onSuccess();
			},
		},
	);
};

export default useUpdateProfile;
