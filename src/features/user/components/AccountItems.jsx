import clsx from 'clsx';
import Avatar from 'components/Avatar';
import { BellIcon, CircleCheckIcon, CircleXmarkIcon } from 'components/Icon';
import Text from 'components/Text';
import { useState } from 'react';
import PropTypes from 'prop-types';

const sizes = {
	sm: 'p-1',
	md: 'p-2',
	lg: 'p-2',
	xl: 'p-3',
};

const AccountItems = ({
	user,
	isActive,
	onRemove,
	onClick,
	className,
	size,
}) => {
	const [showX, setShowX] = useState(false);
	return (
		<div
			onMouseEnter={() => setShowX(true)}
			onMouseLeave={() => setShowX(false)}
			onClick={onClick}
			className={clsx(
				'flex items-center overflow-hidden rounded-xl transition-all',
				!isActive &&
					'cursor-pointer hover:bg-slate-200 dark:hover:bg-dark-700',
				sizes[size],
				className
			)}
		>
			<Avatar
				src={user?.avatar}
				alt={user?.name}
				size={size}
				className="mr-2 shrink-0 cursor-pointer"
			/>
			<div className="mr-2 flex flex-col overflow-hidden">
				<Text className="overflow-hidden text-ellipsis font-bold">
					{user?.name}
				</Text>
				<Text
					title={user.email}
					className="overflow-hidden text-ellipsis text-sm"
				>
					{user.email}
				</Text>
			</div>
			{isActive ? (
				<CircleCheckIcon className="ml-auto text-lg text-primary-700 dark:text-primary-500" />
			) : (
				<>
					<div
						className={clsx(
							'ml-auto flex items-center transition-all duration-500 ease-in-out',
							showX ? 'mr-0' : '-mr-9'
						)}
					>
						{user?.notificationsCount > 0 && (
							<div className="relative flex h-10 items-center justify-center">
								<BellIcon className="text-2xl text-primary-700 dark:text-primary-500" />
								<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pb-1">
									<span className="text-sm font-bold text-dark-50">
										{user?.notificationsCount}
									</span>
								</div>
							</div>
						)}
						<CircleXmarkIcon
							onClick={() => onRemove(user._id)}
							className="ml-4 text-xl text-slate-600 transition-all hover:text-slate-900 active:scale-95 active:text-slate-700 dark:text-dark-300 dark:hover:text-dark-100 dark:active:text-dark-200"
						/>
					</div>
				</>
			)}
		</div>
	);
};

AccountItems.PropsTypes = {
	user: PropTypes.object.isRequired,
	isActive: PropTypes.bool,
	onRemove: PropTypes.func,
	onClick: PropTypes.func,
	className: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

AccountItems.defaultProps = {
	isActive: false,
	onRemove: () => {},
	onClick: () => {},
	size: 'md',
};

export default AccountItems;
