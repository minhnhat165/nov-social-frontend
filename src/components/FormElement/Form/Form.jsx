import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const Form = ({
	id,
	defaultValues,
	className,
	children,
	onSubmit,
	options,
	schema,
}) => {
	const methods = useForm({
		...options,
		defaultValues,
		resolver: yupResolver(schema),
	});

	return (
		<form
			id={id}
			className={className}
			onSubmit={methods.handleSubmit(onSubmit)}
		>
			{children(methods)}
		</form>
	);
};

export default Form;
