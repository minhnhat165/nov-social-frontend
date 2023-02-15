import * as yup from 'yup';

import Button from 'components/Action/Button';
import Form from 'components/DataEntry/Form';
import FormDescription from './FormDescription';
import { Input } from 'postcss';
import { KeyIcon } from 'components/Icon';
import { useTranslation } from 'react-i18next';

const schema = yup.object().shape({
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is a required field'),
	confirmPassword: yup
		.string()
		.oneOf(
			[yup.ref('password'), null],
			'Password and confirm password does not match',
		),
});

const ChangePasswordForm = ({ onSubmit, isLoading }) => {
	const { t } = useTranslation();
	return (
		<>
			<FormDescription
				icon={<KeyIcon className="text-2xl text-yellow-500" />}
				description="Set your new password"
			/>
			<Form
				schema={schema}
				options={{
					mode: 'onChange',
				}}
				onSubmit={onSubmit}
				className="flex w-full flex-col gap-4"
			>
				{({ register, formState: { errors, isDirty, isValid } }) => (
					<>
						<Input
							autoFocus
							label={t('New password')}
							placeholder={t('Password')}
							type="password"
							registration={register('password')}
							error={errors.password?.message}
						/>

						<Input
							label={t('Confirm new password')}
							placeholder={t('Confirm password')}
							type="password"
							registration={register('confirmPassword')}
							error={errors.confirmPassword?.message}
						/>
						<Button
							type="submit"
							size="lg"
							disabled={!isValid || !isDirty}
							loading={isLoading}
							className="mt-4 w-full"
						>
							<span className="font-bold capitalize">
								{t('confirm')}
							</span>
						</Button>
					</>
				)}
			</Form>
		</>
	);
};

export default ChangePasswordForm;
