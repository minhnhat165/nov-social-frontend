import { Avatar } from 'components/DataDisplay';
import { ProfilePreviewWrapper } from '../ProfilePreview';
import PropTypes from 'prop-types';
import { Text } from 'components/Typography';
import { UserProvider } from 'features/user/context';
import clsx from 'clsx';
import { memo } from 'react';

const sizes = {
	sm: 'p-1',
	md: 'p-1.5 rounded-lg',
	lg: 'py-1.5 px-2',
	xl: 'p-3',
};

const textSizes = {
	sm: 'text-sm',
	md: 'text-sm',
	lg: 'text-md',
	xl: 'text-xl',
};

const subNameSizes = {
	sm: 'text-xs',
	md: 'text-xs',
	lg: 'text-xs',
	xl: 'text-lg',
};

const UserItem = ({
	user,
	size,
	subName = '@' + user.username,
	end,
	start,
	onClick,
	className,
	hasPreview,
}) => {
	const Wrapper = hasPreview ? ProfilePreviewWrapper : 'div';
	return (
		<UserProvider user={user}>
			<div
				className={clsx(
					'flex w-full items-center overflow-hidden rounded-xl transition-all',
					sizes[size],
					onClick &&
						'cursor-pointer hover:bg-slate-200/50 dark:hover:bg-dark-700/50',
					className,
				)}
				onClick={onClick}
			>
				{start && <div className="mr-2">{start}</div>}
				<div className="mr-2.5 shrink-0">
					<Wrapper user={user}>
						<Avatar size={size} src={user.avatar} alt={user.name} />
					</Wrapper>
				</div>
				<div className="mr-2.5 overflow-hidden">
					<div className="flex justify-start">
						<Wrapper user={user}>
							<Text className={clsx('truncate', textSizes[size])}>
								{user.name}
							</Text>
						</Wrapper>
					</div>
					<Text
						className={clsx(
							'block truncate text-sm opacity-60',
							subNameSizes[size],
						)}
					>
						{subName}
					</Text>
				</div>
				{end && <div className="ml-auto">{end}</div>}
			</div>
		</UserProvider>
	);
};

UserItem.propTypes = {
	user: PropTypes.object.isRequired,
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
	subName: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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
const MemoizedUserItem = memo(UserItem);

export { MemoizedUserItem as UserItem };
