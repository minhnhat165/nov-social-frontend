import { changePassword, forgotPassword, verifyOTP } from 'api/authApi';

import { AnimatePresence } from 'framer-motion';
import AnimateSlide from 'components/Animate/AnimateSlide';
import { Button } from 'components/Action';
import ChangePasswordForm from './Form/ChangePasswordForm';
import { CheckIcon } from 'components/Icon';
import EmailForm from './Form/EmailForm';
import FormDescription from './Form/FormDescription';
import OtpForm from './Form/OtpForm';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useState } from 'react';

const ResetPassword = ({ onLogin }) => {
	const [stepper, setStepper] = useState(0);
	const [email, setEmail] = useState('');
	const [verifyToken, setVerifyToken] = useState('');
	const forgotPasswordMutation = useMutation(forgotPassword, {
		onSuccess: () => {
			if (stepper === 0) handleNextStep();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const verifyOTPMutation = useMutation(verifyOTP, {
		onSuccess: (data) => {
			setVerifyToken(data.verify_token);
			handleNextStep();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const changePasswordMutation = useMutation(changePassword, {
		onSuccess: () => {
			handleNextStep();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleNextStep = () => {
		setStepper((prev) => ++prev);
	};

	const handleSendOtp = (data) => {
		setEmail(data.email);
		forgotPasswordMutation.mutate(data.email);
	};

	const handleConfirmOtp = (data) => {
		verifyOTPMutation.mutate({ email: email, otp: data });
	};

	const handleResetPassword = (data) => {
		changePasswordMutation.mutate({
			password: data.password,
			verifyToken: verifyToken,
		});
	};

	return (
		<div
			className="rounded-xl bg-white
      dark:bg-dark-800 sm:w-96"
		>
			<AnimatePresence>
				<div>
					{stepper === 0 && (
						<AnimateSlide disabled>
							<EmailForm
								isLoading={forgotPasswordMutation.isLoading}
								onSubmit={handleSendOtp}
							/>
						</AnimateSlide>
					)}
					{stepper === 1 && (
						<AnimateSlide>
							<OtpForm
								isLoading={verifyOTPMutation.isLoading}
								onResend={() =>
									forgotPasswordMutation.mutate(email)
								}
								onSubmit={handleConfirmOtp}
							/>
						</AnimateSlide>
					)}
					{stepper === 2 && (
						<AnimateSlide>
							<ChangePasswordForm
								isLoading={changePasswordMutation.isLoading}
								onSubmit={handleResetPassword}
							/>
						</AnimateSlide>
					)}
					{stepper === 3 && (
						<AnimateSlide>
							<FormDescription
								icon={
									<CheckIcon className="text-2xl text-primary-700 dark:text-primary-500" />
								}
								description="Your password has been reset successfully"
							/>
							<Button
								className="w-full"
								size="lg"
								onClick={onLogin}
							>
								Go to login
							</Button>
						</AnimateSlide>
					)}
				</div>
			</AnimatePresence>
		</div>
	);
};

export default ResetPassword;
