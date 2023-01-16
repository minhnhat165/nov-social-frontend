import React from 'react';
import { useState } from 'react';

const ShowTrigger = (isShow = false, children) => {
	const [show, setShow] = useState(isShow);

	return <>{children(show, setShow)}</>;
};

export default ShowTrigger;
