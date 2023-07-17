import {
	Outlet,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';

import { Button } from 'components/Action';
import { Card } from 'components/DataDisplay';
import Head from 'components/Head';
import { Search } from 'components/DataEntry';
import StickyBox from 'react-sticky-box';
import { Text } from 'components/Typography';
import { genQueryParams } from 'utils/genQueryParams';
import { useScreenMode } from 'hooks/useScreenMode';

const SearchLayout = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('q');
	const { isMobile } = useScreenMode();
	return (
		<>
			<Head title={query ? `Search: ${query}` : 'Search'} />
			<div className="flex h-full w-full flex-col items-start sm:flex-row">
				{isMobile ? (
					<div className="fixed z-10 -mt-1 w-full">
						<SearchFilter />
					</div>
				) : (
					<StickyBox className="h-screen py-2">
						<SearchFilter />
					</StickyBox>
				)}
				<div className="mx-auto flex-1 pb-2 pt-[112px] sm:max-w-[590px] sm:pt-2">
					<Outlet context={{ query }} />
				</div>
			</div>
		</>
	);
};

export default SearchLayout;

function SearchFilter() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('q');
	const location = useLocation();
	const tab = location.pathname.split('/')[2];
	const navigate = useNavigate();
	const handleNavigate = (tab) => {
		const paramsString = genQueryParams({ q: query });
		navigate(`/search${tab}?${paramsString}`);
	};
	return (
		<Card responsive className="w-full sm:w-80 sm:rounded-lg">
			<Card.Header className="pt-4">
				<Search
					onSearch={(query) => {
						const paramsString = genQueryParams({
							q: query,
						});
						navigate(
							`/search${tab ? `/${tab}` : ''}?${paramsString}`,
						);
					}}
					defaultValue={query}
				/>
			</Card.Header>
			<Card.Body className="py-2">
				<Button.Group fullWidth rounded color="secondary">
					<Button
						onClick={() => {
							handleNavigate('');
						}}
					>
						<Text primary={!tab || tab === 'all'}>All</Text>
					</Button>
					<Button
						onClick={() => {
							handleNavigate('/people');
						}}
					>
						<Text primary={tab === 'people'}>People</Text>
					</Button>
					<Button
						onClick={() => {
							handleNavigate('/post');
						}}
					>
						<Text primary={tab === 'post'}>Post</Text>
					</Button>
				</Button.Group>
			</Card.Body>
		</Card>
	);
}
