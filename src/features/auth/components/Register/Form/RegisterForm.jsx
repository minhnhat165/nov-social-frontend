import { register } from 'api/authApi';
import Button from 'components/Button';
import Form from 'components/FormElement/Form';
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	FlagIcon,
	ImageIcon,
	LockIcon,
	UserIcon,
} from 'components/Icon';
import Stepper from 'components/Stepper';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { routePaths } from 'routes/routeConfig';
import * as yup from 'yup';
import AccountForm from './AccountForm';
import AvatarForm from './AvatarForm';
import FinishForm from './FinishForm';
import InformationForm from './InformationForm';

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
				'Password and confirm password does not match'
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
				'Are you a time traveler? Please enter valid birth date'
			)
			.required('Birth date is a required field'),
	}), // Information
	// yup validate file type image
	yup.object().shape({
		avatar: yup
			.mixed()
			.required('Please select an image')
			.test('type', 'Unsupported Format', (value) => {
				return value?.length > 0 && value[0].type.includes('image');
			}),
	}), // Avatar
	yup.object().shape({}), // Finish
];

const steps = [
	{
		id: 0,
		title: 'Account',
		icon: <LockIcon />,
		description: 'This is the first step',
	},
	{
		id: 1,
		title: 'Information',
		description: 'This is the second step',
		icon: <UserIcon />,
	},

	{
		id: 2,
		title: 'Avatar',
		icon: <ImageIcon />,
		description: 'This is the third step',
	},
	{
		id: 3,
		title: 'Finish',
		icon: <FlagIcon />,
		description: 'This is the third step',
	},
];

const RegisterForm = ({ onLogin }) => {
	const [currentStepId, setCurrentStepId] = useState(0);
	const [isCreated, setIsCreated] = useState(false);
	const [completedStepIds, setCompletedStepIds] = useState([]);

	const registerMutation = useMutation(register, {
		onSuccess: () => {
			setCompletedStepIds([...completedStepIds, currentStepId]);
			setIsCreated(true);
		},
		onError: (error) => {
			console.log(error);
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
				prev.filter((stepId) => stepId !== currentStepId - 1)
			);
		}
	};

	const handleSubmit = (data) => {
		if (currentStepId === steps.length - 1) {
			data.avatar =
				'https://i.pinimg.com/564x/42/cf/6e/42cf6ea7dae7548244a7d5a546bf37aa.jpg';
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
					setFocus,
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
									as={Link}
									to={routePaths.LOGIN}
								>
									Go To Login
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
										disabled={!isDirty || !isValid}
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
										watch('avatar')?.length <= 0
											? 'Skip'
											: currentStepId === steps.length - 1
											? 'Create Account'
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
