import Button from 'components/Action/Button';
import Card from 'components/DataDisplay/Card';
import { AcademicCapIcon, CakeIcon, HomeIcon } from 'components/Icon';
import IconWrapper from 'components/Icon/IconWrapper';
import Text from 'components/Typography/Text';

const Intro = () => {
	return (
		<Card className="h-fit w-full">
			<Card.Title>Intro</Card.Title>
			<Card.Body>
				<div className="-mx-2 pb-2">
					<Item title="Lives in Hà Nội" icon={<HomeIcon />} />
					<Item
						title="Studied at Hà Nội University of Science and Technology"
						icon={<AcademicCapIcon />}
					/>
					<Item title="Birth day 1/1/2000" icon={<CakeIcon />} />
				</div>
				<div className="flex flex-col gap-3">
					<Button size="sm" color="secondary">
						Add hobbies
					</Button>
					<Button size="sm" color="secondary">
						Add website
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
};

const Item = ({ title, icon }) => {
	return (
		<div className="flex items-center p-2">
			<IconWrapper className="text-normal shrink-0">{icon}</IconWrapper>
			<Text level={2} className="ml-2">
				{title}
			</Text>
		</div>
	);
};

export default Intro;
