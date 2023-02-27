import React, { useMemo } from 'react';

import { CloseButton } from 'components/Action';
import { Img } from 'components/DataDisplay';
import PropTypes from 'prop-types';

const PreviewBox = ({ previews, onRemove, className }) => {
	const groupPreview = useMemo(() => {
		const group = {
			left: [],
			right: [],
			rest: [],
		};

		if (previews.length === 0) return group;

		const [first, ...rest] = previews;

		group.left.push(first);

		if (rest.length === 0) return group;

		switch (rest.length) {
			case 1:
			case 2:
			case 3:
				group.right = rest;
				break;
			case 4:
				const [last, ...rest2] = rest.reverse();
				group.left.push(last);
				group.right = rest2.reverse();
				break;
			default:
				const [one, two, three, four, ...rest3] = rest;
				group.left.push(four);
				group.right = [one, two, three];
				group.rest = rest3;
				break;
		}

		return group;
	}, [previews]);

	return (
		<div className={className}>
			<div className="flex gap-1 overflow-hidden rounded-xl">
				<div className="flex flex-1 flex-col gap-1">
					{groupPreview.left.map((preview, index) => (
						<div key={index} className="relative flex-1">
							<Img
								draggable={false}
								src={preview.url}
								alt=""
								className="h-full w-full object-cover"
							/>
							{onRemove && (
								<CloseButton
									className="absolute top-2 right-2"
									onClick={() => onRemove(preview)}
								/>
							)}
						</div>
					))}
				</div>
				{groupPreview.right.length > 0 && (
					<div className="flex flex-1 flex-col gap-1">
						{groupPreview.right.map((preview, index) => (
							<div key={index} className="relative flex-1">
								<Img
									draggable={false}
									src={preview.url}
									alt=""
									className="h-full w-full object-cover"
								/>
								{groupPreview.rest.length > 0 &&
								groupPreview.right.length - 1 === index ? (
									<div className="absolute inset-0 flex items-center justify-center bg-black/70 text-3xl text-white">
										+{groupPreview.rest.length}
									</div>
								) : (
									<>
										{onRemove && (
											<CloseButton
												className="absolute top-2 right-2"
												onClick={() =>
													onRemove(preview)
												}
											/>
										)}
									</>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

PreviewBox.propTypes = {
	previews: PropTypes.array,
	onRemove: PropTypes.func,
};

PreviewBox.defaultProps = {
	previews: [],
	onRemove: null,
};

export default PreviewBox;
