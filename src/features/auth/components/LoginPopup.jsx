import { useEffect, useState } from 'react';

const LoginPopup = ({ url, width, height, children }) => {
	const [windowPopup, setWindowPopup] = useState(null);

	const showPopup = () => {
		const left = Math.max(0, (window.innerWidth - width) / 2);
		const top = Math.max(0, (window.innerHeight - height) / 2);
		const windowPopup = window.open(
			url,
			'Login',
			`width=${width}, height=${height}, top=${top}, left=${left} location=yes, menubar=no, status=no, toolbar=no, scrollbars=no, resizable=no`,
			window.addEventListener('message', (event) => {
				console.log(event.data);
			})
		);

		console.log(windowPopup.location.href);

		if (!windowPopup) {
			alert('Please allow popups for this website');
			return;
		}
		windowPopup.focus();
	};
	return <div onClick={showPopup}>{children}</div>;
};

LoginPopup.defaultProps = {
	width: 500,
	height: 600,
};

export default LoginPopup;
