import { useEffect, useState } from 'react';

import { intlFormatDistance } from 'date-fns/esm';

export const useTimeDisplay = (
	date,
	options = {
		addSuffix: false,
		includeSeconds: false,
		style: 'short',
		secondsAlternativeText: 'Just now',
	},
) => {
	const {
		addSuffix = false,
		includeSeconds = false,
		style = 'short',
	} = options;

	const [time, setTime] = useState(
		intlFormatDistance(date, new Date(), {
			style,
		}),
	);

	useEffect(() => {
		const timeUnit = getTimeUnit(time);
		const interval = setInterval(() => {
			setTime(
				intlFormatDistance(date, new Date(), {
					style,
				}),
			);
		}, milliseconds[timeUnit]);

		return () => clearInterval(interval);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date]);

	const formattedTime = time.replace('.', '');
	if (!includeSeconds && formattedTime.includes('sec')) {
		return options.secondsAlternativeText;
	}
	if (!addSuffix) {
		return formattedTime.replace(' ago', '');
	}
	return formattedTime;
};

const milliseconds = {
	s: 1000 * 60,
	m: 1000 * 60,
	h: 1000 * 60 * 60,
	d: 1000 * 60 * 60 * 24,
	w: 1000 * 60 * 60 * 24 * 7,
	y: 1000 * 60 * 60 * 24 * 365,
};

const getTimeUnit = (time) => {
	switch (time) {
		case 'now':
			return 's';
		case 'yesterday':
		case 'tomorrow':
			return 'd';
		case 'last week':
		case 'next week':
			return 'w';
		case 'last month':
		case 'next month':
			return 'm';
		case 'last year':
		case 'next year':
			return 'y';
		default:
			return time.split(' ')[1].toLowerCase().charAt(0);
	}
};
