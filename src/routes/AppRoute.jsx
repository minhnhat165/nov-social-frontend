import MainLayout from 'components/Layout/MainLayout';
import Home from 'features/home/pages/Home';
import Components from 'pages/Components';
import NotFound from 'pages/NotFound';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
const AuthRoutes = lazy(() => import('features/auth/routes'));

const AppRoute = () => {
	const isLogin = useSelector((state) => state.auth.isLogin);
	return (
		<Suspense>
			<Routes>
				<Route path="/auth/*" element={<AuthRoutes />}></Route>
				<Route path="/" element={<MainLayout />}>
					<Route element={<PrivateRoute isLogin={isLogin} />}>
						<Route path="/" element={<Home />} />
						<Route path="/post" element={<h1>Home</h1>} />
						<Route path="/chat" element={<h1>Home</h1>} />
						<Route path="/videos" element={<h1>Home</h1>} />
						<Route path="/friends" element={<h1>Home</h1>} />
						<Route path="/profile" element={<h1>Home</h1>} />
						<Route path="/games" element={<h1>Home</h1>} />
					</Route>
					<Route path="/lab" element={<Components />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
};

export default AppRoute;
