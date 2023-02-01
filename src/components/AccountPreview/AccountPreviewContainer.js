import { useState } from 'react';
import { getUserInfo } from '../../api/userApi';
import { useAsyncFn } from '../../hooks/useAsync';
import Popover from '../OverLay/Popover';
import AccountPreview from './AccountPreview';

const AccountPreviewContainer = ({ children, userId }) => {
	const getUserFn = useAsyncFn(getUserInfo);

	const [user, setUser] = useState(null);

	const handleGetUser = () => {
		if (user) return;
		getUserFn.execute(userId).then((user) => {
			setUser(user);
		});
	};

	return (
		<div onMouseEnter={handleGetUser}>
			<Popover
				hover
				hideOnClickParent={true}
				render={
					<AccountPreview user={user} loading={getUserFn.loading} />
				}
				className={'mt-2 overflow-hidden rounded-xl'}
			>
				{children}
			</Popover>
		</div>
	);
};

export default AccountPreviewContainer;
