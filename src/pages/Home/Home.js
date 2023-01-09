import ReactStickyBox from 'react-sticky-box';
import Main from './components/Main';
import SideLeft from './components/SideLeft';
import SideRight from './components/SideRight';

const HomePage = () => {
	return (
		<div className="dark:bg-dark-light">
			<div className={`flex h-full w-full items-start justify-center pt-4`}>
				<ReactStickyBox offsetTop={96} className="h-full">
					<SideLeft />
				</ReactStickyBox>
				<section className="relative basis-[700px] px-4">
					<Main />
				</section>
				<ReactStickyBox
					offsetTop={96}
					offsetBottom={16}
					className="mr-4 h-full"
				>
					<SideRight />
				</ReactStickyBox>
			</div>
		</div>
	);
};

export default HomePage;
