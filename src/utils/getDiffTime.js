const getDiffTime = (startDate, endDate = new Date()) => {
	let start = startDate;
	let end = endDate;

	if (typeof start === 'string') start = new Date(start);
	if (typeof end === 'string') end = new Date();
	let diffMs = end - start; // milliseconds between now & Christmas
	let diffDays = Math.floor(diffMs / 86400000); // days
	if (diffDays > 0) {
		return { number: diffDays, unit: 'd' };
	}
	let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
	if (diffHrs > 0) {
		return { number: diffHrs, unit: 'h' };
	}
	let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
	if (diffMins > 0) {
		return { number: diffMins, unit: 'm' };
	}
	let diffSec = Math.floor((end?.getTime() - start?.getTime()) / 1000);
	return {
		number: diffSec,
		unit: 's',
	};
};

export default getDiffTime;
