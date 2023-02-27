import { Input } from './Input';

export default {
	title: 'Components/FormElement/Input',
	component: Input,
};

const Template = (args) => <Input {...args} />;
export const Default = Template.bind({});
Default.args = {
	label: 'Label',
	placeholder: 'Placeholder',
	size: 'md',
};
