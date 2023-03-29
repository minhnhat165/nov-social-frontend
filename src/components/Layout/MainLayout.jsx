import { Outlet } from 'react-router-dom';
import { Sidebar } from 'components/Navigation';

const MainLayout = () => {
	return (
		<div className="mx-auto flex h-screen w-full overflow-hidden">
			<div className="h-screen">
				<Sidebar />
			</div>
			<div className="flex-1 pl-2">
				<Outlet />
			</div>
		</div>
	);
};

MainLayout.propTypes = {};

export default MainLayout;
