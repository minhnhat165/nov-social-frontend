import { CubeTransparentIcon, SearchIcon } from 'components/Icon';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import { IconButton } from 'components/Action';
import { IconWrapper } from 'components/DataDisplay';
import Layer from 'components/Layout/Layer';
import { Popover } from 'components/OverLay';
import SearchMain from 'features/search/components/SearchMain';
import clsx from 'clsx';
import { routePaths } from 'routes/routeConfig';
import { setReload } from 'store/slices/appSlice';

export function TopSidebar() {
	return (
		<Layer
			level={0}
			className="mx-1 mb-2 flex w-14 flex-col items-center justify-center gap-2 rounded-lg rounded-b-lg  py-2"
		>
			<LogoAction>
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-primary-400 to-primary-900 font-bold text-slate-100">
					<IconWrapper>
						<CubeTransparentIcon strokeWidth={3} />
					</IconWrapper>
				</div>
			</LogoAction>
			<Search />
		</Layer>
	);
}

export const LogoAction = ({ children }) => {
	const { pathname } = useLocation();
	const isReload = useSelector((state) => state.app.isReload);
	const dispatch = useDispatch();
	const handleReload = (e) => {
		if (pathname !== routePaths.HOME && !isReload) return;
		e.preventDefault();
		dispatch(setReload(true));
	};
	return (
		<Link to={routePaths.HOME} onClick={handleReload}>
			{children}
		</Link>
	);
};

export function Search() {
	const popoverRef = useRef(null);
	const searchRef = useRef(null);
	const [isFocused, setIsFocused] = useState(false);
	useEffect(() => {
		const handleKeyDown = (e) => {
			if ((e.ctrlKey && e.key === 'k') || (e.ctrlKey && e.key === 'K')) {
				e.preventDefault();
				popoverRef.current.toggle();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);
	return (
		<Popover
			ref={popoverRef}
			placement={'right-start'}
			hideOnClickOutside={!isFocused}
			onHide={() => {
				setIsFocused(false);
				searchRef?.current.blur();
			}}
			offset={[-54, 28]}
			onShow={() => {
				setIsFocused(true);
				if (searchRef?.current) searchRef?.current.focus();
			}}
			render={
				<Popover.Content
					level={1}
					className={clsx(
						'h-[104px] w-80 !rounded-lg p-2 shadow-3xl transition-all ',
						isFocused ? 'px-0 pt-0' : '',
					)}
				>
					<Popover.Arrow />
					<SearchMain
						onFocus={() => {
							setIsFocused(true);
						}}
						onBlur={() => {
							setIsFocused(false);
						}}
						ref={searchRef}
						placeholder="Search for Nov"
						onNavigate={() => {
							popoverRef.current.hide();
						}}
					/>
				</Popover.Content>
			}
		>
			{({ visible }) => (
				<IconButton
					color={'secondary'}
					rounded
					variant={visible ? 'filled' : 'text'}
				>
					<IconWrapper>
						<SearchIcon
							className={
								visible
									? 'text-primary-700 dark:text-primary-500'
									: ''
							}
						/>
					</IconWrapper>
				</IconButton>
			)}
		</Popover>
	);
}
