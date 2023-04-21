import { cloneElement, forwardRef, useImperativeHandle, useState } from 'react';

import Layer from 'components/Layout/Layer';
import { LazyTippy } from './LazyTippy';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';

export const Popover = forwardRef(
	(
		{
			interactive,
			hideOnClick,
			appendTo = document.body,
			onClickOutside,
			placement,
			offset,
			children,
			render,
			hideOnClickOutside = true,
			lazy = true,
			...props
		},
		ref,
	) => {
		const [visible, setVisible] = useState(false);

		const Component = lazy ? LazyTippy : Tippy;

		useImperativeHandle(
			ref,
			() => {
				return {
					show: () => setVisible(true),
					hide: () => setVisible(false),
					toggle: () => setVisible(!visible),
				};
			},
			[visible],
		);

		return (
			<Component
				interactive
				appendTo={appendTo}
				visible={visible}
				onClickOutside={() => {
					hideOnClickOutside && setVisible(false);
					onClickOutside && onClickOutside();
				}}
				placement={placement}
				offset={offset}
				{...props}
				render={(attrs) =>
					render && typeof render === 'function'
						? render(attrs)
						: cloneElement(render, {
								...attrs,
								onClick: () => {
									hideOnClick && setVisible(false);
								},
						  })
				}
			>
				<div
					onClick={(e) => {
						e.stopPropagation();
						setVisible(!visible);
					}}
				>
					{typeof children === 'function'
						? cloneElement(
								children({
									visible,
								}),
						  )
						: children}
				</div>
			</Component>
		);
	},
);

const Content = forwardRef(({ children, className, ...props }, ref) => {
	return (
		<Layer ref={ref} {...props} className={clsx('tooltip', className)}>
			{children}
		</Layer>
	);
});

const Arrow = () => <div className="arrow" data-popper-arrow />;
Popover.Content = Content;
Popover.Arrow = Arrow;

Popover.propTypes = {
	interactive: PropTypes.bool,
	hideOnClick: PropTypes.bool,
	appendTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	onClickOutside: PropTypes.func,
	placement: PropTypes.string,
	offset: PropTypes.array,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	render: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	lazy: PropTypes.bool,
};
