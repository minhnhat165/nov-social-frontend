import { useMemo, memo } from 'react';
import formatDate from '../functions/formatDate';
import getDiffTime from '../utils/getDiffTime';
import Tooltip from './Tooltip';

const DiffTime = ({
	startDate,
	endDate = new Date(),
	className,
	isShowTooltip,
}) => {
	const time = useMemo(() => {
		return getDiffTime(startDate, endDate);
	}, [endDate, startDate]);

	const render = useMemo(() => {
		if (isShowTooltip) {
			const startDateFormatted = formatDate(new Date(startDate));
			return (
				<Tooltip content={startDateFormatted} placement={'bottom'} arrow>
					<div
						className={`${className} text-sm font-bold dark:text-dark-text-light`}
					>
						{time.unit !== 's' ? <> {time.number + '' + time.unit}</> : 'now'}
					</div>
				</Tooltip>
			);
		}
		return (
			<div className={`${className} text-sm  dark:text-dark-text-light`}>
				{time.unit !== 's' ? <> {time.number + ' ' + time.unit}</> : 'now'}
			</div>
		);
	}, [time]);
	return <>{render}</>;
};

export default memo(DiffTime);
