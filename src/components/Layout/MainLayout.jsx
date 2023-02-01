import Sidebar from 'components/Navigation/Sidebar';
import { Outlet } from 'react-router-dom';
import HeaderLeft from './HeaderLeft';

const MainLayout = () => {
	return (
		<div className="mx-auto h-screen w-full overflow-hidden">
			<div className="pl-[72px]">
				<Outlet />
			</div>
			<div className="fixed left-2 top-0 h-screen pt-20 pb-2">
				<Sidebar />
			</div>
			<div className="fixed left-2 top-2">
				<HeaderLeft />
			</div>
		</div>
	);
};

MainLayout.propTypes = {};

export default MainLayout;
