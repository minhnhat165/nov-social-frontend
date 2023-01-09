import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../../components/ButtonOld/ButtonV2';
import music from '../../../assets/audios/music.mp3';
const Music = () => {
	const [isActive, setIsActive] = useState(false);
	const audio = useMemo(() => {
		const audio = new Audio(music);
		audio.loop = true;
		return audio;
	}, []);

	useEffect(() => {
		if (isActive) audio.play();
		else audio.pause();
	}, [audio, isActive]);

	return (
		<div>
			<Button
				onClick={() => setIsActive((prev) => !prev)}
				rounded
				color="bg-white text-pink-500"
				className="shadow-md shadow-pink-300"
				centerIcon={
					isActive ? (
						<i className="fa-solid fa-music"></i>
					) : (
						<i className="fa-solid fa-music-slash"></i>
					)
				}
			></Button>
		</div>
	);
};

export default Music;
