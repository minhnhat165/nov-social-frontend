import React, { useEffect, useState } from 'react';

const Sticky = ({ className, children }) => {
	const [sticky, setSticky] = useState(null);
	return (
		<div className="sticky h-full" ref={(ref) => setSticky(ref)}>
			{children}
		</div>
	);
};

export default Sticky;
