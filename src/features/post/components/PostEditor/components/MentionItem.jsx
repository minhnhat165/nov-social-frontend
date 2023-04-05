import PropTypes from 'prop-types';
import React from 'react';
import UserItem from 'features/user/components/UserItem';

const MentionItem = ({
	mention,
	theme,
	searchValue,
	isFocused,
	selectMention,
	...parentProps
}) => {
	return (
		<div {...parentProps}>
			<UserItem
				size="md"
				user={{
					...mention,
					username: mention.name,
					name: mention.username,
				}}
			/>
		</div>
	);
};

MentionItem.propTypes = {
	mention: PropTypes.object,
	theme: PropTypes.object,
	searchValue: PropTypes.string,
	isFocused: PropTypes.bool,
	selectMention: PropTypes.func,
};

export default MentionItem;
