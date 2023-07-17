import { Route, Routes } from 'react-router-dom';

import MainLayout from 'components/Layout/MainLayout';
import { Text } from 'components/Typography';
import { lazy } from 'react';

const AuthRoutes = lazy(() => import('features/auth/routes'));
const ComponentsPage = lazy(() => import('pages/Lab'));
const NotFoundPage = lazy(() => import('pages/not-found'));
const TextPage = lazy(() => import('pages/text'));
const AppRoute = () => {
	return (
		<Routes>
			<Route path="/auth/*" element={<AuthRoutes />} />
			<Route path="/intro" element={<TextPage />} />
			<Route path="/*" element={<MainLayout />} />
			<Route path="/lab" element={<ComponentsPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export const ComingSoon = () => {
	return (
		<div className="flex h-[calc(100vh_-_6rem)] flex-col  items-center justify-center sm:h-screen">
			<Text primary className="text-4xl font-bold">
				Coming Soon
			</Text>
			<Text>This page is under construction</Text>
		</div>
	);
};

export default AppRoute;
