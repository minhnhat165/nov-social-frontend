import Avatar from 'components/Avatar';
import { useMemo } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Popover } from 'react-tiny-popover';
import AccountActionMenu from './AccountActionMenu';
import Layer from './Layer';
import SettingActionMenu from './SettingActionMenu';

const TypeActions = {
	ACCOUNT: 'ACCOUNT',
	SETTING: 'SETTING',
};

const UserActionBar = (props) => {
	const [show, setShow] = useState(false);
	const user = useSelector((state) => state.auth.user);
	const [typeAction, setTypeAction] = useState(null);

	const renderMenu = useMemo(() => {
		switch (typeAction) {
			case TypeActions.ACCOUNT:
				return <AccountActionMenu user={user} />;
			case TypeActions.SETTING:
				return <SettingActionMenu />;
			default:
				return null;
		}
	}, [typeAction, user]);

	return (
		<Popover
			onClickOutside={() => setShow(false)}
			positions={['right']}
			align="end"
			isOpen={show}
			padding={8}
			content={
				<Layer className="h-fit w-80 p-2 shadow-3xl transition-all">
					{renderMenu}
				</Layer>
			}
		>
			<div className="flex flex-col gap-4 px-2 pb-2">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 shadow dark:bg-dark-700">
					<i className="fa-solid fa-plus text-xl text-primary-700"></i>
				</div>
				<div
					className="flex h-10 w-10 cursor-pointer items-center justify-center"
					onClick={() => {
						if (typeAction === TypeActions.SETTING) {
							setTypeAction(null);
							setShow(false);
							return;
						}
						setShow(true);
						setTypeAction(TypeActions.SETTING);
					}}
				>
					<i className="fa-solid fa-gear dark:text-dark-100"></i>
				</div>
				<div
					className="cursor-pointer"
					onClick={() => {
						if (typeAction === TypeActions.ACCOUNT) {
							setTypeAction(null);
							setShow(false);
							return;
						}
						setShow(true);
						setTypeAction(TypeActions.ACCOUNT);
					}}
				>
					<Avatar src={user?.avatar} alt={user?.name} />
				</div>
			</div>
		</Popover>
	);
};

UserActionBar.propTypes = {};

export default UserActionBar;
