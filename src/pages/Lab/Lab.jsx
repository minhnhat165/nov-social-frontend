// import './lab.css';

import * as ScrollArea from '@radix-ui/react-scroll-area';

const TAGS = Array.from({ length: 50 }).map(
	(_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

const Components = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<ScrollArea.Root className="h-60 w-16 overflow-hidden bg-[#2b3445]">
				<ScrollArea.Viewport className="ScrollAreaViewport">
					<div style={{ padding: '15px 20px' }}>
						<div className="Text">Tags</div>
						{TAGS.map((tag) => (
							<div className="Tag" key={tag}>
								{tag}
							</div>
						))}
					</div>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar
					className="w-[0.7rem] bg-gray-300 p-[2px] dark:bg-gray-700"
					orientation="vertical"
				>
					<ScrollArea.Thumb className="rounded-md bg-gray-500/50 hover:bg-gray-500 dark:bg-gray-500 hover:dark:bg-gray-400" />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
		</div>
	);
};

export default Components;
