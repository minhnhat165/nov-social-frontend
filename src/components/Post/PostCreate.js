import { useDispatch, useSelector } from 'react-redux';

import Avatar from 'components/DataDisplay/Avatar';

const PostCreate = () => {
	const user = useSelector((state) => state.auth.user);

	return (
		<div className="w-full rounded-xl p-4 dark:bg-dark-regular">
			<div className="flex items-center gap-2">
				<Avatar src={user.avatar} />
				<div className="hover:dark:bg-primary/20 flex-1 cursor-pointer rounded-xl py-2 px-4 transition-all dark:bg-dark-light dark:text-dark-text-regular hover:dark:text-dark-text-bold">
					{' '}
					what's on your mind?
				</div>
				<div
					className="hover-brightness flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl dark:bg-dark-light dark:text-dark-text-regular"
					// onClick={() => handleOpenForm(formTypes.upload)}
				>
					{' '}
					<i className="fa-duotone fa-camera text-md"></i>
				</div>
				<div className="hover-brightness flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl dark:bg-dark-light dark:text-dark-text-regular">
					{' '}
					<i className="fa-duotone fa-face-smile-wink text-md"></i>
				</div>
			</div>

			{/* <Modal show={openForm} setShow={setOpenForm}>
				<PostForm formState={formState} onSubmit={handleCreatePost} />
			</Modal> */}
		</div>
	);
};

export default PostCreate;
