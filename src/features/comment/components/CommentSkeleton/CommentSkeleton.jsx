export const CommentSkeleton = () => {
	return (
		<div className="flex w-full flex-col gap-2 p-2 pt-0">
			<div className="flex items-center gap-2">
				<div className="h-9 w-9 animate-pulse rounded-full bg-dark-700"></div>
				<div className="h-4 w-32 animate-pulse rounded-full bg-dark-700"></div>
			</div>
			<div className="ml-10">
				<div className="h-4 w-full animate-pulse rounded-full bg-dark-700"></div>
			</div>
			<div className="ml-10">
				<div className="h-4 w-2/3 animate-pulse rounded-full bg-dark-700"></div>
			</div>

			<div className="ml-10 flex gap-4">
				<div className="h-4 w-8 animate-pulse rounded-full bg-dark-700"></div>
				<div className="h-4 w-8 animate-pulse rounded-full bg-dark-700"></div>
			</div>
		</div>
	);
};
