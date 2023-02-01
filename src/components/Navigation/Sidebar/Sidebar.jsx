import Layer from 'components/Layout/Layer';
import EndSidebar from './EndSidebar';
import MiddleSidebar from './MiddleSidebar';
import StartSidebar from './StartSidebar';
const Sidebar = () => {
	return (
		<Layer className="flex h-full w-14 flex-col rounded-xl shadow-3xl">
			<StartSidebar />
			<Line />
			<MiddleSidebar />
			<Line />
			<EndSidebar />
		</Layer>
	);
};

const Line = () => {
	return <hr className="mx-2 dark:border-dark-700" />;
};

export default Sidebar;
