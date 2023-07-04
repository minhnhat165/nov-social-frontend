import { Input } from 'components/DataEntry';
import { checkEmailExists } from 'api/authApi';
import useDebounce from 'hooks/useDebounce';
import { useEffect } from 'react';

export const AccountForm = ({
	register,
	errors,
	watch,
	getFieldState,
	setError,
	clearErrors,
}) => {
	return (
		<>
			<EmailInput
				{...{
					register,
					errors,
					watch,
					getFieldState,
					setError,
					clearErrors,
				}}
			/>
			<Input
				label="password"
				type="password"
				error={errors.password?.message}
				placeholder="Enter password"
				registration={register('password')}
			/>
			<Input
				label="confirm password"
				placeholder="Confirm password"
				type="password"
				error={errors.confirmPassword?.message}
				registration={register('confirmPassword')}
			/>
		</>
	);
};

const EmailInput = ({
	register,
	errors,
	watch,
	getFieldState,
	setError,
	clearErrors,
}) => {
	const { invalid } = getFieldState('email');
	const email = watch('email');
	const debounceValue = useDebounce(email, 500);
	const handleCheckEmailExisted = async () => {
		try {
			if (!email) return;
			const res = await checkEmailExists(email);
			if (res.isExisted) {
				setError('email', {
					type: 'manual',
					message: 'Email is existed',
				});
			} else {
				clearErrors('email');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (invalid) return;
		handleCheckEmailExisted();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [invalid, debounceValue]);

	return (
		<Input
			autoFocus
			label="email"
			error={errors.email?.message}
			placeholder="Enter your email"
			registration={register('email')}
		/>
	);
};

export default AccountForm;
