import './styles.css';

import {
	ChatBubbleBottomCenterTextIcon,
	ShareIcon,
	SparklesIcon,
} from 'components/Icon';

import { IconWrapper } from 'components/DataDisplay';
import { Text } from 'components/Typography';
import clsx from 'clsx';
import { formatNumber } from 'utils';
import { useMemo } from 'react';
import { usePost } from '../../Post';

export const PostFooter = () => {
	const { post, handleLike } = usePost();
	const { likesCount, isLiked } = post;

	return (
		<footer className="border-normal flex items-center justify-end gap-3 py-3">
			<ActionButton
				onIconClick={handleLike}
				onNumberClick={handleLike}
				icon={
					<SparklesIcon
						className={clsx(
							'transition-all group-active:scale-150',
							isLiked ? 'text-color-primary' : 'text-normal',
						)}
					/>
				}
				number={likesCount}
			/>
			<ActionButton
				icon={<ChatBubbleBottomCenterTextIcon />}
				number={12000}
			/>
			<ActionButton icon={<ShareIcon />} number={9} />
		</footer>
	);
};

const ActionButton = ({ icon, number = 0, onIconClick, onNumberClick }) => {
	const numberDisplay = useMemo(() => {
		return formatNumber(number);
	}, [number]);
	return (
		<div className="flex h-9 min-w-[108px]  items-center justify-between overflow-hidden rounded-full bg-slate-200 dark:bg-dark-700">
			<div
				className="button-active-effect button group rounded-l-full"
				onClick={onIconClick}
			>
				<IconWrapper size={5} className="text-normal">
					{icon}
				</IconWrapper>
			</div>
			<div className="h-[70%] w-[1px] bg-slate-300 dark:bg-dark-500" />
			<div
				className="button-active-effect button rounded-r-full"
				onClick={onNumberClick}
			>
				<Text level={1} className="text-base">
					{numberDisplay}
				</Text>
			</div>
		</div>
	);
};
