export const getDiffTime = (startDate, endDate = new Date()) => {
	let timeDiff = Math.floor(
		(endDate.getTime() - new Date(startDate).getTime()) / 1000,
	); // calculate time difference in seconds

	if (timeDiff < 60) {
		return `Just now`;
	}

	timeDiff = Math.floor(timeDiff / 60); // calculate time difference in minutes

	if (timeDiff < 60) {
		return `${timeDiff} m`;
	}

	timeDiff = Math.floor(timeDiff / 60); // calculate time difference in hours

	if (timeDiff < 24) {
		return `${timeDiff}h`;
	}

	timeDiff = Math.floor(timeDiff / 24); // calculate time difference in days

	if (timeDiff < 365) {
		const date = new Date(startDate);
		const options = { day: '2-digit', month: 'short' };
		return date.toLocaleDateString('en-US', options);
	}

	return Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
	}).format(new Date(startDate));
};
