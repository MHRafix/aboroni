import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormField as ShadcnFormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FieldProps {
	control: any; // from react-hook-form useForm
	name: string;
	label: string;
	placeholder?: string;
	as?: 'input' | 'textarea';
}

export function FormField({
	control,
	name,
	label,
	placeholder,
	as = 'input',
}: FieldProps) {
	return (
		<ShadcnFormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className='text-purple-950 dark:text-gray-300'>
						{label}
					</FormLabel>
					<FormControl>
						{as === 'textarea' ? (
							<Textarea
								placeholder={placeholder}
								{...field}
								className='bg-white dark:bg-transparent text-purple-950 dark:text-white'
							/>
						) : (
							<Input
								placeholder={placeholder}
								{...field}
								className='bg-white py-6 dark:bg-transparent text-purple-950 dark:text-white'
							/>
						)}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
