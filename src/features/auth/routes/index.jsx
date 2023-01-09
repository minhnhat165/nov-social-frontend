import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
const AccountActivation = lazy(() => import('../pages/AccountActivation'));
const Auth = lazy(() => import('../pages/Auth'));

const AuthRoutes = () => {
	return (
		<Routes>
			<Route element={<Auth />}>
				<Route path="login" element={<></>} />
				<Route path="register" element={<></>} />
			</Route>
			<Route path="activation/:key" element={<AccountActivation />} />
			<Route path="*" element={<h1>404 Not Found</h1>} />
		</Routes>
	);
};

export default AuthRoutes;
