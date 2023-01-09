import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

const types = {
	left: {
		enter: 'transition ease-out duration-300',
		enterFrom: 'transform -translate-x-full',
		enterTo: 'transform translate-x-0',
		leave: 'transition ease-in duration-300',
		leaveFrom: 'transform translate-x-0',
		leaveTo: 'transform -translate-x-full',
	},
	right: {
		enter: 'transition ease-out duration-300',
		enterFrom: 'transform translate-x-full',
		enterTo: 'transform translate-x-0',
		leave: 'transition ease-in duration-300',
		leaveFrom: 'transform translate-x-0',
		leaveTo: 'transform translate-x-full',
	},
};

export const SlideFrom = ({ show, from, children }) => {
	return (
		<Transition
			show={show}
			enter={types[from].enter}
			enterFrom={types[from].enterFrom}
			enterTo={types[from].enterTo}
			leave={types[from].leave}
			leaveFrom={types[from].leaveFrom}
			leaveTo={types[from].leaveTo}
		>
			{children}
		</Transition>
	);
};

SlideFrom.propTypes = {
	from: PropTypes.oneOf(['left', 'right']),
	children: PropTypes.node,
};
SlideFrom.defaultProps = {
	from: 'left',
	children: null,
};
