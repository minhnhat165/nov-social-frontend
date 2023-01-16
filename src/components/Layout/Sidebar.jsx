import ActionList from './ActionList';
import Layer from './Layer';
import Navbar from './Navbar';
import UserActionBar from './UserActionBar';

const Sidebar = () => {
	return (
		<Layer className="flex h-full w-14 flex-col rounded-xl shadow-3xl">
			<div className="mt-2">
				<Navbar />
			</div>
			<Line />
			<ActionList />
			<Line />
			<div className="mt-auto">
				<UserActionBar />
			</div>
		</Layer>
	);
};

const Line = () => {
	return <hr className="mx-2 dark:border-dark-700" />;
};

export default Sidebar;
