import Avatar from '../../DataDisplay/Avatar';
import Button from '../../ButtonOld';

const Header = ({ conversation, onShowSideBar }) => {
	return (
		<div className="flex justify-between p-3 py-4 dark:bg-dark-semiBold">
			<div className="flex items-center gap-2">
				<Avatar size="w-10 h-10" url={conversation.avatar} />
				<div className="flex flex-col">
					<span className="dark:text-dark-text-bold">
						{conversation.name}
					</span>
					<div className="flex items-center gap-1">
						<div className="relative h-[12px] w-[12px] shrink-0 rounded-full bg-sky-500"></div>
						<span className="text-sm dark:text-dark-text-regular">
							Online
						</span>
					</div>
				</div>
			</div>
			<div className="flex gap-2">
				<Button circle shadow>
					<i className="fa-solid fa-phone text-primary"></i>
				</Button>
				<Button circle shadow onClick={() => onShowSideBar()}>
					<i className="fa-solid fa-sidebar-flip text-primary"></i>
				</Button>
			</div>
		</div>
	);
};

export default Header;
