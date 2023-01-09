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
				<Route element={<PrivateRoute isLogin={isLogin} />}>
					<Route path="/" element={<div>2</div>} />
					<Route path="/post" element={<h1>Home</h1>} />
				</Route>
				<Route path="*" element={<h1>404 Not Found</h1>} />
			</Routes>
		</Suspense>
	);
};

export default AppRoute;
