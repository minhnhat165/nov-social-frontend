import Color from './Color';

export default {
	title: 'Example/Color',
	component: Color,
};

const Template = (args) => <Color {...args} />;
export const Primary = Template.bind({});
Primary.args = {
	color: 'blue',
};
export const Secondary = Template.bind({});
