import Modal from 'components/OverLay/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'stories/Button';

const Header = ({ isUser }) => {
	const user = useSelector((state) => state.auth.user);
	const [showProfileEditForm, setShowProfileEditForm] = useState(false);
	return (
		<div className="pb-0s p-2s dark:bg-dark-regulars w-full rounded-xl">
			<div className="h-[328px] w-full overflow-hidden rounded-xl bg-blue-500">
				{isUser ? (
					<></>
				) : (
					// <Img src={user?.cover} className="w-full object-cover" />
					<div></div>
				)}
			</div>
			<div className="relative flex h-14 w-full justify-between pt-2">
				<div className="flex items-end justify-between gap-2">
					<div className="flex min-w-[140px] items-center justify-center rounded-xl px-4 py-2 text-base font-bold dark:bg-dark-semiBold dark:text-dark-text-bold">
						Timeline
					</div>
					<div className="flex min-w-[140px] items-center justify-center rounded-xl px-4 py-2 text-base font-bold dark:bg-dark-semiBold dark:text-dark-text-bold">
						About
					</div>
				</div>
				<div className="flex justify-evenly">
					<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-dark-very-light">
						<div className="relative h-28 w-28 overflow-hidden rounded-full">
							{/* <Img
								clickAble
								src={user?.avatar}
								className="w-full object-cover"
							/> */}
						</div>
					</div>
				</div>
				<div className="flex items-end justify-between gap-2">
					<div className="flex min-w-[140px] items-center justify-center rounded-xl px-4 py-2 text-base font-bold dark:bg-dark-semiBold dark:text-dark-text-bold">
						Photos
					</div>
					<div className="flex min-w-[140px] items-center justify-center rounded-xl px-4 py-2 text-base font-bold dark:bg-dark-semiBold dark:text-dark-text-bold">
						Following
					</div>
				</div>
			</div>
			<div className="relative flex h-16 w-full items-center justify-evenly">
				{isUser ? (
					<div className="absolute left-0 top-1/2 -translate-y-1/2 dark:text-dark-text-bold">
						<Button
							onClick={() => setShowProfileEditForm(true)}
							medium
							className="text-primary font-bold dark:bg-dark-semiBold"
						>
							<i className="fa-duotone fa-pen-to-square mr-2"></i>{' '}
							Edit
						</Button>
					</div>
				) : (
					<div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center justify-center gap-2 dark:text-dark-text-bold">
						<Link
							to={`/chat/${user._id}`}
							className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold dark:bg-dark-semiBold dark:text-dark-text-bold"
							onClick={() => setShowProfileEditForm(true)}
						>
							<i className="fa-duotone fa-message"></i>
							Chat
						</Link>
						<Link
							to={`/chat/${user._id}`}
							className="dark:bg-primary-bold flex h-9 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold dark:text-dark-text-bold"
							onClick={() => setShowProfileEditForm(true)}
						>
							<i className="fa-duotone fa-user-plus"></i>
							Follow
						</Link>
					</div>
				)}
				<div className="flex flex-1 shrink-0 justify-center text-2xl font-bold dark:text-dark-text-bold">
					<span>{user.name}</span>
				</div>
				<div className="absolute right-0 top-1/2 flex -translate-y-1/2 gap-4 ">
					<div className="flex flex-col items-center">
						<span className="text-lg font-bold dark:text-dark-text-bold">
							{user?.following?.length}
						</span>{' '}
						<span className="text-sm leading-3 dark:text-dark-text-regular">
							{' '}
							Following
						</span>
					</div>
					<div className="flex flex-col items-center">
						<span className="text-lg font-bold dark:text-dark-text-bold">
							{user?.followers?.length}
						</span>{' '}
						<span className="text-sm leading-3 dark:text-dark-text-regular">
							{' '}
							Followers
						</span>
					</div>
				</div>
			</div>
			<Modal show={showProfileEditForm} setShow={setShowProfileEditForm}>
				{/* <ProfileEditForm user={user} /> */}
			</Modal>
		</div>
	);
};

export default Header;
