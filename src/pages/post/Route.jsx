import { Route, Routes } from 'react-router-dom';

import { Main } from './pages';

const PostRoute = () => {
	return (
		<Routes>
			<Route path="/:id" element={<Main />}></Route>
		</Routes>
	);
};

export default PostRoute;
