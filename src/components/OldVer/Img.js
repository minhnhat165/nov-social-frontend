import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Modal from './Modal';

const Img = ({ src, className, clickAble }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div className="relative h-full w-full">
			{src ? (
				<LazyLoadImage
					src={src}
					alt="img"
					className={`h-full w-full ${className}`}
				></LazyLoadImage>
			) : (
				<div className="flex h-full w-full items-center justify-center dark:bg-dark-text-bold">
					<i className="fa-solid fa-n text-primary-bold"></i>
				</div>
			)}
			{clickAble && (
				<>
					<div
						className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer"
						onClick={() => setShowModal(true)}
					></div>
					<Modal show={showModal} setShow={setShowModal}>
						<div className="h-screen w-screen bg-black p-4">
							<div className="h-full w-full">
								<img src={src} alt="" className={`h-full w-full p-10`}></img>
							</div>
						</div>
					</Modal>
				</>
			)}
		</div>
	);
};

export default Img;
