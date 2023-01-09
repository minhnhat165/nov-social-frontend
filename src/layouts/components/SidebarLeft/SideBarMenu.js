import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/ButtonOld';

const SideBarMenu = () => {
	const user = useSelector((state) => state.auth.user);
	return (
		<div className="h-full px-3 pb-4">
			<div className="flex h-full w-16 flex-col items-center rounded-xl bg-dark-semiBold">
				<div className="border-b border-primary py-2">
					<div className="rounded-xl p-2 dark:bg-dark-very-light">
						<Avatar url={user.avatar} />
					</div>
				</div>
				<div className="mt-2 flex flex-col gap-4">
					<Button circle shadow>
						<i className="fa-solid fa-plus-large text-primary"></i>
					</Button>
					<Link to="/chat">
						<Button circle shadow>
							<i className="fa-solid fa-message-lines text-primary"></i>
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SideBarMenu;
