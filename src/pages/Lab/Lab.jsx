import './lab.css';

const Components = () => {
	return (
		<div className="relative flex h-screen w-screen flex-col items-center justify-center">
			<div className="relative">
				<div className="absolute left-0 top-0 z-10 h-10 w-10 bg-blue-500"></div>
				<div className="relative h-10 w-10 bg-white"></div>
				<div className="h-10 w-10 bg-pink-400"></div>
			</div>
		</div>
	);
};

export default Components;
