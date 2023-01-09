const getMonthString = (month) => {
	const monthString = new Date(0, month).toLocaleString('en-US', {
		month: 'long',
	});
	return monthString;
};
export default getMonthString;
