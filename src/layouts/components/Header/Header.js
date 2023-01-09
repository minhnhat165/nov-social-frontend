import Logo from '../../../assets/icons/Logo';
import Search from '../../../components/Search';
import Navbar from '../Navbar';
import RightAction from './RightAction';

const Header = () => {
	return (
		<div
			className="fixed top-0 z-[98] flex h-20 w-full
      items-center px-6 
    dark:bg-dark-bold"
		>
			<div className="flex w-1/3 items-center">
				<div className="mr-3 border-r border-primary/30 transition-all hover:border-primary/60">
					<div className="mr-4">
						<Logo />
					</div>
				</div>
				<div className="w-80">
					<Search />
				</div>
			</div>
			<div className="flex w-1/3 justify-center">
				<Navbar />
			</div>
			<div className="flex w-1/3 justify-end">
				<RightAction />
			</div>
		</div>
	);
};

export default Header;
