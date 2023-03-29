import { CubeTransparentIcon, SearchIcon } from 'components/Icon';

import { IconButton } from 'components/Action';
import { IconWrapper } from 'components/DataDisplay';
import { Link } from 'react-router-dom';
import { routePaths } from 'routes/routeConfig';

const HeaderLeft = () => {
	return (
		<div className="flex flex-col items-center rounded-xl bg-slate-50 shadow dark:bg-dark-800">
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
			<IconButton>
				<IconWrapper>
					<SearchIcon />
				</IconWrapper>
			</IconButton>
		</div>
	);
};

/* <div className="relative h-10 flex-1 pl-2">
				<div className="absolute top-0 right-2 w-full pl-2 transition-all focus-within:right-0">
					<SearchMain />
				</div>
			</div> */

export default HeaderLeft;
