import { Button } from '../Button';
import PropTypes from 'prop-types';
import React from 'react';

export const CancelOrOk = ({ onCancel, onOk, okDisabled, okLoading }) => {
	return (
		<div className="flex gap-2">
			<Button
				color="secondary"
				className="min-w-[96px]"
				onClick={onCancel}
			>
				Cancel
			</Button>
			<Button
				type="submit"
				className="min-w-[96px]"
				onClick={onOk}
				disabled={okDisabled}
				loading={okLoading}
			>
				Save
			</Button>
		</div>
	);
};

CancelOrOk.propTypes = {
	onCancel: PropTypes.func,
	onOk: PropTypes.func,
	okDisable: PropTypes.bool,
	okLoading: PropTypes.bool,
};

CancelOrOk.defaultProps = {
	onCancel: null,
	onOk: null,
	okDisable: false,
	okLoading: false,
};
