import { Route, Routes } from 'react-router-dom';
import { Sidebar, SidebarMobile } from 'components/Navigation';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ComingSoon } from 'routes/AppRoute';
import { IconWrapper } from 'components/DataDisplay';
import NotFoundPage from 'pages/not-found/NotFound';
import PrivateRoute from 'routes/PrivateRoute';
import StickyBox from 'react-sticky-box';
import { XMarkIcon } from 'components/Icon';
import clsx from 'clsx';
import { setIsStarted } from 'store/slices/serverSlice';
import { useScreenMode } from 'hooks/useScreenMode';

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
	const dispatch = useDispatch();
	const isLogin = useSelector((state) => state.auth.isLogin);
	const isServerStarted = useSelector((state) => state.server.isStarted);

	const [isShowServerWarning, setIsShowServerWarning] = useState(
		!isServerStarted,
	);

	useEffect(() => {
		setIsShowServerWarning(!isServerStarted);
	}, [isServerStarted]);

	return (
		<div className="mx-auto flex h-full w-full items-start">
			{isMobile ? (
				<SidebarMobile />
			) : (
				<StickyBox>
					<Sidebar />
				</StickyBox>
			)}

			{isShowServerWarning && (
				<div className="fixed left-1/2 top-2 z-[999] flex -translate-x-1/2 justify-between rounded bg-primary-600 p-2 text-white">
					<span>
						Due to the limited of my backend server, the request to
						the server will be slow. Please wait for a while to see
						the result. Thank you!
					</span>
					<IconWrapper
						onClick={() => {
							// setIsShowServerWarning(false);
							dispatch(setIsStarted(true));
						}}
						className="cursor-pointer hover:opacity-60"
					>
						<XMarkIcon />
					</IconWrapper>
				</div>
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
						<Route
							path="/talk/*"
							element={
								<iframe
									title="talk"
									className="h-screen w-full"
									src="https://novtalk.vercel.app/remote?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2"
								></iframe>
							}
						/>
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Suspense>
			</div>
		</div>
	);
};

MainLayout.propTypes = {};

export default MainLayout;
