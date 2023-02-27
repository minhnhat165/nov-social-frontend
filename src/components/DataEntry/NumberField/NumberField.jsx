import { Fragment, useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

let currentOtpIndex = 0;
const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

export const NumberField = ({
	title,
	disabled,
	setValue,
	onSubmit = () => {},
	max = 6,
}) => {
	const [otp, setOtp] = useState(new Array(max).fill(''));
	const [activeOptIndex, setActiveOptIndex] = useState(0);

	const inputRef = useRef(null);

	const handleOnChange = (e) => {
		const drawValue = e.target.value;
		const newOtp = [...otp];
		newOtp[currentOtpIndex] = drawValue.substring(drawValue.length - 1);
		if (drawValue) setActiveOptIndex(currentOtpIndex + 1);
		else setActiveOptIndex(currentOtpIndex - 1);
		setOtp(newOtp);
	};

	const handleKeyDown = (index, e) => {
		currentOtpIndex = index;
		if (e.key === 'Backspace') {
			setActiveOptIndex(currentOtpIndex - 1);
		} else if (e.key === 'ArrowRight') {
			if (otp[currentOtpIndex]) setActiveOptIndex(currentOtpIndex + 1);
		} else if (e.key === 'ArrowLeft') {
			if (otp[currentOtpIndex]) setActiveOptIndex(currentOtpIndex - 1);
		} else if (e.key === 'Enter') {
			if (
				currentOtpIndex + 1 === max &&
				otp.filter(String).length === max
			) {
				onSubmit();
			}
		}

		if (exceptThisSymbols.includes(e.key)) e.preventDefault();
	};

	const handlePaste = (e) => {
		let clipboardData = e.clipboardData.getData('Text');
		e.preventDefault();
		exceptThisSymbols.forEach((symbol) => {
			if (clipboardData.includes(symbol)) {
				e.preventDefault();
				return;
			}
		});

		if (clipboardData) {
			let number = clipboardData.match(/\d/g);
			currentOtpIndex = 0;
			if (number) {
				let newArray = otp.map((_, index) => {
					if (number[index]) {
						if (currentOtpIndex < max - 1) currentOtpIndex++;
						return number[index];
					} else return '';
				});
				setActiveOptIndex(currentOtpIndex);
				setOtp(newArray);
			}
		}
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, [activeOptIndex]);

	useEffect(() => {
		setValue(otp);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [otp]);

	return (
		<div className="flex w-full flex-col gap-1">
			<div className="self-start text-light-text-bold dark:text-dark-text-regular">
				{title}
			</div>
			<div className="flex w-full items-center justify-between">
				{otp.map((_, index) => {
					return (
						<Fragment key={index}>
							<input
								ref={index === activeOptIndex ? inputRef : null}
								type="number"
								value={otp[index]}
								onChange={handleOnChange}
								onKeyDown={(e) => handleKeyDown(index, e)}
								onPaste={handlePaste}
								className="h-12 w-12 rounded-xl border border-slate-200
                bg-slate-100 text-center text-2xl
                font-semibold text-light-text-bold outline-none transition focus:border-primary-700 
                disabled:cursor-not-allowed dark:border-transparent
              dark:bg-dark-700 dark:text-dark-100 dark:focus:border-primary-500"
								disabled={disabled}
							/>
						</Fragment>
					);
				})}
			</div>
		</div>
	);
};

NumberField.propTypes = {
	title: PropTypes.string,
	disabled: PropTypes.bool,
	setValue: PropTypes.func,
	onSubmit: PropTypes.func,
	max: PropTypes.number,
};

NumberField.defaultProps = {
	title: '',
	disabled: false,
	setValue: () => {},
	onSubmit: () => {},
	max: 6,
};
