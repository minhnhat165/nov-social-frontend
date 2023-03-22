import {
	ChatBubbleBottomCenterTextIcon,
	ShareIcon,
	SparklesIcon,
} from 'components/Icon';

import { IconWrapper } from 'components/DataDisplay';
import { Text } from 'components/Typography';

export const PostFooter = () => {
	return (
		<footer className="border-normal flex items-center justify-between border-t py-2">
			<ActionButton icon={<SparklesIcon />} />
			<ActionButton icon={<ChatBubbleBottomCenterTextIcon />} />
			<ActionButton icon={<ShareIcon />} />
		</footer>
	);
};

const ActionButton = ({ icon, number = 0 }) => {
	return (
		<div className="flex h-9 w-32 items-center justify-between overflow-hidden rounded-full bg-slate-200 dark:bg-dark-700">
			<div className="flex h-full flex-1 cursor-pointer items-center justify-center hover:bg-slate-300 dark:hover:bg-dark-600">
				<IconWrapper size={5} className="text-normal">
					{icon}
				</IconWrapper>
			</div>
			<div className="h-[70%] w-[1px] bg-slate-300 dark:bg-dark-500" />
			<div className="flex h-full flex-1 cursor-pointer items-center justify-center hover:bg-slate-300 dark:hover:bg-dark-600">
				<Text className="text-lg">{number}</Text>
			</div>
		</div>
	);
};
