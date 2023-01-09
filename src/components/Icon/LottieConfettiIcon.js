import LottieWrapper from './LottieWrapper';
import * as jsonIcon from './JsonIcon/confetti.json';

const LottieConfettiIcon = ({ className }) => {
	return (
		<LottieWrapper loop={false} jsonIcon={jsonIcon} className={className} />
	);
};

export default LottieConfettiIcon;
