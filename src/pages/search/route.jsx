import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import MainSearchPage from './pages/Main';
import People from './pages/People';
import PostSearchPage from './pages/Post';

const SearchRoute = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<MainSearchPage />} />
				<Route path="people" element={<People />} />
				<Route path="post" element={<PostSearchPage />} />
			</Route>
		</Routes>
	);
};

export default SearchRoute;
