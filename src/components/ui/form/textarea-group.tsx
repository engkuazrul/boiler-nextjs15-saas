"use client";

interface TextareaGroupProps {
	name: string;
	label: string;
	value: string;
	placeholder?: string;
	handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	rows?: number;
}

export default function TextareaGroup(props: TextareaGroupProps) {
	const { name, label, value, placeholder, handleChange, rows } = props;

	return (
		<div>
			<label
				htmlFor={name}
				className='mb-2.5 block font-satoshi text-base font-medium text-dark dark:text-white'
			>
				{label}
			</label>
			<div className='relative'>
				<textarea
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					rows={rows}
					className={`w-full resize-none rounded-lg border border-gray-3 px-5.5 py-3 text-dark outline-none ring-offset-1 duration-300 focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-transparent dark:text-white dark:focus:border-transparent`}
				/>
			</div>
		</div>
	);
}
