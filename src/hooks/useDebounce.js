import { useState, useEffect } from 'react';

function useDebounce(delay) {
	const [value, setValue] = useState();
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(handler);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const handleChangeValue = (value) => {
		setValue(value);
	};
	return { debouncedValue, handleChangeValue };
}

export default useDebounce;
