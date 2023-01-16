import SettingBar from 'components/SettingBar';
import SearchBar from 'features/search/components/SearchBar';

import { Outlet } from 'react-router-dom';
import HeaderLeft from './HeaderLeft';
import Sidebar from './Sidebar';

const MainLayout = () => {
	return (
		<div>
			<div className="fixed left-2 top-2">
				<HeaderLeft />
			</div>
			<div className="fixed left-2 top-0 h-screen pt-20 pb-2">
				<Sidebar />
			</div>
			<div className="fixed right-0 p-2">
				<SettingBar />
			</div>
			<Outlet />
		</div>
	);
};

MainLayout.propTypes = {};

export default MainLayout;
