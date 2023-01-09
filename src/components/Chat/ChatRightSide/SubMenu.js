import React from 'react';
import Button from '../../ButtonOld';

const SubMenu = ({ setShow, content }) => {
	return (
		<div className="flex h-full w-full flex-col overflow-hidden rounded-xl dark:bg-dark-regular">
			<div className="relative flex w-full cursor-pointer items-center gap-1 border-b border-dark-border p-2">
				<div className="absolute left-3">
					<Button
						circle
						className="hover-brightness bg-transparent dark:text-dark-text-regular"
						onClick={() => setShow(false)}
					>
						<i className="fa-solid fa-left"></i>
					</Button>
				</div>
				<div className="flex h-full flex-1 flex-col items-center justify-center">
					<div className="flex w-8 items-center justify-center text-xl leading-[0] text-primary-bold">
						{content.icon}
					</div>
					<span className="font-bold dark:text-dark-text-bold">
						{content.title}
					</span>
				</div>
			</div>
			<div className="mt-2 flex-1">{content?.subMenu}</div>
		</div>
	);
};

export default SubMenu;
