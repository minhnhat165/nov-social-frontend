const FinishForm = ({ isCreated }) => {
	return (
		<div className="border-1 flex h-[264px] w-full flex-col items-center justify-center rounded-xl bg-slate-100 dark:bg-dark-700">
			<div className="p-4 text-center">
				{isCreated ? (
					<Content
						title="Congratz, you successfully created your account."
						subtitle={
							<>
								We just sent you a confirmation email. Please
								confirm your account within 24 hours.
							</>
						}
					/>
				) : (
					<Content
						title="You are all set!"
						subtitle={
							<>
								By clicking the{' '}
								<span className="font-bold dark:text-dark-50">
									Create Account
								</span>{' '}
								button below, your account will be created.
							</>
						}
					/>
				)}
			</div>
		</div>
	);
};

const Content = ({ title, subtitle }) => {
	return (
		<>
			<h3 className="font-bold text-primary-700 dark:text-primary-500">
				{title}
			</h3>
			<p className="text-base text-slate-800 dark:text-dark-100">
				{subtitle}
			</p>
		</>
	);
};

export default FinishForm;
