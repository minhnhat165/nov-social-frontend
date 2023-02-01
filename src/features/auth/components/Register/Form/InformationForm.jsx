import InputDateField from 'components/DataEntry/InputDateField';
import InputField from 'components/DataEntry/InputField';
import RadioGroup from 'components/DataEntry/RadioGroup';

const InformationForm = ({ register, setValue, errors, getValues }) => {
	return (
		<>
			<div className="flex gap-x-2">
				<InputField
					label="first name"
					autoFocus
					error={errors.firstName?.message}
					registration={register('firstName')}
				/>
				<InputField
					label="last name"
					error={errors.lastName?.message}
					registration={register('lastName')}
				/>
			</div>
			<RadioGroup
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
			<InputDateField
				label="Date of birth"
				type="date"
				onChange={(value) =>
					setValue('dateOfBirth', value, {
						shouldValidate: true,
						shouldDirty: true,
					})
				}
				error={errors.dateOfBirth?.message}
				initialValue={getValues('dateOfBirth')}
			/>
		</>
	);
};

export default InformationForm;
