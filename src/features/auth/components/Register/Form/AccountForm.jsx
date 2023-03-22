import { Input } from 'components/DataEntry';
import { checkEmailExists } from 'api/authApi';
import { useEffect } from 'react';

export const AccountForm = ({
	register,
	errors,
	watch,
	getFieldState,
	setError,
	clearErrors,
}) => {
	const { invalid } = getFieldState('email');
	const email = watch('email');
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
			// if (error?.details[0]?.message.includes('must be a valid email')) {
			// 	setError('email', {
			// 		type: 'manual',
			// 		message: 'Email Must Be A Valid Email',
			// 	});
			// }
		}
	};

	useEffect(() => {
		if (invalid) return;
		handleCheckEmailExisted();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [invalid, email]);

	return (
		<>
			<Input
				autoFocus
				label="email"
				error={errors.email?.message}
				placeholder="Enter your email"
				registration={register('email')}
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

export default AccountForm;
