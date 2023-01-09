import { confirmOtp, resetPassword, sendOtp } from 'api/authApi';
import AnimateSlide from 'components/Animate/AnimateSlide';
import Button from 'components/Button';
import { CheckIcon } from 'components/Icon';
import { AnimatePresence } from 'framer-motion';
import { useAsyncFn } from 'hooks/useAsync';
import { useState } from 'react';
import ChangePasswordForm from './Form/ChangePasswordForm';
import EmailForm from './Form/EmailForm';
import FormDescription from './Form/FormDescription';
import OtpForm from './Form/OtpForm';

const ResetPassword = ({ onLogin }) => {
	const [stepper, setStepper] = useState(0);
	const [email, setEmail] = useState('');
	const sendOtpFn = useAsyncFn(sendOtp);
	const confirmOtpFn = useAsyncFn(confirmOtp);
	const resetPasswordFn = useAsyncFn(resetPassword);

	const handleNextStep = () => {
		setStepper((prev) => ++prev);
	};

	const handleSendOtp = (data) => {
		setEmail(data.email);
		handleNextStep();
		// sendOtpFn.execute({ email: data.email }).then(() => {
		// 	handleNextStep();
		// });
	};

	const handleConfirmOtp = (data) => {
		handleNextStep();
		// confirmOtpFn.execute({ email: email, otp: data }).then(() => {
		// 	handleNextStep();
		// });
	};

	const handleResetPassword = (data) => {
		handleNextStep();

		resetPasswordFn
			.execute({ email: email, password: data.password })
			.then(() => {
				// handleNextStep();
			});
	};

	return (
		<div
			className="w-96 rounded-xl
      bg-white dark:bg-dark-800"
		>
			<AnimatePresence>
				<div>
					{stepper === 0 && (
						<AnimateSlide disabled>
							<EmailForm
								isLoading={sendOtpFn.loading}
								onSubmit={handleSendOtp}
							/>
						</AnimateSlide>
					)}
					{stepper === 1 && (
						<AnimateSlide>
							<OtpForm
								isLoading={confirmOtpFn.loading}
								onSubmit={handleConfirmOtp}
							/>
						</AnimateSlide>
					)}
					{stepper === 2 && (
						<AnimateSlide>
							<ChangePasswordForm
								isLoading={resetPasswordFn.loading}
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
