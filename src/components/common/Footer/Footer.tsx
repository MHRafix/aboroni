import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from '@tanstack/react-router';
import { Mail, Phone, SearchCheck } from 'lucide-react';

export default function Footer() {
	const { theme } = useTheme();
	const navigate = useNavigate();

	return (
		<footer className='backdrop-blur bg-white dark:bg-[#0f172a] border-t border-gray-200 dark:border-t-[#364153] py-10 px-6'>
			<div className='max-w-lg mx-auto flex flex-col items-center text-center space-y-6'>
				{/* Logo */}
				<div className='text-2xl font-bold'>
					{theme === 'dark' ? (
						<img
							src='/white-logo.png'
							alt='logo'
							className='h-16 sm:h-22 w-auto object-contain cursor-pointer'
							onClick={() => navigate({ to: '/' })}
						/>
					) : (
						<img
							src='/dark-logo.png'
							alt='logo'
							className='h-16 sm:h-22 w-auto object-contain cursor-pointer'
							onClick={() => navigate({ to: '/' })}
						/>
					)}
				</div>

				{/* Description */}
				{/* <p className='text-gray-400 text-sm'>
					Premium products delivered with care. We ensure quality, trust, and
					satisfaction.
				</p> */}

				{/* Address */}
				<p className='text-gray-500 text-md'>
					Mirpur - 10, Dhaka -1216, Bangladesh
				</p>

				{/* Email */}
				<p className='text-gray-500 text-md flex gap-2 '>
					<Mail className='text-yellow-500' />
					loafinity.touch@gmail.com
				</p>
				<p className='text-gray-500 text-md flex gap-2 '>
					<Phone className='text-yellow-500' />
					+880 1343808032
				</p>

				{/* Social Icons */}
				<div className='flex space-x-4'>
					<a
						href='https://facebook.com/loafinity'
						className='hover:text-blue-400'
						target='_blank'
					>
						<img
							src={'https://cdn-icons-png.flaticon.com/128/733/733547.png'}
							className='w-12 h-12  cursor-pointer'
						/>
					</a>
					<a
						href='https://wa.me/8801343808032'
						className='hover:text-blue-500'
						target='_blank'
					>
						<img
							src={'https://cdn-icons-png.flaticon.com/128/3536/3536445.png'}
							className='w-12 h-12  cursor-pointer'
						/>
					</a>
				</div>

				{/* Track Orders Button */}
				<Link to='/track-order'>
					<Button className='px-6 py-2 bg-yellow-600 hover:bg-yellow-700 cursor-pointer rounded-lg shadow'>
						<SearchCheck /> Track Orders
					</Button>
				</Link>
			</div>
		</footer>
	);
}
