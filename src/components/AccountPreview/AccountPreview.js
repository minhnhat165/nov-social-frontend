import Button from 'components/Action/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '../DataDisplay/Avatar';
import Follow from '../Follow';
import LoadingOverlay from '../LoadingOverlay';
const AccountPreview = ({ user, loading }) => {
	const navigate = useNavigate();
	const currentUserId = useSelector((state) => state.auth.user._id);

	return (
		<div className="relative min-h-[160px] min-w-[300px] p-4 dark:bg-dark-semiBold">
			{loading && <LoadingOverlay />}
			{user && (
				<div className="flex flex-col gap-2">
					<Avatar size="w-12 h-12" url={user?.avatar} />
					<span className="font-bold text-dark-text-bold">
						{user?.name}
					</span>
					<div className="text-dark-text-regular">Basic info</div>
					<div className="flex gap-2">
						<span className="text-dark-text-regular">
							<span className="font-bold text-dark-text-bold">
								{user?.following?.length}
							</span>{' '}
							Following
						</span>
						<span className="text-dark-text-regular">
							<span className="font-bold text-dark-text-bold">
								{user?.followers?.length}
							</span>{' '}
							Followers
						</span>
					</div>
					<div className="absolute right-4 top-4 flex gap-[2px]">
						{currentUserId === user._id ? (
							<>
								<Button className="primary medium rounded-md rounded-r-sm">
									<i className="fa-solid fa-square-plus"></i>
								</Button>
								<Button
									className="primary medium rounded-md rounded-l-sm"
									onClick={() =>
										navigate(`profile/${user._id}`)
									}
								>
									<i className="fa-solid fa-edit"></i>
								</Button>
							</>
						) : (
							<>
								<Follow followId={user._id} />

								<Button
									className="primary medium rounded-md rounded-l-sm"
									onClick={() => navigate(`chat/${user._id}`)}
								>
									<i className="fa-solid fa-message-lines"></i>
								</Button>
							</>
						)}
					</div>
				</div>
			)}
			{loading && <LoadingOverlay />}
		</div>
	);
};

export default AccountPreview;
