import { Route, Routes } from 'react-router-dom';
import { Sidebar, SidebarMobile } from 'components/Navigation';
import { Suspense, lazy } from 'react';

import { ComingSoon } from 'routes/AppRoute';
import NotFoundPage from 'pages/not-found/NotFound';
import PrivateRoute from 'routes/PrivateRoute';
import StickyBox from 'react-sticky-box';
import clsx from 'clsx';
import { useScreenMode } from 'hooks/useScreenMode';
import { useSelector } from 'react-redux';

const BookmarkPage = lazy(() => import('features/bookmark/pages'));
const GamePage = lazy(() => import('pages/game'));
const HomePage = lazy(() => import('pages/home/pages/Home'));
const NotificationPage = lazy(() => import('features/notification/pages'));
const PeoplePage = lazy(() => import('pages/people/PeoplePage'));
const ProfileRoute = lazy(() => import('pages/profile/route'));
const SearchRoute = lazy(() => import('pages/search/route'));
const PostRoute = lazy(() => import('pages/post/Route'));

const MainLayout = () => {
	const { isMobile } = useScreenMode();
	const isLogin = useSelector((state) => state.auth.isLogin);

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
				<Suspense>
					<Routes>
						<Route element={<PrivateRoute isLogin={isLogin} />}>
							<Route path="/" element={<HomePage />} />
							<Route path="/chat" element={<ComingSoon />} />
							<Route path="/videos" element={<ComingSoon />} />
							<Route
								path="/bookmark"
								element={<BookmarkPage />}
							/>
							<Route path="/search/*" element={<SearchRoute />} />
							<Route
								path="/notifications"
								element={<NotificationPage />}
							/>
							<Route path="/people" element={<PeoplePage />} />
							<Route path="/games" element={<GamePage />} />
						</Route>
						<Route path="/post/*" element={<PostRoute />} />
						<Route path="/profile/*" element={<ProfileRoute />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Suspense>
			</div>
		</div>
	);
};

MainLayout.propTypes = {};

export default MainLayout;
