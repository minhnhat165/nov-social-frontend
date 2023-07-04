import { useCallback, useRef } from 'react';

export function useScrollIntoView() {
	const ref = useRef(null);

	const scrollIntoView = useCallback(() => {
		const element = ref.current;

		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, []);

	return { ref, scrollIntoView };
}
