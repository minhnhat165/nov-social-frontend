import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import PostPage from './Pages/PostPage';
const ProfileRoute = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/:id" element={<PostPage />} />
				<Route path="/:id/about" element={<>about</>} />
				<Route path="/:id/friends" element={<>friends</>} />
				<Route path="/:id/photos" element={<>photos</>} />
			</Route>
		</Routes>
	);
};

export default ProfileRoute;
