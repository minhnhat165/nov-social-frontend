import React, { useMemo } from 'react';
import { intlFormatDistance } from 'date-fns';
const Time = ({ date }) => {
	const formattedDistance = useMemo(() => {
		return intlFormatDistance(new Date(date), new Date(), { style: 'short' });
	}, [date]);
	return (
		<div className="text-sm dark:text-dark-text-light">{formattedDistance}</div>
	);
};

export default Time;
