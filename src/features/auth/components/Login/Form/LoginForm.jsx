import Button from 'components/Button';
import Form from 'components/FormElement/Form';
import InputField from 'components/FormElement/InputField';
import React from 'react';
import { useId } from 'react';
import * as yup from 'yup';
const schema = yup.object().shape({
	email: yup
		.string()
		.email('Email must be a valid email')
		.required('Email is a required field'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is a required field'),
});
const LoginForm = ({ onSubmit, loading }) => {
	const id = useId();
	return (
		<Form
			className="flex w-full flex-col justify-start"
			id={id}
			schema={schema}
			options={{
				mode: 'onChange',
			}}
			onSubmit={onSubmit}
		>
			{({ register, formState: { errors, isDirty, isValid } }) => (
				<>
					<InputField
						autoFocus
						label="email"
						placeholder="Enter your email"
						error={errors.email?.message}
						registration={register('email')}
					/>
					<InputField
						placeholder="Enter your password"
						label="password"
						type="password"
						error={errors.password?.message}
						registration={register('password')}
					/>
					<Button
						loading={loading}
						disabled={!isDirty || !isValid}
						type="submit"
						size="lg"
						className="my-6"
					>
						Login
					</Button>
				</>
			)}
		</Form>
	);
};

export default LoginForm;
