import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Components from 'pages/Lab';
import Game from 'pages/game';
import Home from 'pages/home/pages/Home';
import MainLayout from 'components/Layout/MainLayout';
import NotFound from 'pages/not-found';
import NotificationPage from 'features/notification/pages';
import { PeoplePage } from 'pages/people';
import { PostRoute } from 'pages';
import PrivateRoute from './PrivateRoute';
import ProfileRoute from 'pages/profile/route';
import { Text } from 'components/Typography';
import { useSelector } from 'react-redux';

const AuthRoutes = lazy(() => import('features/auth/routes'));

const AppRoute = () => {
	const isLogin = useSelector((state) => state.auth.isLogin);
	return (
		<Suspense>
			<Routes>
				<Route path="/auth/*" element={<AuthRoutes />} />
				<Route path="/" element={<MainLayout />}>
					<Route element={<PrivateRoute isLogin={isLogin} />}>
						<Route path="/" element={<Home />} />
						<Route path="/chat" element={<ComingSoon />} />
						<Route path="/videos" element={<ComingSoon />} />
						<Route path="/bookmark" element={<ComingSoon />} />
						<Route path="/search" element={<ComingSoon />} />
						<Route
							path="/notifications"
							element={<NotificationPage />}
						/>
						<Route path="/people" element={<PeoplePage />} />
						<Route path="/games" element={<Game />} />
					</Route>
					<Route path="/post/*" element={<PostRoute />} />
					<Route path="/profile/*" element={<ProfileRoute />} />
					<Route path="/lab" element={<Components />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
};

const ComingSoon = () => {
	return (
		<div className="flex h-full flex-col items-center justify-center">
			<Text primary className="text-4xl font-bold">
				Coming Soon
			</Text>
			<Text>This page is under construction</Text>
		</div>
	);
};

export default AppRoute;
