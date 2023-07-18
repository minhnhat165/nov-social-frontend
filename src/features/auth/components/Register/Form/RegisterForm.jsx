import * as yup from 'yup';

import {
	ArrowLeftIcon,
	ArrowRightIcon,
	FlagIcon,
	ImageIcon,
	LockClosedIcon,
	UserIcon,
} from 'components/Icon';

import AccountForm from './AccountForm';
import AvatarForm from './AvatarForm';
import { Button } from 'components/Action';
import FinishForm from './FinishForm';
import { Form } from 'components/DataEntry';
import InformationForm from './InformationForm';
import { Stepper } from 'components/Navigation';
import { useRegister } from 'features/auth/hooks/useRegister';
import { useState } from 'react';

const schemas = [
	yup.object().shape({
		email: yup
			.string()
			.email('Email must be a valid email')
			.required('Email is a required field'),
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
	}), // Account
	yup.object().shape({
		firstName: yup.string().required('First name is a required field'),
		lastName: yup.string().required('Last name is a required field'),
		gender: yup.string().required('Gender is a required field'),
		dateOfBirth: yup
			.date()
			.max(
				new Date(),
				'Are you a time traveler? Please enter valid birth date',
			)
			.required('Birth date is a required field'),
	}), // Information
	// yup validate file type image
	yup.object().shape({
		avatar: yup.mixed().test('type', 'Unsupported Format', (value) => {
			if (!value) return true;
			return value?.length > 0 && value[0].type.includes('image');
		}),
	}), // Avatar
	yup.object().shape({}), // Finish
];

const steps = [
	{
		id: 0,
		title: 'Account',
		icon: <LockClosedIcon />,
	},
	{
		id: 1,
		title: 'Information',

		icon: <UserIcon />,
	},

	{
		id: 2,
		title: 'Avatar',
		icon: <ImageIcon />,
	},
	{
		id: 3,
		title: 'Finish',
		icon: <FlagIcon />,
	},
];

const RegisterForm = () => {
	const [currentStepId, setCurrentStepId] = useState(0);
	const [isCreated, setIsCreated] = useState(false);
	const [completedStepIds, setCompletedStepIds] = useState([]);

	const registerMutation = useRegister({
		onSuccess: () => {
			setCompletedStepIds([...completedStepIds, currentStepId]);
			setIsCreated(true);
		},
	});

	const handleNextStep = () => {
		if (currentStepId < steps.length - 1) {
			setCurrentStepId(currentStepId + 1);
			setCompletedStepIds([...completedStepIds, currentStepId]);
		}
	};

	const handleBackStep = () => {
		if (currentStepId >= 0) {
			setCurrentStepId((prev) => prev - 1);
			setCompletedStepIds((prev) =>
				prev.filter((stepId) => stepId !== currentStepId - 1),
			);
		}
	};

	const handleSubmit = (data) => {
		if (currentStepId === steps.length - 1) {
			registerMutation.mutate(data);
		} else {
			handleNextStep();
		}
	};

	return (
		<>
			<Stepper
				steps={steps}
				currentStepId={currentStepId}
				completedStepIds={completedStepIds}
			/>
			<Form
				defaultValues={{
					gender: 'male',
				}}
				onSubmit={handleSubmit}
				className="flex w-full flex-col justify-center"
				id={'2321'}
				schema={schemas[currentStepId]}
				options={{
					mode: 'onChange',
				}}
			>
				{({
					register,
					getValues,
					setValue,
					watch,
					getFieldState,
					setError,
					clearErrors,
					formState: { errors, isDirty, isValid },
				}) => (
					<>
						{currentStepId === 0 && (
							<AccountForm
								register={register}
								errors={errors}
								watch={watch}
								getFieldState={getFieldState}
								setError={setError}
								clearErrors={clearErrors}
							/>
						)}
						{currentStepId === 1 && (
							<InformationForm
								setValue={setValue}
								register={register}
								errors={errors}
								getValues={getValues}
							/>
						)}
						{currentStepId === 2 && (
							<AvatarForm
								register={register}
								errors={errors}
								setValue={setValue}
								initialValue={getValues('avatar')}
							/>
						)}
						{currentStepId === 3 && (
							<FinishForm isCreated={isCreated} />
						)}
						<div className="mt-6 flex justify-between gap-2">
							{isCreated ? (
								<Button
									size="lg"
									className="w-full"
									onClick={() => {
										// open email in new tab
										window.open(
											`https://mail.google.com/mail/u/0`,
										);
									}}
								>
									Open email
								</Button>
							) : (
								<>
									{currentStepId !== 0 && (
										<Button
											className="flex-1"
											variant="outlined"
											type="button"
											size="lg"
											onClick={handleBackStep}
											startIcon={<ArrowLeftIcon />}
										>
											Back
										</Button>
									)}
									<Button
										loading={registerMutation.isLoading}
										disabled={
											!isDirty ||
											!isValid ||
											!!errors.email
										}
										type="submit"
										size="lg"
										className="flex-1"
										endIcon={
											currentStepId !==
												steps.length - 1 && (
												<ArrowRightIcon />
											)
										}
									>
										{currentStepId === 2 &&
										!(watch('avatar')?.length > 0)
											? 'Skip'
											: currentStepId === steps.length - 1
											? 'Create account'
											: 'Next'}
									</Button>
								</>
							)}
						</div>
					</>
				)}
			</Form>
		</>
	);
};

export default RegisterForm;
