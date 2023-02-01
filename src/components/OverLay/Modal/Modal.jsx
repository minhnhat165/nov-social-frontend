import clsx from 'clsx';
import IconButton from 'components/Action/IconButton';
import { XMarkIcon } from 'components/Icon';
import IconWrapper from 'components/Icon/IconWrapper';
import { Children, cloneElement, useState } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ show, onClose, onClickBackDrop = onClose, children }) => {
	return createPortal(
		<>
			{show && (
				<div className="fixed z-[99999]">
					<div
						className="fixed top-0 left-0 right-0 bottom-0
            backdrop-brightness-50"
						onClick={onClickBackDrop}
					></div>
					<div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						{Children.map(children, (child, index) => {
							const { name: childName } = child.type;

							if (childName === 'Close') {
								return cloneElement(child, {
									key: index,
									onClick: onClose,
								});
							}

							if (childName === 'Props')
								return cloneElement(child, {
									key: index,
									show,
									onClose,
								});

							if (childName === 'Modal') {
								return cloneElement(child, {
									key: index,
								});
							}
							return child;
						})}
					</div>
				</div>
			)}
		</>,
		document.body
	);
};

const Props = ({ children, show, onClose, ...props }) => {
	return <>{children({ show, onClose, ...props })}</>;
};

const Panel = ({ children, className, ...props }) => {
	return (
		<div
			className={clsx(
				'overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl dark:bg-dark-800',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

const Control = ({ children, className, ...props }) => {
	const [show, setShow] = useState(false);
	return (
		<>
			{Children.map(children, (child, index) => {
				const { name: childName } = child.type;
				if (childName === 'Trigger') {
					return cloneElement(child, {
						key: index,
						onClick: () => setShow(true),
					});
				}
				if (childName === 'Modal') {
					return cloneElement(child, {
						key: index,
						show,
						onClose: () => setShow(false),
					});
				}
				return child;
			})}
		</>
	);
};

const Trigger = ({ children, className, ...props }) => {
	return (
		<div className={clsx('cursor-pointer', className)} {...props}>
			{children}
		</div>
	);
};

const Close = ({ children, onClick, className, ...props }) => {
	return (
		<div className="absolute right-2 top-2">
			<IconButton
				type="button"
				rounded
				size="sm"
				variant="text"
				color="light"
				onClick={onClick}
				{...props}
			>
				<IconWrapper>{children || <XMarkIcon />}</IconWrapper>
			</IconButton>
		</div>
	);
};

const Header = ({ children, className, ...props }) => {
	return (
		<div
			className={clsx('h-14 w-full bg-inherit p-4', className)}
			{...props}
		>
			<h2 className="text-xl font-medium leading-6 text-gray-900 dark:text-dark-100">
				{children}
			</h2>
		</div>
	);
};

const Content = ({ children, className, ...props }) => {
	return (
		<div className={clsx('p-4', className)} {...props}>
			{children}
		</div>
	);
};

const Footer = ({ children, className, ...props }) => {
	return (
		<div
			className={clsx('h-14 w-full bg-inherit p-4', className)}
			{...props}
		>
			{children}
		</div>
	);
};

Modal.Control = Control;
Modal.Trigger = Trigger;
Modal.Props = Props;
Modal.Panel = Panel;
Panel.Content = Content;
Panel.Footer = Footer;
Panel.Header = Header;
Modal.Close = Close;

Modal.defaultProps = {
	show: false,
	title: '',
	onClose: () => {},
	children: null,
	hasCloseButton: true,
};

export default Modal;
