import { Input, InputDate, RadioGroup } from 'components/DataEntry';

const InformationForm = ({ register, setValue, errors, getValues }) => {
	return (
		<>
			<div className="flex gap-x-2">
				<Input
					label="first name"
					autoFocus
					error={errors.firstName?.message}
					registration={register('firstName')}
				/>
				<Input
					label="last name"
					error={errors.lastName?.message}
					registration={register('lastName')}
				/>
			</div>
			<RadioGroup
				size="lg"
				options={[
					{
						name: 'male',
						value: 'male',
					},
					{
						name: 'female',
						value: 'female',
					},
					{
						name: 'other',
						value: 'other',
					},
				]}
				label="gender"
				error={errors.gender?.message}
				registration={register('gender')}
			/>
			<InputDate
				label="Date of birth"
				size="lg"
				type="date"
				onChange={(value) =>
					setValue('dateOfBirth', value, {
						shouldValidate: true,
						shouldDirty: true,
					})
				}
				error={errors.dateOfBirth?.message}
				initialValue={new Date(getValues('dateOfBirth')) || null}
			/>
		</>
	);
};

export default InformationForm;
