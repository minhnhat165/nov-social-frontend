import React, { createContext, useContext, useState } from 'react';

import { EllipsisHorizontalIcon } from 'components/Icon';
import { IconButton } from 'components/Action';
import { IconWrapper } from 'components/DataDisplay';
import { Popover } from 'components/OverLay';
import PropTypes from 'prop-types';
import { Text } from 'components/Typography';
import clsx from 'clsx';

const MenuContext = createContext({
	popoverRef: null,
	setPopoverRef: () => {},
	triggerRef: null,
	setTriggerRef: () => {},
});

const useMenu = () => useContext(MenuContext);
const Menu = ({ children }) => {
	const [popoverRef, setPopoverRef] = useState(null);
	const [triggerRef, setTriggerRef] = useState(null);
	return (
		<MenuContext.Provider
			value={{
				popoverRef,
				setPopoverRef,
				triggerRef,
				setTriggerRef,
			}}
		>
			{children}
		</MenuContext.Provider>
	);
};

const Item = ({ icon, children, ...props }) => {
	return (
		<div
			{...props}
			className="flex h-10 cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-dark-800"
		>
			{icon && (
				<Text className="shrink-0">
					<IconWrapper size={5}>{icon}</IconWrapper>
				</Text>
			)}
			<Text>{children}</Text>
		</div>
	);
};

Menu.Item = Item;

const Trigger = ({ children, ...props }) => {
	const { popoverRef, setTriggerRef } = useMenu();
	return (
		<div ref={setTriggerRef} className="ml-auto">
			<IconButton
				onClick={() => {
					popoverRef?.toggle();
				}}
				rounded
				color={'secondary'}
				variant="text"
				{...props}
			>
				{children ? children : <EllipsisHorizontalIcon />}
			</IconButton>
		</div>
	);
};

Menu.Trigger = Trigger;

const Content = ({ children, className, ...props }) => {
	const { setPopoverRef, triggerRef } = useMenu();
	return (
		<Popover
			{...props}
			ref={setPopoverRef}
			reference={triggerRef}
			placement="bottom-end"
			hideOnClick
			offset={[5, 5]}
			render={
				<Popover.Content
					level={0}
					className={clsx(
						'flex flex-col gap-1 drop-shadow-[0_0_6px_rgba(0,0,0,0.2)] dark:shadow-2xl',
						className,
					)}
				>
					<Popover.Arrow />
					{children}
				</Popover.Content>
			}
		/>
	);
};

Menu.Content = Content;

Menu.propTypes = {
	children: PropTypes.node,
};

export default Menu;
