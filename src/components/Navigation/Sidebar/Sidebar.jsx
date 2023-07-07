import EndSidebar from './EndSidebar';
import Layer from 'components/Layout/Layer';
import MiddleSidebar from './MiddleSidebar';
import StartSidebar from './StartSidebar';
import { TopSidebar } from './TopSidebar';

export const Sidebar = () => {
	return (
		<Layer className="scrollbar-hoverAble overflow-y-overlay left-0 top-0 flex h-screen flex-col rounded-none  py-2 shadow-3xl">
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
