import React, { useMemo } from 'react';

import { CloseButton } from 'components/Action';
import { Img } from 'components/DataDisplay';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const PreviewBox = ({
	previews,
	onRemove,
	className,
	onClick = null,
	imgSize,
}) => {
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
				group.right = rest;
				break;
			case 3:
				group.right.push(rest[0], rest[1]);
				group.left.push(rest[2]);

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

	const handleClick = (url) => {
		// exactly only one index with preview.url form previews
		const index = previews.findIndex((preview) => preview.url === url);
		onClick(index);
	};

	return (
		<div className={className}>
			<div className="flex gap-[1px] overflow-hidden rounded-xl">
				<div className="flex flex-1 flex-col gap-[1px]">
					{groupPreview.left.map((preview, index) => (
						<div
							key={index}
							className="relative flex-1 overflow-hidden"
						>
							<ImgItems
								img={preview?.url}
								index={index}
								onClick={onClick && handleClick}
								imgSize={imgSize}
							/>
							{onRemove && (
								<CloseButton
									className="absolute right-2 top-2"
									onClick={() => onRemove(preview)}
								/>
							)}
						</div>
					))}
				</div>
				{groupPreview.right.length > 0 && (
					<div className="flex flex-1 flex-col gap-[1px]">
						{groupPreview.right.map((preview, index) => (
							<div
								key={index}
								className="relative flex-1 overflow-hidden"
							>
								<ImgItems
									img={preview.url}
									index={index}
									onClick={onClick && handleClick}
								/>
								{groupPreview.rest.length > 0 &&
								groupPreview.right.length - 1 === index ? (
									<div
										onClick={
											onClick &&
											(() => handleClick(preview.url))
										}
										className={clsx(
											'absolute inset-0 flex items-center justify-center bg-black/50 text-3xl text-white',
											onClick &&
												'cursor-pointer transition-all hover:bg-black/60',
										)}
									>
										+{groupPreview.rest.length}
									</div>
								) : (
									<>
										{onRemove && (
											<CloseButton
												className="absolute right-2 top-2"
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

function ImgItems({ img, onClick = null, imgSize }) {
	return (
		<div className="h-full w-full" onClick={() => onClick(img)}>
			<Img
				draggable={false}
				src={img}
				alt=""
				className={clsx(
					'h-full w-full object-cover',
					onClick && 'cursor-pointer',
					imgSize && imgSize,
				)}
			/>
		</div>
	);
}
