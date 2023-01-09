import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../api/authApi';
import { logout as logoutLocal } from '../../../redux/slices/authSlice';
import AccountQuickView from '../../../components/AccountQuickView';
import ToggleButton from '../../../components/SwitchDarkMode';
import { useAsyncFn } from '../../../hooks/useAsync';

const AccountDropdown = () => {
	const dispatch = useDispatch();
	const logoutFn = useAsyncFn(logout);
	const handleLogout = async () => {
		logoutFn.execute().then(() => {
			dispatch(logoutLocal());
		});
	};
	const dropdownItems = useRef([
		{
			title: 'Setting',
			icon: <i className="fa-light  fa-gear"></i>,
			description: 'Access widget settings.',
		},
		{
			title: 'Help',
			icon: <i className="fa-light  fa-circle-info"></i>,
			description: 'Contact our support.',
		},
		{
			title: 'Logout',
			icon: <i className="fa-light fa-arrow-right-from-bracket"></i>,
			description: 'Log out from your account.',
			action: handleLogout,
		},
	]);
	const user = useSelector((state) => state.auth.user);
	return (
		<div className="rounded-xl p-2 dark:bg-dark-semiBold">
			<div className="-mx-2 flex items-center justify-end border-b px-4 py-2 pb-4 dark:border-dark-border">
				<ToggleButton />
			</div>

			<div className="-mx-2 cursor-pointer p-2 dark:hover:bg-dark-light">
				<AccountQuickView user={user} />
			</div>
			<div className="-mx-2 border-t dark:border-dark-border">
				{dropdownItems.current.map((item) => (
					<div
						key={item.title}
						onClick={item.action}
						className="flex cursor-pointer items-center px-4 py-2 hover:dark:bg-dark-very-light"
					>
						<div className="mr-4 flex h-8 w-8 items-center justify-center text-base dark:text-dark-text-regular">
							{item.icon}
						</div>
						<div className="flex flex-col">
							<span className="text-sm dark:text-dark-text-bold">
								{item.title}
							</span>
							<span className="text-[12px] leading-3 dark:text-dark-text-light">
								{item.description}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AccountDropdown;
