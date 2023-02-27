import { NumberField } from '.';

export default {
	title: 'Components/FormElement/NumberField',
	component: NumberField,
};

const Template = (args) => <NumberField {...args} />;
export const Default = Template.bind({});
Default.args = {};
