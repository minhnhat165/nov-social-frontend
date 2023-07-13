export const genQueryParams = (params) => {
	return Object.keys(params)
		.filter((key) => params[key] !== null && params[key] !== undefined)
		.map((key) => `${key}=${params[key]}`)
		.join('&');
};
