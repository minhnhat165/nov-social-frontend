const PostMenu = ({ menuItems }) => {
	return (
		<div className="w-56 p-2">
			{menuItems.map((item) => (
				<div
					key={item.title}
					onClick={item.action}
					className="group flex cursor-pointer items-center rounded-xl py-3 transition-all hover:dark:bg-dark-very-light"
				>
					<div className="dark:group-hover:text-primary flex h-4 w-10 items-center justify-center text-base dark:text-dark-text-regular">
						{item.icon}
					</div>
					<div className="flex flex-col">
						<span className="text-sm dark:text-dark-text-bold ">
							{item.title}
						</span>
						<span className="text-[12px] leading-3 dark:text-dark-text-light">
							{item.description}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default PostMenu;
