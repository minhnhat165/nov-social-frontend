import { CubeTransparentIcon } from 'components/Icon';
import IconWrapper from 'components/Icon/IconWrapper';

const TextPanel = ({ children, title, subtitle }) => {
	return (
		<div className="prose flex h-full w-full  flex-col items-center justify-center p-8 text-center lg:prose-lg">
			<div className="rounded-full bg-gradient-to-t from-primary-900 to-primary-400 p-2 shadow-xl">
				<IconWrapper size={10}>
					<CubeTransparentIcon className="text-white" />
				</IconWrapper>
			</div>

			<h2 className="text-slate-50 drop-shadow-sm dark:text-dark-700">
				{title}
			</h2>
			<p className="text-slate-50 dark:text-dark-700">{subtitle}</p>
			{children}
		</div>
	);
};

export default TextPanel;
