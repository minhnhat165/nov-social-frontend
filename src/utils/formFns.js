const getDirtyFields = (data, originalData) => {
	const dirtyFields = {};
	Object.keys(data).forEach((key) => {
		// check date values
		if (data[key] instanceof Date) {
			if (data[key].getTime() !== new Date(originalData[key]).getTime()) {
				dirtyFields[key] = data[key];
			}
			return;
		}
		if (data[key] !== originalData[key]) {
			dirtyFields[key] = data[key];
		}
	});
	return dirtyFields;
};

const getFormData = (data) => {
	const formData = new FormData();
	Object.keys(data).forEach((key) => {
		if (isStringArray(data[key])) {
			data[key] = JSON.stringify(data[key]);
		}
		formData.append(key, data[key]);
	});
	return formData;
};

const isStringArray = (value) => {
	if (!Array.isArray(value)) {
		return false;
	}
	return value.every((element) => typeof element === 'string');
};

export { getDirtyFields, getFormData };
