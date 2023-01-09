import React, { useState } from 'react';
import Header from './components/Header';
import SideBarMenu from './components/SidebarLeft/SideBarMenu';

const HeaderOnly = ({ children }) => {
	const [showMenu, setShowMenu] = useState(false);
	return (
		<>
			{/* <Header /> */}
			<div className="h-full w-full">
				<section className="relative mt-20 h-[calc(100%_-_80px)] w-full flex-1">
					{children}
				</section>
				<div
					className={`fixed top-0 left-0 z-[9999999] mt-24 h-[calc(100%_-_96px)] transition-all ${
						showMenu ? 'translate-x-0' : '-translate-x-full'
					} `}
				>
					<SideBarMenu />
					<div
						onClick={() => setShowMenu(!showMenu)}
						className={`absolute top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-primary-bold transition-all ${
							showMenu
								? 'right-3 translate-x-1/2'
								: 'right-0 translate-x-1/2 opacity-50 hover:opacity-100'
						}`}
					></div>
				</div>
			</div>
		</>
	);
};

export default HeaderOnly;
