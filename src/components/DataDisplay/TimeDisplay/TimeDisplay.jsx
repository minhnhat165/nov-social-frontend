import { Tooltip } from 'components/OverLay';
import { intlFormat } from 'date-fns';
import { memo } from 'react';
import { useTimeDisplay } from 'hooks/useTimeDisplay';

const TimeDisplay = ({
	date,
	addSuffix = false,
	styleDisplay: style = 'short',
	includeSeconds = false,
	secondsAlternativeText = 'Just now',
}) => {
	const timeDisplay = useTimeDisplay(new Date(date), {
		...{ addSuffix, style, includeSeconds, secondsAlternativeText },
	});
	return (
		<Tooltip
			className="!text-xs"
			content={intlFormat(
				new Date(date),
				{
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					hour12: false,
				},
				{
					locale: 'en-US',
				},
			)}
		>
			<span>{timeDisplay}</span>
		</Tooltip>
	);
};

const TimeDisplayMemo = memo(TimeDisplay);

export { TimeDisplayMemo as TimeDisplay };
