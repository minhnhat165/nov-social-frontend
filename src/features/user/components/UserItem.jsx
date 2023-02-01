import clsx from 'clsx';
import Avatar from 'components/DataDisplay/Avatar';
import Text from 'components/Typography/Text';
import React from 'react';
import PropTypes from 'prop-types';
const sizes = {
	sm: 'p-1',
	md: 'p-2',
	lg: 'p-2',
	xl: 'p-3',
};

const UserItem = ({
	user,
	size = 'lg',
	subName = user.email,
	end,
	className,
	onClick,
}) => {
	return (
		<div
			className={clsx(
				'flex items-center overflow-hidden rounded-xl transition-all',
				sizes[size],
				onClick &&
					'cursor-pointer hover:bg-slate-200 dark:hover:bg-dark-700',
				className
			)}
			onClick={onClick}
		>
			<div className="mr-2 shrink-0">
				<Avatar size={size} src={user.avatar} alt={user.name} />
			</div>
			<div className="mr-2 overflow-hidden">
				<Text className="block truncate text-[15px]">{user.name}</Text>
				<Text className="block truncate text-sm">{subName}</Text>
			</div>
			{end && <div className="ml-auto">{end}</div>}
		</div>
	);
};

UserItem.propTypes = {
	user: PropTypes.object.isRequired,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
	subName: PropTypes.string,
	end: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
};

UserItem.defaultProps = {
	size: 'lg',
	end: null,
	className: '',
	onClick: null,
};

export default UserItem;
