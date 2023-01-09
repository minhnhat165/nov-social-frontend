import { register } from 'api/authApi';
import { useMutation } from 'react-query';

export const useRegister = () => {
	return useMutation(register);
};
