import EndSidebar from './EndSidebar';
import Layer from 'components/Layout/Layer';
import MiddleSidebar from './MiddleSidebar';
import StartSidebar from './StartSidebar';

export const Sidebar = () => {
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
