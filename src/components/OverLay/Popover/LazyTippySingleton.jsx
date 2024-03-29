import { forwardRef, useState } from 'react';

import Tippy from '@tippyjs/react/headless';

export const LazyTippy = forwardRef((props, ref) => {
	const [mounted, setMounted] = useState(false);

	const lazyPlugin = {
		fn: () => ({
			onMount: () => setMounted(true),
		}),
	};

	const computedProps = { ...props };

	computedProps.plugins = [lazyPlugin, ...(props.plugins || [])];

	if (props.render) {
		computedProps.render = (...args) =>
			mounted ? props.render(...args) : '';
	} else {
		computedProps.content = mounted ? props.content : '';
	}

	return <Tippy {...computedProps} ref={ref} />;
});
