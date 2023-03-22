import { CheckIcon } from 'components/Icon';
import { IconWrapper } from 'components/DataDisplay';
import clsx from 'clsx';

export const Stepper = ({ steps, currentStepId, completedStepIds }) => {
	return (
		<div className="relative my-4">
			<div className="absolute left-1/2 top-6 z-0 h-0.5 w-[96%] -translate-x-1/2 bg-slate-300 dark:bg-dark-600">
				<div
					className="absolute left-0 top-0 z-0 h-0.5  transform bg-primary-700 transition-all duration-500 ease-in-out dark:bg-primary-500"
					style={{
						width: `${
							completedStepIds.length < steps.length - 1
								? completedStepIds.length *
								  (100 / (steps.length - 1))
								: 100
						}%`,
					}}
				></div>
			</div>

			<div className="relative flex justify-between">
				{steps.map((item, index) => {
					return (
						<StepperItem
							item={item}
							key={index}
							isFocus={currentStepId === item.id}
							isActive={completedStepIds.includes(item.id)}
						/>
					);
				})}
			</div>
		</div>
	);
};

const StepperItem = ({ item, isFocus, isActive }) => {
	return (
		<div className="flex flex-col items-center">
			<div className="border-4 border-white dark:border-dark-800">
				<div
					className={clsx(
						'flex h-10 w-10 items-center justify-center rounded-full',
						isFocus && !isActive
							? 'border border-primary-700 bg-primary-50 text-primary-700 dark:bg-primary-100'
							: 'text-slate-500 dark:text-dark-100',
						isActive
							? 'bg-primary-700 text-blue-50 dark:bg-primary-500'
							: 'bg-slate-300 dark:bg-dark-700',
					)}
				>
					<IconWrapper>
						{isActive ? (
							<CheckIcon
								strokeWidth={3}
								className="dark:text-dark-50"
							/>
						) : (
							item.icon
						)}
					</IconWrapper>
				</div>
			</div>
			<div className="flex flex-col items-center">
				<div
					className={`text-sm font-medium ${
						isFocus
							? 'text-primary-700 dark:text-primary-500'
							: 'text-slate-500 dark:text-dark-100'
					}`}
				>
					{item.title}
				</div>
			</div>
		</div>
	);
};
