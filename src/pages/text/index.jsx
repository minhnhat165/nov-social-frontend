import { Cursor, useTypewriter } from 'react-simple-typewriter';

import React from 'react';
import { Text } from 'components/Typography';

const TextPage = () => {
	const [text, helper] = useTypewriter({
		words: [
			'Hello everyone ❤️',
			'Welcome to my channel!',
			'I am a frontend developer',
			"I'm thrilled to introduce you to my brand new social media platform.",
			'This is a social media platform that I built from scratch.',
			'I built it using ReactJS, NodeJS, ExpressJS, MongoDB, Socket.io, and TailwindCSS',
			'I hope you enjoy it!',
			"Let's get started!",
		],
		loop: true,
		/* Config */
	});
	const { isType, isDelete, isDelay, isDone } = helper;
	return (
		<div className="flex h-screen items-center justify-center">
			<Text className="text-center text-8xl">{text}</Text>
			<Cursor
				cursorColor="#299de1"
				cursorStyle={
					<div className="mt-1 h-20 w-4 rounded-full  bg-blue-500"></div>
				}
			/>
		</div>
	);
};

export default TextPage;
