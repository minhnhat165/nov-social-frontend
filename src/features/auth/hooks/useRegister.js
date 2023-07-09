import cloudinaryUtils from 'utils/cloundinaryUtils';
import { register } from 'api/authApi';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';

export const useRegister = (options) => {
	return useMutation(
		async (data) => {
			try {
				if (data?.avatar) {
					const res = await cloudinaryUtils.uploadImage(
						data.avatar[0],
						'avatar',
					);
					data.avatar = res;
				}
				return register(data);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		{
			...options,
			onError: (error) => {
				toast.error(error.message);
			},
		},
	);
};
