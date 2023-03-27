import {
	ChatBubbleBottomCenterTextIcon,
	ShareIcon,
	SparklesIcon,
} from 'components/Icon';

import { IconWrapper } from 'components/DataDisplay';
import { Text } from 'components/Typography';
import { formatNumber } from 'utils';
import { useMemo } from 'react';

export const PostFooter = () => {
	return (
		<footer className="border-normal flex items-center justify-end gap-3 py-3">
			<ActionButton icon={<SparklesIcon />} />
			<ActionButton
				icon={<ChatBubbleBottomCenterTextIcon />}
				number={12000}
			/>
			<ActionButton icon={<ShareIcon />} number={9} />
		</footer>
	);
};

const ActionButton = ({ icon, number = 0 }) => {
	const numberDisplay = useMemo(() => {
		return formatNumber(number);
	}, [number]);
	return (
		<div className="flex h-9 w-28  items-center justify-between overflow-hidden rounded-full bg-slate-200 dark:bg-dark-700">
			<div className="flex h-full flex-1 cursor-pointer items-center justify-center px-2 hover:bg-slate-300 dark:hover:bg-dark-600">
				<IconWrapper size={5} className="text-normal">
					{icon}
				</IconWrapper>
			</div>
			<div className="h-[70%] w-[1px] bg-slate-300 dark:bg-dark-500" />
			<div className="flex h-full flex-1 cursor-pointer items-center justify-center px-2 hover:bg-slate-300 dark:hover:bg-dark-600">
				<Text level={2} className="text-base">
					{numberDisplay}
				</Text>
			</div>
		</div>
	);
};
