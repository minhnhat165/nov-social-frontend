import InputField from './InputField';

export default {
	title: 'Components/FormElement/InputField',
	component: InputField,
};

const Template = (args) => <InputField {...args} />;
export const Default = Template.bind({});
Default.args = {
	label: 'Label',
	placeholder: 'Placeholder',
	size: 'md',
};
