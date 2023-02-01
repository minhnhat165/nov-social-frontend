import { register } from 'api/authApi';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import cloudinaryUtils from 'utils/cloundinaryUtils';

export const useRegister = (options) => {
	return useMutation(
		async (data) => {
			try {
				const res = await cloudinaryUtils.uploadImage(
					data.avatar[0],
					'avatar'
				);

				return register({
					...data,
					avatar: res,
				});
			} catch (error) {
				return Promise.reject(error);
			}
		},
		{
			...options,
			onError: (error) => {
				toast.error(error.message);
			},
		}
	);
};
