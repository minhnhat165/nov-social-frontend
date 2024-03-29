import { Button } from 'components/Action';
import { UserIcon } from 'components/Icon';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center dark:bg-dark-light">
			<div className="flex max-w-[480px] flex-col items-center gap-4 rounded-xl p-4 dark:bg-dark-semiBold">
				<div>
					<UserIcon />
				</div>
				<div className="flex flex-col items-center">
					<span className="text-xl font-bold dark:text-dark-text-bold">
						This content isn't available at the moment
					</span>
					<span className="text-center text-base dark:text-dark-text-regular">
						When this happens, it's usually because the owner only
						shared it with a small group of people or changed who
						can see it, or it's been deleted.
					</span>
				</div>

				<div className="flex flex-col gap-4">
					<Button size="lg" onClick={() => navigate('/')}>
						<span className="font-bold"> Go to News Feed</span>
					</Button>
					<Button
						variant="text"
						size="lg"
						onClick={() => navigate(-1)}
					>
						<span className="font-bold"> Go back</span>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
