import { SlideFrom } from 'components/Effect/Transition';
import SelectField from 'components/FormElement/SelectField';
import IconButton from 'components/IconButton';
import SwitchDarkMode from 'components/SwitchDarkMode';
import { useState } from 'react';

const SettingBar = () => {
	const [show, setShow] = useState(true);
	return (
		<div className="relative flex">
			<SlideFrom show={show} from="right">
				<div className="flex h-14 w-80 items-center gap-4 rounded-l-xl bg-white p-2 px-3 shadow dark:bg-dark-800 dark:shadow-none">
					<SwitchDarkMode />
					<div className="h-full w-[1px] bg-slate-200 dark:bg-dark-700"></div>
					<SelectField
						defaultValue="English"
						size="sm"
						className="w-fit"
						onChange={(e) => {
							console.log(e.target.value);
						}}
						options={[
							{ value: 'EN', label: 'English' },
							{ value: 'VN', label: 'Vietnamese' },
						]}
					/>
				</div>
			</SlideFrom>

			<div className="absolute top-2 right-2">
				<IconButton
					size="md"
					color="secondary"
					onClick={() => setShow((prev) => !prev)}
					className="rounded-r-nones rounded-xl border border-slate-300 dark:border-none"
				>
					<i className="fa-solid fa-bars-sort"></i>
				</IconButton>
			</div>
		</div>
	);
};

export default SettingBar;
