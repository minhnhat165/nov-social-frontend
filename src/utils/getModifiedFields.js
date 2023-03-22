export function isEqual(value1, value2) {
	// Handle simple data types
	if (value1 === value2) {
		return true;
	}

	// Handle arrays
	if (Array.isArray(value1) && Array.isArray(value2)) {
		if (value1.length !== value2.length) {
			return false;
		}
		for (var i = 0; i < value1.length; i++) {
			if (!isEqual(value1[i], value2[i])) {
				return false;
			}
		}
		return true;
	}

	// Handle objects
	if (
		typeof value1 === 'object' &&
		value1 !== null &&
		typeof value2 === 'object' &&
		value2 !== null
	) {
		var keys1 = Object.keys(value1);
		var keys2 = Object.keys(value2);
		if (keys1.length !== keys2.length) {
			return false;
		}
		for (var j = 0; j < keys1.length; j++) {
			var key = keys1[j];
			if (
				!value2.hasOwnProperty(key) ||
				!isEqual(value1[key], value2[key])
			) {
				return false;
			}
		}
		return true;
	}

	// Otherwise, the values are not equal
	return false;
}

export function getModifiedFields(obj1, obj2) {
	// Get all the keys of both objects
	var keys1 = Object.keys(obj1);
	var keys2 = Object.keys(obj2);

	// Find out which keys are different
	var diffKeys = keys1.concat(keys2).filter(function (key) {
		return !(keys1.includes(key) && keys2.includes(key));
	});

	// Find out which keys have different values
	var diffValues = keys1.filter(function (key) {
		return (
			obj1.hasOwnProperty(key) &&
			obj2.hasOwnProperty(key) &&
			!isEqual(obj1[key], obj2[key])
		);
	});

	// Combine both arrays of keys
	var diff = diffKeys.concat(diffValues);

	// Return an object with only the different properties
	return diff.reduce(function (result, key) {
		result[key] = obj2[key];
		return result;
	}, {});
}
