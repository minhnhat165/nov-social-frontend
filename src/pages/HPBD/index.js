import { useCallback, useEffect, useMemo, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import LottieConfettiIcon from '../../components/Icon/LottieConfettiIcon';
import Clock from './components/Clock';
import DarkBackground from './components/DarkBackground';
import DialogBox from './components/DialogBox';
import GiftBox from './components/GiftBox';
import Music from './components/Music';
import PickWish from './components/PickWish';
import Button from '../../components/ButtonOld/ButtonV2';

const day = 6;
const month = 9;

const HPBD = () => {
	const [isCompleted, setIsCompleted] = useState(false);
	const [isDarkBackground, setIsDarkBackground] = useState(false);
	const [isCompletedCount, setIsCompletedCount] = useState(false);
	const [isShoot, setIsShoot] = useState(false);
	const [showGift, setShowGift] = useState(false);
	const [showCounter, setShowCounter] = useState(false);
	const [showPickWish, setShowPickWish] = useState(false);
	const [end, setEnd] = useState(false);
	const [year, setYear] = useState(2022);
	const [name, setName] = useState('Trần Thị Quỳnh Lê');
	const [counter, setCounter] = useState(0);
	const [step, setStep] = useState(0);
	const [blurText, setBlurText] = useState(false);

	useEffect(() => {
		const getIsAlreadyPlayed = async () => {
			const res = await axiosClient.get('notifies/check');
			if (res.data > 0) setYear(2023);
		};
		getIsAlreadyPlayed();
	}, []);

	useEffect(() => {
		if (end) {
			setYear(2023);
			setTimeout(() => {
				setBlurText(true);
			}, 8000);
		}
	}, [end]);

	const age = useMemo(() => {
		return 17;
	}, []);

	useEffect(() => {
		document.title = name;
	}, []);

	const timeRemaining = useMemo(() => {
		let seconds = (new Date(year, month, day) - new Date()) / 1000;
		if (seconds < 17) seconds = 17;
		return seconds;
	}, [year]);

	useEffect(() => {
		if (isCompleted) {
			setIsDarkBackground(true);
			setShowCounter(true);
			setStep(1);
		}
	}, [isCompleted]);

	const handleCounter = useCallback(() => {
		if (counter === age) return;
		setCounter((prev) => ++prev);
		if (counter === age - 1) {
			setTimeout(() => {
				setIsCompletedCount(true);
			}, 500);
		}
	}, [age, counter]);

	useEffect(() => {
		if (isCompletedCount) {
			setIsDarkBackground(false);
			setTimeout(() => {
				setIsShoot(true);
				setShowCounter(false);
				setTimeout(() => {
					setShowGift(true);
					setIsShoot(false);
					setTimeout(() => {
						setStep(2);
					}, 2000);
				}, 3000);
			}, 1000);
		}
	}, [isCompletedCount]);

	const handleFinishWish = (data) => {
		setShowGift(false);
		setShowPickWish(true);
		setStep(4);
		const text = data.map(
			(wish, index) => `Điều ${index + 1} ${wish.text}`
		);
		axiosClient.post('notifies/wish', {
			userId: '6329c13b1523cf5f1057b8b5',
			recipients: '6329f67645e7287091987d55',
			text: text.join('/'),
		});
	};

	return (
		<div className="flex h-full items-center justify-center ">
			<div
				className={`relative flex h-screen w-screen flex-col  items-center justify-evenly overflow-hidden bg-gradient-to-r from-pink-50 to-blue-50 transition-all sm:h-[677px] sm:w-[375px] sm:rounded-xl`}
			>
				{isDarkBackground && <DarkBackground />}
				<Clock
					end={end}
					handleCounter={handleCounter}
					setIsCompleted={setIsCompleted}
					timeRemaining={timeRemaining}
					isCompleted={isCompleted}
					isCompletedCount={isCompletedCount}
				/>
				<div
					className={`${
						isCompleted ? 'h-1/2' : ''
					} relative w-full transition-all`}
				>
					{isCompleted && (
						<div className="w-full px-4">
							<div className="flex w-full flex-col items-center gap-1">
								<span className="text-xl font-bold">
									<span className="text-pink-300">Happy</span>{' '}
									<span className="text-blue-300">
										birthday
									</span>
								</span>
								<div className="text-xl text-pink-300">
									<i className="fa-duotone fa-scale-balanced"></i>
								</div>
								<Button
									fullWidth
									onClick={() =>
										setName((prev) =>
											prev === 'Mai Quai'
												? 'Trần Thị Quỳnh Lê'
												: 'Mai Quai'
										)
									}
									color="bg-gradient-to-r from-blue-300 to-pink-300 text-white"
									className="rounded-xl"
								>
									{name}
								</Button>
							</div>
							<div className="relative flex h-40 w-full items-center justify-center ">
								{showCounter && (
									<div
										style={{
											textShadow: '1px 1px 2px #f78abf',
										}}
										className="bg-blue-50s flex h-14 w-14 items-center justify-center rounded-full text-3xl font-bold text-pink-500 shadow shadow-cyan-600"
									>
										{counter}
									</div>
								)}
								{showGift && (
									<GiftBox
										setStep={setStep}
										onSubmit={handleFinishWish}
										setShow={setShowGift}
									/>
								)}

								{showPickWish && (
									<PickWish
										setStep={setStep}
										setShow={setShowPickWish}
									/>
								)}

								{end && (
									<>
										<div
											className={`${
												blurText
													? 'text-pink-200'
													: 'text-pink-400'
											} text-center transition-all`}
										>
											<p className="text-blue-300">
												Hẹn gặp lại vào năm sau
											</p>
											Anh{' '}
											<span className="text-pink-500">
												&nbsp;I
											</span>
											T bật nhạc&nbsp;
											<span className="text-pink-500">
												lo
											</span>
											-fi&nbsp;
											<span className="text-pink-500">
												v
											</span>
											u vơ cho&nbsp;
											<span className="text-pink-500">
												e
											</span>
											m v
											<span className="text-pink-500">
												u
											</span>
											i{/* </Button> */}
										</div>
									</>
								)}
							</div>
						</div>
					)}
				</div>
				<div className="absolute left-0 bottom-0">
					{isShoot && <LottieConfettiIcon />}
				</div>
				<div className="absolute right-4 bottom-4 z-[999999]">
					<Music />
				</div>
				<div className="absolute left-4 bottom-4 z-[999999]">
					<DialogBox
						step={step}
						isCompleted={isCompleted}
						setEnd={setEnd}
					/>
				</div>
			</div>
		</div>
	);
};

export default HPBD;
