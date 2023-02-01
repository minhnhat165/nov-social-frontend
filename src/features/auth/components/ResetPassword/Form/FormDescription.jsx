import IconWrapper from 'components/Icon/IconWrapper';
import React from 'react';

const FormDescription = ({ icon, description }) => {
	return (
		<div className="mb-4 flex flex-col items-center gap-3">
			<div className="sbg-primary-200/50 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary-800 text-center dark:border-primary-600">
				<IconWrapper size={7}>{icon}</IconWrapper>
			</div>
			<span className="text-center text-slate-800 dark:text-dark-100">
				{description}
			</span>
		</div>
	);
};

export default FormDescription;
