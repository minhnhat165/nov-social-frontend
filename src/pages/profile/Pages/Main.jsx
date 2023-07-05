import Button from '../../../components/ButtonOld';
import PostContainer from '../components/Main/PostContainer';
import PostListContextProvider from '../../../contexts/PostListContext';
import React from 'react';
import SideBar from '../components/Main/SideBar';
import { useParams } from 'react-router-dom';

const Main = () => {
	const { id } = useParams();

	return (
		<div className="mt-4 flex h-full w-full gap-8">
			<div className="relative w-1/3">
				<SideBar />
			</div>
			<div className="flex flex-1 flex-col gap-4">
				<div className="dark:bg-dark-regulars relative flex w-full items-center justify-center rounded-xl">
					<div className="bg-primary/50 absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2"></div>
					<span className="button circle border-primary/50 relative border bg-dark-very-light px-2 text-center text-xl font-light dark:text-dark-text-regular">
						<i className="fa-brands fa-ioxhost"></i>
					</span>
					<div className="absolute right-0 pl-2 dark:bg-dark-very-light">
						<Button
							medium
							className="text-primary dark:bg-dark-semiBold"
						>
							<i className="fa-solid fa-filter-list mr-2"></i>{' '}
							Filter
						</Button>
					</div>
				</div>
				<PostListContextProvider>
					<PostContainer userId={id} />
				</PostListContextProvider>
			</div>
		</div>
	);
};
export default Main;
