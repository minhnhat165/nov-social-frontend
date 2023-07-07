import { Sidebar, SidebarMobile } from 'components/Navigation';

import { Outlet } from 'react-router-dom';
import { SCREEN_MODE } from 'constants/app';
import StickyBox from 'react-sticky-box';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const MainLayout = () => {
	const screenMode = useSelector((state) => state.app.screenMode);
	const isMobile = screenMode === SCREEN_MODE.MOBILE.name;
	return (
		<div className="mx-auto flex h-full w-full items-start">
			{isMobile ? (
				<SidebarMobile />
			) : (
				<StickyBox>
					<Sidebar />
				</StickyBox>
			)}

			<div className={clsx('flex-1', isMobile ? 'pt-24' : 'pl-2')}>
				<Outlet />
			</div>
		</div>
	);
};

MainLayout.propTypes = {};

export default MainLayout;
