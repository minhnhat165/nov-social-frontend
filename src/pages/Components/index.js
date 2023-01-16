import Popover from 'components/Popover/Popover';
const Components = () => {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<Popover content={<div className="h-96 w-96 bg-white"></div>}>
				<div className="h-10 w-10 animate-drop bg-black"></div>
			</Popover>
		</div>
	);
};

export default Components;
