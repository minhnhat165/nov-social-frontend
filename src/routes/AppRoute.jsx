import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Components from 'pages/Lab';
import Game from 'pages/game';
import Home from 'pages/home/pages/Home';
import MainLayout from 'components/Layout/MainLayout';
import NotFound from 'pages/NotFound';
import { PostRoute } from 'pages';
import PrivateRoute from './PrivateRoute';
import ProfileRoute from 'pages/Profile/route';
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
						<Route path="/chat" element={<h1>Home</h1>} />
						<Route path="/videos" element={<h1>Home</h1>} />
						<Route path="/friends" element={<h1>Home</h1>} />
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

export default AppRoute;
