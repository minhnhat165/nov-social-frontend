import React from 'react';

export function GenderIcon(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="256"
			height="256"
			viewBox="0 0 256 256"
			{...props}
		>
			<path
				className="fill-current"
				strokeMiterlimit="10"
				strokeWidth="0"
				d="M67.238 0v6h7.545L60.421 20.362a24.899 24.899 0 00-15.255-5.205 24.903 24.903 0 00-15.441 5.351l-4.38-4.38 5.273-5.273-4.242-4.242-5.273 5.273L15.217 6h7.545V0H4.975v17.788h6v-7.545l5.885 5.885-5.273 5.272 4.242 4.242 5.273-5.273 4.38 4.38a24.903 24.903 0 00-5.351 15.441c0 12.788 9.641 23.36 22.035 24.848v7.59h-7.457v6h7.457V90h6V78.63h7.456v-6h-7.456v-7.59C60.56 63.552 70.2 52.979 70.2 40.191c0-5.908-2.062-11.34-5.497-15.627l14.322-14.322v7.545h6V0H67.238zM45.166 59.226c-10.496 0-19.035-8.539-19.035-19.034 0-10.496 8.539-19.035 19.035-19.035 10.495 0 19.034 8.539 19.034 19.035 0 10.495-8.539 19.034-19.034 19.034z"
				transform="matrix(2.81 0 0 2.81 1.407 1.407)"
			></path>
		</svg>
	);
}
