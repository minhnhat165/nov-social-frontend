import { CubeTransparentIcon } from 'components/Icon';
import IconWrapper from 'components/Icon/IconWrapper';
import SearchMain from 'features/search/components/SearchMain';
import { Link } from 'react-router-dom';
import { routePaths } from 'routes/routeConfig';

const HeaderLeft = () => {
	return (
		<div className="flex h-14 w-80 items-center rounded-xl bg-slate-50 shadow dark:bg-dark-800 desktop:w-96">
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
			<div className="flex-1 pl-2">
				<SearchMain />
			</div>
		</div>
	);
};

export default HeaderLeft;
