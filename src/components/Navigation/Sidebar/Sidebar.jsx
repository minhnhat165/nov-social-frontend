import EndSidebar from './EndSidebar';
import Layer from 'components/Layout/Layer';
import MiddleSidebar from './MiddleSidebar';
import StartSidebar from './StartSidebar';
import { TopSidebar } from './TopSidebar';

export const Sidebar = () => {
	return (
		<Layer className="scrollbar-hover overflow-y-overlay flex h-full flex-col rounded-none  py-2 shadow-3xl">
			<TopSidebar />
			<Line />
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
