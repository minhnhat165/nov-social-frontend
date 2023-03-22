import { IconWrapper } from 'components/DataDisplay';
import Layer from 'components/Layout/Layer';
import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'components/Typography';

const Menu = ({ children }) => {
	return (
		<Layer level={0} className="p-2">
			{children}
		</Layer>
	);
};

const Item = ({ icon, children, ...props }) => {
	return (
		<div
			{...props}
			className="flex h-10 cursor-pointer gap-2 rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-dark-800"
		>
			{icon && (
				<Text>
					<IconWrapper size={5}>{icon}</IconWrapper>
				</Text>
			)}
			<Text>{children}</Text>
		</div>
	);
};

Menu.Item = Item;

Menu.propTypes = {
	children: PropTypes.node,
};

export default Menu;
