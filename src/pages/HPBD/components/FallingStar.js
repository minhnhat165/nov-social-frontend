import { memo } from 'react';
const FallingStar = () => {
	return (
		<div
			className={
				'absolute left-1/2 top-10 h-[667px] w-[375px] -translate-x-1/2 -translate-y-1/2 rotate-45 scale-50'
			}
		>
			<div className={`animation falling  star top-[300px] left-[150px]`}></div>
			<div className={`animation falling  star top-[505px] left-[250px]`}></div>
			<div className={`animation falling  star top-[400px] left-[325px]`}></div>
			<div className={`animation falling  star top-[605px] left-[25px]`}></div>
			<div className={`animation falling  star top-[500px] left-[70px]`}></div>
			<div className={`animation falling  star top-[400px] left-[55px]`}></div>
		</div>
	);
};

export default memo(FallingStar);
