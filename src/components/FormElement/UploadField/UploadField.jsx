import { useId } from 'react';

const UploadField = ({ children, error, helper, registration, ...props }) => {
	const id = useId();
	return (
		<>
			<input
				title="upload"
				placeholder="upload"
				id={id}
				hidden
				type="file"
				{...registration}
				{...props}
			/>
			{children({ id, error, helper })}
		</>
	);
};

export default UploadField;
