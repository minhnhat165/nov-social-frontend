import React, { Children, cloneElement, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useImgUploader } from './ImgUpLoaderContext';

const Preview = ({
	defaultPreviews: initialDefaultPreviews = [],
	children,
	hideOnEmpty = false,
	onRemoveDefault,
}) => {
	const { files, multiple, removeUpload } = useImgUploader();
	const [previews, setPreviews] = useState([]);
	const [defaultPreviews, setDefaultPreviews] = useState(
		initialDefaultPreviews,
	);
	useEffect(() => {
		const uploadPreviews = files ? files.map((file) => file.preview) : [];
		if (multiple) setPreviews([...defaultPreviews, ...uploadPreviews]);
		else setPreviews(uploadPreviews);
	}, [defaultPreviews, files, multiple]);

	const removeImg = (url) => {
		if (defaultPreviews.includes(url)) {
			setDefaultPreviews((prev) => [
				...prev.filter((preview) => preview !== url),
			]);
			onRemoveDefault && onRemoveDefault(url);
			return;
		}
		removeUpload(url);
	};

	return (
		<>
			{(!hideOnEmpty || (previews && previews.length > 0)) && (
				<>
					{children && typeof children === 'function'
						? children({ previews, removeImg })
						: Children.map(children, (child, index) => {
								return cloneElement(child, {
									src: previews[index],
								});
						  })}
				</>
			)}
		</>
	);
};

Preview.propTypes = {
	defaultPreviews: PropTypes.array,
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
	hideOnEmpty: PropTypes.bool,
	onRemoveDefault: PropTypes.func,
};

export default Preview;
