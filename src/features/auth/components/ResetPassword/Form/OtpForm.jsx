import { useEffect, useState } from 'react';

import { Button } from 'components/Action';
import FormDescription from './FormDescription';
import { NumberField } from 'components/DataEntry';
import { ShieldCheckIcon } from 'components/Icon';
import { useTranslation } from 'react-i18next';

const Max_Digital = 6;

const OtpForm = ({ isLoading, onSubmit, onResend }) => {
	const { t } = useTranslation();
	const [isValid, setIsValid] = useState(false);
	const [value, setValue] = useState([]);

	useEffect(() => {
		if (value.filter(String).length === Max_Digital) {
			setIsValid(true);
		} else setIsValid(false);
	}, [value]);

	return (
		<section className="flex w-full flex-col items-center gap-4">
			<FormDescription
				icon={
					<ShieldCheckIcon className="text-2xl text-green-500 dark:text-green-500" />
				}
				description="Enter the verification code we just sent you on your email address"
			/>
			<NumberField
				disabled={isLoading}
				setValue={setValue}
				onSubmit={() => onSubmit(value.join(''))}
				max={Max_Digital}
			/>
			<span className="text-slate-800 dark:text-dark-100">
				Didn’t receive your code?{' '}
				<span
					onClick={onResend}
					className="cursor-pointer text-primary-700 dark:text-primary-500"
				>
					Resend.
				</span>
			</span>
			<Button
				type="submit"
				size="lg"
				disabled={!isValid}
				className="w-full"
				loading={isLoading}
				onClick={() => onSubmit(value.join(''))}
			>
				<span className="font-bold capitalize">{t('verify')}</span>
			</Button>
		</section>
	);
};

export default OtpForm;
