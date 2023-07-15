import { IconButton } from 'components/Action';
import { Input } from 'components/DataEntry';
import PropTypes from 'prop-types';
import React from 'react';
import { XMarkIcon } from 'components/Icon';
import { usePoll } from '.';

const Option = ({ option, index }) => {
	const { handleOnchange, handleRemoveOption } = usePoll();
	return (
		<div className="flex gap-2">
			<Input
				placeholder={`Option ${index + 1}`}
				size="md"
				defaultValue={option.value}
				onChange={(e) => handleOnchange(option._id, e.target.value)}
			/>
			<IconButton
				onClick={() => handleRemoveOption(option._id)}
				color="secondary"
			>
				<XMarkIcon />
			</IconButton>
		</div>
	);
};

Option.propTypes = {
	option: PropTypes.object,
	index: PropTypes.number,
};

export default Option;
