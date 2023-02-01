import { forwardRef, useId } from 'react';

const UploadField = forwardRef(
	({ children, error, helper, registration, ...props }, ref) => {
		const id = useId();
		return (
			<>
				<input
					ref={ref}
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
	}
);

export default UploadField;
