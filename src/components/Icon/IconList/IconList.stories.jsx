import { IconList } from './IconList';

export default {
	title: 'Components/Icon',
	component: IconList,
	argTypes: {
		color: { control: 'color' },
	},
};

const Template = (args) => <IconList {...args} />;
export const Default = Template.bind({});
Default.args = {};
