function getMonthNumber(monthName) {
	if (!monthName) return 0;
	const months = [
		'january',
		'february',
		'march',
		'april',
		'may',
		'june',
		'july',
		'august',
		'september',
		'october',
		'november',
		'december',
	];
	return months.indexOf(monthName.toLowerCase());
}

export default getMonthNumber;
