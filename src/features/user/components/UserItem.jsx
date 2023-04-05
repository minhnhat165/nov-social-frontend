import { Avatar } from 'components/DataDisplay';
import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'components/Typography';
import clsx from 'clsx';

const sizes = {
	sm: 'p-1',
	md: 'p-2',
	lg: 'p-2',
	xl: 'p-3',
};

const UserItem = ({
	user,
	size = 'lg',
	subName = '@' + user.username,
	end,
	start,
	className,
	onClick,
}) => {
	return (
		<div
			className={clsx(
				'flex w-full items-center overflow-hidden rounded-xl transition-all',
				sizes[size],
				onClick &&
					'cursor-pointer hover:bg-slate-200 dark:hover:bg-dark-700',
				className,
			)}
			onClick={onClick}
		>
			{start && <div className="mr-2">{start}</div>}
			<div className="mr-2 shrink-0">
				<Avatar size={size} src={user.avatar} alt={user.name} />
			</div>
			<div className="mr-2 overflow-hidden">
				<Text className="block truncate text-[15px]">{user.name}</Text>
				<Text className="block truncate text-sm opacity-60">
					{subName}
				</Text>
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
