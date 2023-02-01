import React from 'react';

export function SpinnerIcon({ className, ...props }) {
	return (
		<svg {...props} className={`spinner ${className}`} viewBox="0 0 50 50">
			<circle
				cx="25"
				cy="25"
				r="20"
				fill="none"
				strokeWidth="5"
				className="path"
			></circle>
		</svg>
	);
}
