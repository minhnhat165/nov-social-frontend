import { Route, Routes } from 'react-router-dom';

import FollowPage from './pages/FollowPage';
import Layout from './components/Layout';
import PhotoPage from './pages/PhotoPage';
import PostPage from './pages/PostPage';

const ProfileRoute = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/:id" element={<PostPage />} />
				<Route path="/:id/about" element={<PhotoPage />} />
				<Route path="/:id/follow" element={<FollowPage />} />
				<Route path="/:id/photos" element={<PhotoPage />} />
			</Route>
		</Routes>
	);
};

export default ProfileRoute;
