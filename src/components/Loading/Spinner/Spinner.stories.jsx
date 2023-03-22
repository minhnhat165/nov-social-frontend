import { Spinner } from '.';

export default {
	title: 'Components/Spinner',
	component: Spinner,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
};

const Template = (args) => <Spinner {...args} />;
export const Primary = Template.bind({});
Primary.args = {
	color: 'primary',
};
