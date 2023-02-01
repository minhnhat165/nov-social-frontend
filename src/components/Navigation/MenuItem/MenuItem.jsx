import Text from 'components/Typography/Text';
import React from 'react';
import PropTypes from 'prop-types';
import IconWrapper from 'components/Icon/IconWrapper';

const MenuItem = ({ icon, title, onClick, end }) => {
	return (
		<div
			onClick={onClick}
			className="flex h-12 cursor-pointer items-center rounded-xl hover:bg-slate-200 dark:hover:bg-dark-700"
		>
			<div className="flex h-10 w-10 items-center justify-center">
				<Text>
					<IconWrapper size={6}>{icon}</IconWrapper>
				</Text>
			</div>
			<Text>{title}</Text>
			{end && <Text className="ml-auto mr-2">{end}</Text>}
		</div>
	);
};

MenuItem.propTypes = {
	icon: PropTypes.node,
	title: PropTypes.string,
	onClick: PropTypes.func,
	end: PropTypes.node,
};

MenuItem.defaultProps = {
	icon: null,
	title: '',
	onClick: null,
	end: null,
};

export default MenuItem;
