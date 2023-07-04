import { ArrowDropDownIcon } from 'components/Icon';
import { Button } from 'components/Action';
import { Spinner } from 'components/Loading';
import clsx from 'clsx';

export function ShowReplyButton({
	toggleReply,
	isLoading,
	isShowReplies,
	numRepliesToShow,
}) {
	return (
		<Button
			onClick={toggleReply}
			variant="text"
			size="sm"
			rounded
			startIcon={
				isLoading ? (
					<Spinner />
				) : (
					<ArrowDropDownIcon
						with={48}
						height={48}
						className={clsx(
							'transform transition-all',
							isShowReplies && 'rotate-180  ',
						)}
					/>
				)
			}
		>
			{isShowReplies ? 'Hide' : 'Show'} {numRepliesToShow}{' '}
			{numRepliesToShow > 1 ? 'replies' : 'reply'}
		</Button>
	);
}
