import { Cog6ToothIcon, PlusIcon } from 'components/Icon';
import { Modal, Popover, Tooltip } from 'components/OverLay';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import AccountMenu from './AccountMenu';
import { Avatar } from 'components/DataDisplay';
import { IconButton } from 'components/Action';
import Layer from 'components/Layout/Layer';
import PostEditor from 'features/post/components/PostEditor/PostEditor';
import SettingMenu from './SettingMenu';
import socket from 'configs/socket-config';
import { toast } from 'react-hot-toast';
import { updateLinkedAccount } from 'store/slices/authSlice';
import { useCreatePost } from 'features/post/hooks';
import { useQueryClient } from 'react-query';

const EndSidebar = () => {
	return (
		<Layer level={0} className="mx-1 mt-auto rounded-lg py-2">
			<div className="flex flex-col gap-4 px-2">
				<Creator />
				<Setting />
				<Account />
			</div>
		</Layer>
	);
};

const Account = () => {
	const user = useSelector((state) => {
		return {
			_id: state.auth.user?._id,
			name: state.auth.user?.name,
			avatar: state.auth.user?.avatar,
			hasLinkedAccountsNotify: state.auth.user?.hasLinkedAccountsNotify,
		};
	});

	const dispatch = useDispatch();

	useEffect(() => {
		socket.on('server.notification.link.count', (data) => {
			dispatch(
				updateLinkedAccount({
					_id: data.accountId,
					numNotifications: data.numNotifications,
				}),
			);
		});
		return () => {
			socket.off('server.notification.link.count');
		};
	}, []);

	return (
		<Popover
			interactive
			appendTo={document.body}
			placement="right-end"
			hideOnClick
			offset={[8, 16]}
			render={
				<Popover.Content className="h-fit w-80 p-2 shadow-3xl transition-all">
					<Popover.Arrow />
					<AccountMenu />
				</Popover.Content>
			}
		>
			<Tooltip content={'Account'} placement="right">
				<div className="cursor-pointer transition-all hover:opacity-70 active:translate-y-0.5 active:opacity-50">
					<Avatar
						src={user?.avatar}
						alt={user?.name}
						className="relative"
					>
						{user?.hasLinkedAccountsNotify && <Avatar.Status />}
					</Avatar>
				</div>
			</Tooltip>
		</Popover>
	);
};

const Setting = () => {
	return (
		<Popover
			interactive
			appendTo={'parent'}
			placement="right-end"
			offset={[64, 16]}
			render={
				<Popover.Content className="h-fit w-80 p-2 shadow-3xl transition-all">
					<Popover.Arrow />
					<SettingMenu />
				</Popover.Content>
			}
		>
			<div className="flex h-10 w-10 cursor-pointer items-center justify-center">
				<Cog6ToothIcon className="h-6 w-6 text-slate-800 dark:text-dark-100" />
			</div>
		</Popover>
	);
};

function Creator() {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();
	const { mutateAsync } = useCreatePost({
		onSuccess: (data) => {
			queryClient.setQueryData('timeline', (oldData) => {
				if (!oldData) return;
				const newData = {
					...oldData,
					pages: [
						{
							...oldData.pages[0],
							items: [data, ...oldData.pages[0].items],
						},
						...oldData.pages.slice(1),
					],
				};
				return newData;
			});
			toast.success('Post updated successfully');
			handleClose();
		},
	});

	const handleClose = () => setOpen(false);
	return (
		<>
			<Tooltip content={'Create'} placement="right">
				<div>
					<IconButton
						rounded
						color="secondary"
						onClick={() => setOpen(true)}
					>
						<PlusIcon className="h-6 w-6 text-primary-700" />
					</IconButton>
				</div>
			</Tooltip>
			<Modal open={open} onClose={handleClose}>
				<Modal.Panel>
					<Modal.Header>Create post</Modal.Header>
					<Modal.Body className="my-0 w-[600px] px-0 !pb-0">
						<PostEditor autoFocus={true} onSubmit={mutateAsync} />
					</Modal.Body>
				</Modal.Panel>
			</Modal>
		</>
	);
}

EndSidebar.propTypes = {};

export default EndSidebar;
