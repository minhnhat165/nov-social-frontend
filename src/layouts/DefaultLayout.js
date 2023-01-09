import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import routes from '../configs/routes';
import HomePage from '../pages/Home';
import Header from './components/Header';

const DefaultLayout = () => {
	const { pathname } = useLocation();
	const [isHomeVisited, setIsHomeVisited] = useState(false);

	useEffect(() => {
		if (pathname === routes.home) setIsHomeVisited(true);
	}, [pathname]);

	return (
		<div className="pt-20">
			<Header />
			{isHomeVisited && (
				<div className="hiddens">
					<HomePage />
				</div>
			)}
			<Outlet />
		</div>
	);
};

export default DefaultLayout;
