export const extractPath = (path) => {
	const pathArr = path.split('/');
	return {
		postId: pathArr[0],
		parentIds: pathArr.slice(1),
	};
};
