import PropTypes from 'prop-types';
import React from 'react';
import { Spinner } from 'components/Loading';

export const LoadingOverlay = ({ loading, children }) => {
	return (
		<div className="relative">
			{children}
			{loading && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/70">
					<Spinner size="xl" color="primary" />
				</div>
			)}
		</div>
	);
};

LoadingOverlay.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.node,
};
