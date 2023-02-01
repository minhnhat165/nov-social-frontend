import RadioGroup from './RadioGroup';

export default {
	title: 'Components/FormElement/RadioGroup',
	component: RadioGroup,
};

const Template = (args) => <RadioGroup {...args} />;
export const Default = Template.bind({});
Default.args = {
	label: 'Label',
	options: [
		{
			name: 'option1',
			value: 'option1',
		},
		{
			name: 'option2',
			value: 'option2',
		},
		{
			name: 'option3',
			value: 'option3',
		},
	],
};
