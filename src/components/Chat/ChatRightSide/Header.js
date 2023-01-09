import Avatar from '../../Avatar';

const Header = ({ conversation }) => {
	return (
		<div className="flex flex-col items-center gap-2 border-b pb-3 dark:border-dark-border">
			<Avatar url={conversation.avatar} size="h-32 w-32" />

			<div
				className={`relative flex w-full items-center justify-center gap-2 p-1`}
			>
				<div className="flex flex-col items-center">
					<span className="text-center text-lg dark:text-dark-text-bold">
						{conversation.name}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
