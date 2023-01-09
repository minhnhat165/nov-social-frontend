import Button from 'components/Button';
import Form from 'components/FormElement/Form';
import InputField from 'components/FormElement/InputField';
import { MailIcon } from 'components/Icon';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import FormDescription from './FormDescription';

const schema = yup.object().shape({
	email: yup
		.string()
		.email('Email must be a valid email')
		.required('Email is a required field'),
});

const EmailForm = (props) => {
	const { t } = useTranslation();
	return (
		<>
			<FormDescription
				icon={<MailIcon className="text-2xl text-red-400" />}
				description="Enter the email address associated with your account, we will
				send a verification code to your email"
			/>
			<Form
				schema={schema}
				onSubmit={props.onSubmit}
				className="flex w-full flex-col gap-4"
				options={{
					mode: 'onChange',
				}}
			>
				{({ register, formState: { errors, isDirty, isValid } }) => (
					<>
						<InputField
							placeholder="November@email.com"
							type="email"
							name="email"
							registration={register('email')}
							error={errors.email?.message}
							className="w-full"
						/>
						<Button
							type="submit"
							size="lg"
							disabled={!isValid || !isDirty}
							loading={props.isLoading}
							className="w-full"
						>
							<span className="font-bold capitalize">
								{t('Send code')}
							</span>
						</Button>
					</>
				)}
			</Form>
		</>
	);
};
export default EmailForm;
