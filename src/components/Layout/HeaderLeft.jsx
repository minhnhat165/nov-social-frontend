import { CubeTransparentIcon } from 'components/Icon';
import { IconWrapper } from 'components/DataDisplay';
import { Link } from 'react-router-dom';
import SearchMain from 'features/search/components/SearchMain';
import { routePaths } from 'routes/routeConfig';

const HeaderLeft = () => {
	return (
		<div className="flex h-14 w-80 items-center rounded-xl bg-slate-50 shadow dark:bg-dark-800 desktop:w-[390px]">
			<div className="flex h-14 w-14 items-center justify-center">
				<Link
					to={routePaths.HOME}
					className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-primary-400 to-primary-900 font-bold text-slate-100"
				>
					<IconWrapper>
						<CubeTransparentIcon strokeWidth={3} />
					</IconWrapper>
				</Link>
			</div>
			<div className="relative h-10 flex-1 pl-2">
				<div className="absolute top-0 right-2 w-full pl-2 transition-all focus-within:right-0">
					<SearchMain />
				</div>
			</div>
		</div>
	);
};

export default HeaderLeft;
