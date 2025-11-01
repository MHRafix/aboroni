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
			className='p-3 rounded-md shadow-md dark:bg-[#FFD600] bg-[#fcce09]'
			// style={{ background: colors.card }}
		>
			<Icon
				className='w-6 h-6 md:h-9 md:w-9 text-black'
				// style={{ color: colors.accent }}
			/>
		</div>
		<div>
			<div className='md:text-xl font-semibold dark:text-[#F5F3FF] text-[#2b1e20]'>
				{title}
			</div>
			<div className='text-md dark:text-gray-400 text-[#2b1e20]'>
				{subtitle}
			</div>
		</div>
	</div>
);
