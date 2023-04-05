import {
	BronzeRankIcon,
	DiamondRankIcon,
	GoldRankIcon,
	IronRankIcon,
	LegendaryRankIcon,
	PlatinumRankIcon,
	SilverRankIcon,
} from 'components/Icon';

import { IconWrapper } from '../IconWrapper';

const rankIcons = {
	1: <IronRankIcon />,
	2: <BronzeRankIcon />,
	3: <SilverRankIcon />,
	4: <GoldRankIcon />,
	5: <PlatinumRankIcon />,
	6: <DiamondRankIcon />,
	7: <LegendaryRankIcon />,
};

export const Rank = ({ rank, size = 8 }) => {
	return <IconWrapper size={size}>{rankIcons[rank]}</IconWrapper>;
};

Rank.All = ({ size = 9 }) => {
	return (
		<>
			{Object.keys(rankIcons).map((rank, index) => (
				<div key={index} className="flex flex-col items-center">
					<Rank rank={index + 1} size={size} />
				</div>
			))}
		</>
	);
};
