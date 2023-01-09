import { intervalToDuration } from 'date-fns';
import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import AnimationWrapper from '../../../components/Animate/AnimationWrapper';
import { clickAble } from '../../../components/Animate/variants';
import LottieCakeIcon from '../../../components/Icon/LottieCakeIcon';
import padTo2Digits from '../../../functions/padTo2Digits';
import clickSoundPath from '../../../assets/audios/click.wav';
const Clock = ({
	timeRemaining,
	handleCounter,
	isCompletedCount,
	isCompleted,
	setIsCompleted,
	end,
}) => {
	const clickSound = useMemo(() => {
		return new Audio(clickSoundPath);
	}, []);

	const children = ({ remainingTime }) => {
		const duration = intervalToDuration({
			start: 0,
			end: remainingTime * 1000,
		});

		const formatted = `${padTo2Digits(duration.hours)}:${padTo2Digits(
			duration.minutes
		)}:${padTo2Digits(duration.seconds)}`;
		return (
			<div className="flex w-full items-center justify-center">
				{isCompleted && !end ? (
					<AnimationWrapper animation={clickAble}>
						<div
							className="cursor-pointer"
							onClick={() => {
								handleCounter();
								clickSound.play();
							}}
						>
							<LottieCakeIcon />
						</div>
					</AnimationWrapper>
				) : (
					<div className="relative">
						<span
							style={{ textShadow: '1px 1px 2px #f78abf' }}
							className="text- text-4xl font-bold text-pink-400"
						>
							{formatted}
						</span>
						{duration.days >= 0 && (
							<div className="absolute left-1/2 mt-4 w-20 -translate-x-1/2 text-center text-pink-300">
								{duration?.months > 0 && <span>{duration.months} tháng</span>}
								<span> {duration.days} ngày</span>
							</div>
						)}
					</div>
				)}
			</div>
		);
	};
	return (
		<div className="relative flex flex-1 items-center justify-center">
			<div className="relative rounded-full bg-slate-50 p-2 shadow-2xl shadow-pink-300">
				{isCompletedCount && !end && (
					<div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2">
						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{
								scale: 2,
								opacity: 1,
								transition: {
									type: 'spring',
									stiffness: 260,
									damping: 20,
									default: { duration: 0.2 },
								},
							}}
							exit={{
								scale: 0,
								opacity: 0,
								transition: {
									type: 'spring',
									stiffness: 260,
									damping: 20,
									default: { duration: 0.5 },
								},
							}}
							className={`absolute z-0 h-full w-full rounded-full bg-pink-300`}
						></motion.div>
					</div>
				)}
				<CountdownCircleTimer
					size={240}
					isPlaying
					duration={timeRemaining}
					colors={['#f78abf', '#f794c3', '#f89fcb', '#f7aad2']}
					colorsTime={[timeRemaining, 5, 2, 0]}
					onComplete={() => setIsCompleted(true)}
					trailColor={'#dbeafe'}
				>
					{children}
				</CountdownCircleTimer>
			</div>
		</div>
	);
};

export default memo(Clock);
