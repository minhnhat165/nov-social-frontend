import { Cursor, useTypewriter } from 'react-simple-typewriter';

import { Button } from 'components/Action';
import { Link } from 'react-router-dom';
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
	});
	const { isDone } = helper;
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-10">
			<Text className="text-center text-8xl">
				{text}
				<Cursor
					cursorColor="#299de1"
					cursorStyle={
						<div className="mt-1 inline-block h-20 w-4 translate-y-2 rounded-full  bg-blue-500"></div>
					}
				/>
			</Text>
			{isDone && (
				<Button as={Link} to={'/'} color="primary">
					Get Started
				</Button>
			)}
		</div>
	);
};

export default TextPage;
