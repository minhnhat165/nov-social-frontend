const getShortenedFraction = (numerator, denominator) => {
	const gcd = (a, b) => {
		if (b === 0) {
			return a;
		}
		return gcd(b, a % b);
	};
	const divisor = gcd(numerator, denominator);
	return [numerator / divisor, denominator / divisor];
};

export default getShortenedFraction;
