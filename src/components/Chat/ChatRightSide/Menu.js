import { AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import AnimateSlide from '../../Animate/AnimateSlide';
import CustomizeChat from './CustomizeChat';
import GroupMembers from './GroupMembers';
import PrivacySettings from './PrivacySettings';
import SubMenu from './SubMenu';

const Menu = ({ conversation }) => {
	const [currentSelection, setCurrentSelection] = useState(null);
	const [showSubMenu, setShowSubMenu] = useState(false);

	useEffect(() => {
		return () => {
			setShowSubMenu(false);
			setCurrentSelection(null);
		};
	}, [conversation._id]);
	const menuItems = useMemo(() => {
		const menuItems = [
			{
				title: 'Customize chat',
				icon: <i className="fa-duotone fa-pen-to-square"></i>,
				action: () => {},
				subMenu: <CustomizeChat />,
			},
			{
				title: 'Images',
				icon: <i className="fa-duotone fa-image"></i>,
				action: () => {},
			},
		];
		if (conversation.isGroupChat) {
			menuItems.push({
				title: 'Member',
				icon: <i className="fa-duotone fa-users-line"></i>,
				subMenu: <GroupMembers />,
			});
		}
		menuItems.push({
			title: 'Privacy settings',
			icon: <i className="fa-duotone fa-gear"></i>,
			action: () => {},
			subMenu: <PrivacySettings />,
		});
		return menuItems;
	}, [conversation]);

	const handleClickMenuItem = (item) => {
		setCurrentSelection(item);
		if (item.action) {
			item.action();
		}
		if (item?.subMenu) setShowSubMenu(true);
	};

	return (
		<div className="-mx-2 flex flex-1 flex-col items-center pt-4 dark:bg-dark-semiBold">
			<AnimatePresence>
				<div className="h-full w-full">
					{showSubMenu && (
						<AnimateSlide>
							<SubMenu setShow={setShowSubMenu} content={currentSelection} />
						</AnimateSlide>
					)}

					{!showSubMenu && (
						<AnimateSlide>
							<div>
								{menuItems.map((item) => (
									<div
										key={item.title}
										onClick={() => handleClickMenuItem(item)}
										className="group flex w-full cursor-pointer items-center gap-1 rounded-xl p-2 py-4 transition-all  dark:hover:bg-dark-light dark:active:bg-blue-500"
									>
										<div className="flex w-8 items-center justify-center text-xl leading-[0] dark:text-dark-text-bold">
											{item.icon}
										</div>
										<span className="dark:text-dark-text-regular dark:group-hover:text-dark-text-bold">
											{item.title}
										</span>
									</div>
								))}
							</div>
						</AnimateSlide>
					)}
				</div>
			</AnimatePresence>
		</div>
	);
};

export default Menu;
