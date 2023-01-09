const variants = {
	clickAble: {
		hover: {
			scale: 1.04,
		},
		click: {
			scale: 0.9,
		},
	},
	zoom: {
		hidden: { opacity: 0, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				type: 'spring',
				stiffness: 260,
				damping: 20,
			},
		},
		exit: { opacity: 0, scale: 0 },
	},
	verticalResize: {
		hidden: { opacity: 0, height: 0 },
		visible: {
			opacity: 1,
			height: 'auto',
			transition: {
				type: 'spring',
				stiffness: 260,
				damping: 20,
			},
		},
		exit: { opacity: 0, height: 0 },
	},
	verticalResize2: {
		hidden: { opacity: 0, height: 0 },
		visible: {
			opacity: 1,
			height: '65px',
			transition: {
				type: 'spring',
				stiffness: 260,
				damping: 20,
			},
		},
		exit: { opacity: 0, height: 0 },
	},
};

export const { clickAble, zoom, verticalResize } = variants;

export default variants;
