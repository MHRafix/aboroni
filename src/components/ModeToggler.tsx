import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from './providers/ThemeProvider';

export function ModeToggler() {
	const { setTheme, theme } = useTheme();

	return (
		<Button
			variant='outline'
			size={'icon'}
			onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
			className='rounded-md cursor-pointer'
			// style={{ background: colors.accent, color: '#1A1030' }}
		>
			{theme === 'dark' ? (
				<Sun className='!h-5 !w-5 dark:text-[#FFD600] rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100' />
			) : (
				<Moon className='!h-5 !w-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0' />
			)}
		</Button>
	);
}
