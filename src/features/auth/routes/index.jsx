import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
const AccountActivation = lazy(() => import('../pages/AccountActivation'));
const Auth = lazy(() => import('../pages/Auth'));

const AuthRoutes = () => {
	const isLogin = useSelector((state) => state.auth.isLogin);
	return (
		<>
			{isLogin ? (
				<Navigate to="/" />
			) : (
				<Routes>
					<Route element={<Auth />}>
						<Route path="login" element={<></>} />
						<Route path="register" element={<></>} />
					</Route>
					<Route
						path="activation/:key"
						element={<AccountActivation />}
					/>
					{/* <Route path="social-login" element={<Social></Social>} /> */}
					<Route path="*" element={<h1>404 Not Found</h1>} />
				</Routes>
			)}
		</>
	);
};

// const Social = () => {
// 	useEffect(() => {
// 		const url = new URL(window.location);
// 		if (window.opener) {
// 			window.opener.postMessage(url.searchParams.get('token'));
// 			window.close();
// 		} else {
// 			alert('No opener');
// 		}
// 	}, []);
// 	return <div></div>;
// };

export default AuthRoutes;
