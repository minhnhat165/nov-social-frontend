import { Outlet } from 'react-router-dom';

const Post = () => {
	return (
		<div className="scrollAble h-full pt-4">
			<Outlet />
		</div>
	);
};
export default Post;
