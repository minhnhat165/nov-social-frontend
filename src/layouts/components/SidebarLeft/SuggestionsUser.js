import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSuggestionsUser } from '../../../api/userApi';
import AccountFollowButton from '../../../components/OldVer/AccountFollowButton';
import FadeInZoom from '../../../components/Animate/FadeInZoom';
import Box from '../../../components/Box';
import AccountQuickViewLoading from '../../../components/SkeletonLoading/AccountQuickViewLoading';
import routes from '../../../configs/routes';
import { useAsync } from '../../../hooks/useAsync';

const SuggestionsUser = () => {
	const user = useSelector((state) => state.auth.user);

	const { value: suggestionsUser } = useAsync(
		() => getSuggestionsUser(),
		[user?.following]
	);

	return (
		<Box
			header={
				<div className="flex items-center justify-between bg-transparent pb-2 text-lg">
					<span>
						Who to <span className="text-primary">follow</span>
					</span>
				</div>
			}
			className="h-full w-full"
		>
			<div className="flex h-full w-[320px] flex-col">
				<AnimatePresence initial={false}>
					{suggestionsUser?.map((user) => (
						<FadeInZoom key={user._id}>
							<div className="group relative flex w-full justify-center gap-2 px-2 py-2">
								<AccountFollowButton
									avatarClickAble
									nameClickAble
									className="text-sm"
									user={user}
									subName={
										<div
											className="w-full overflow-hidden truncate font-light dark:text-dark-text-light"
											title={user.email}
										>
											{user.email}
										</div>
									}
								/>
							</div>
						</FadeInZoom>
					))}
				</AnimatePresence>

				{!suggestionsUser && (
					<div className="p-1">
						<AccountQuickViewLoading />
						<AccountQuickViewLoading />
					</div>
				)}

				{suggestionsUser?.length >= 4 && (
					<Link
						to={routes.people}
						className="mt-auto shrink-0 px-2 pb-2"
					>
						<div className="text-primary cursor-pointer rounded-xl py-3 text-center transition-all dark:border-dark-border dark:hover:bg-dark-light">
							Show more
						</div>
					</Link>
				)}
			</div>
		</Box>
	);
};

export default SuggestionsUser;
