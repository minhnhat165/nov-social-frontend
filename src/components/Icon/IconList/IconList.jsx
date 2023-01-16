import { ArrowRightIcon } from '../ArrowRightIcon';
import { CheckIcon } from '../CheckIcon';
import { CircleCheckIcon } from '../CircleCheckIcon';
import { FacebookIcon } from '../FacebookIcon';
import { FlagIcon } from '../FlagIcon';
import { GoogleIcon } from '../GoogleIcon';
import { LockIcon } from '../LockIcon';
import { ArrowLeftIcon } from '../MailIcon';
import { TwitterIcon } from '../TwitterIcon';
import { UserIcon } from '../UserIcon';
import { XmarkIcon } from '../XmarkIcon';

export const IconList = ({ color }) => {
	return (
		<ul
			className="flex h-full  w-full flex-wrap gap-4 bg-[#f0f1f3] p-5"
			style={color && { color }}
		>
			<ItemsWrapper>
				<XmarkIcon className="text-inherit" />
			</ItemsWrapper>
			<ItemsWrapper>
				<UserIcon className="text-inherit" />
			</ItemsWrapper>
			<ItemsWrapper>
				<CheckIcon className="text-inherit" />
			</ItemsWrapper>
			<ItemsWrapper>
				<ArrowLeftIcon className="text-inherit" />
			</ItemsWrapper>
			<ItemsWrapper>
				<ArrowRightIcon className="text-inherit" />
			</ItemsWrapper>
			<ItemsWrapper>
				<FlagIcon className="text-inherit" />
			</ItemsWrapper>
			<ItemsWrapper>
				<LockIcon className="text-inherit" />
			</ItemsWrapper>
			<ItemsWrapper>
				<GoogleIcon className="text-inherit" />
			</ItemsWrapper>
			<ItemsWrapper>
				<CircleCheckIcon className="text-inherit" />
			</ItemsWrapper>
			<ItemsWrapper>
				<FacebookIcon className="text-inherit" />
			</ItemsWrapper>
			<ItemsWrapper>
				<TwitterIcon className="text-inherit" />
			</ItemsWrapper>
		</ul>
	);
};

const ItemsWrapper = ({ children }) => {
	return (
		<div className=" flex aspect-square w-14 items-center justify-center rounded-xl bg-white">
			{children}
		</div>
	);
};
