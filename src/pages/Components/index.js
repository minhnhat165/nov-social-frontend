import { forwardRef } from 'react';

const A = forwardRef((props, ref) => (
	<input ref={ref} {...props} className="FancyButton">
		{props.children}
	</input>
));

const Components = () => {
	return (
		// <div className="h-screen">
		<div className="flex h-full w-full items-start justify-evenly">
			<A title={'a'} onChange={(e) => console.log(e.target.value)} autoFocus />
		</div>
		// </div>
	);
};

export default Components;
