import { Dialog, Transition } from '@headlessui/react';
import CloseButton from 'components/CloseButton';
import { Fragment } from 'react';

const Modal = ({ title, isOpen, onClose, children }) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-60" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="relative max-w-fit transform overflow-hidden rounded-xl bg-white p-4 text-left align-middle shadow-xl transition-all dark:bg-dark-800">
								{title && (
									<Dialog.Title
										as="h2"
										className="mb-4 text-xl font-medium leading-6 text-gray-900 dark:text-dark-100"
									>
										{title}
									</Dialog.Title>
								)}
								<div className="absolute top-2 right-2">
									<CloseButton
										type="button"
										onClick={onClose}
									/>
								</div>

								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Modal;
