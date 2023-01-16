import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TagText = ({ tag, text, typeReturn = 'dom', className }) => {
	const currentUserId = useSelector((state) => state.auth.user._id);
	const newText = useMemo(() => {
		const result = text.split(' ').map((word, index) => {
			if (word.includes('@')) {
				const user = tag.find((user) => word.includes(user._id));
				if (user) {
					const hasComma = word.includes(',');
					if (typeReturn === 'text') return user.name + ' ';
					return (
						<span key={index}>
							{currentUserId === user._id ? (
								<> {index === 0 ? 'You' : 'you'}</>
							) : (
								<Link
									to={`/profile/${user._id}`}
									className="font-bold dark:text-dark-text-bold dark:hover:text-primary"
								>
									{user.name}
								</Link>
							)}
							{hasComma ? ', ' : ' '}
						</span>
					);
				}
			}
			return word + ' ';
		});
		return result;
	}, [currentUserId, tag, text, typeReturn]);

	return <div className={className}>{newText}</div>;
};

export default TagText;
