import React from 'react';

export const Feature = ({
	icon: Icon,
	title,
	subtitle,
}: {
	icon: React.ElementType;
	title: string;
	subtitle: string;
}) => (
	<div className='flex items-center gap-3'>
		<div
			className='p-3 rounded-md shadow-md dark:bg-[#FFD600] bg-purple-950'
			// style={{ background: colors.card }}
		>
			<Icon
				className='h-6 w-6 dark:text-purple-950 text-white'
				// style={{ color: colors.accent }}
			/>
		</div>
		<div>
			<div className='font-semibold dark:text-[#F5F3FF] text-purple-950'>
				{title}
			</div>
			<div className='text-sm dark:text-[#C8B8FF] text-purple-950'>
				{subtitle}
			</div>
		</div>
	</div>
);
