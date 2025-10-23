import { Skeleton } from '@/components/ui/skeleton';

export default function HomeSkeleton() {
	return (
		<div className='w-full space-y-15 animate-pulse'>
			{/* 🔍 Header */}
			<header className='py-4 md:py-6 border-b'>
				<div className='container mx-auto px-4 flex items-center justify-between gap-3 '>
					<Skeleton className='h-12 w-[200px] md:w-[250px] rounded-md bg-gray-300 dark:bg-gray-700' />
					<Skeleton className='md:block hidden h-12 w-[300px] md:w-[500px] rounded-md bg-gray-300 dark:bg-gray-700' />
					<div className='flex items-center gap-4'>
						<Skeleton className='h-12 w-12 rounded-md bg-gray-300 dark:bg-gray-700' />
						<Skeleton className='h-12 w-12 rounded-md bg-gray-300 dark:bg-gray-700' />
						<Skeleton className='h-12 w-12 rounded-md bg-gray-300 dark:bg-gray-700' />
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 space-y-15'>
				{/* 🟪 Hero Section */}
				<section className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					<div className='space-y-4'>
						<Skeleton className='h-6 w-32 bg-gray-300 dark:bg-gray-700' />
						<Skeleton className='h-13 w-3/4 bg-gray-300 dark:bg-gray-700' />
						<Skeleton className='h-13 w-2/4 bg-gray-300 dark:bg-gray-700' />
						<Skeleton className='h-6 w-2/3 bg-gray-300 dark:bg-gray-700' />
						<div className='flex gap-4 mt-4'>
							<Skeleton className='h-12 w-32 rounded-lg bg-gray-300 dark:bg-gray-700' />
							<Skeleton className='h-12 w-32 rounded-lg bg-gray-300 dark:bg-gray-700' />
						</div>
						<div className='flex gap-6 mt-8'>
							<Skeleton className='h-18 w-40 bg-gray-300 dark:bg-gray-700' />
							<Skeleton className='h-18 w-40 bg-gray-300 dark:bg-gray-700' />
							<Skeleton className='h-18 w-40 bg-gray-300 dark:bg-gray-700' />
						</div>
					</div>
					<Skeleton className='w-full h-[250px] md:h-[350px] rounded-xl bg-gray-300 dark:bg-gray-700' />
				</section>

				{/* 🟡 Product Section */}
				<section className='space-y-6'>
					<div className='flex-wrap flex justify-between items-center'>
						<Skeleton className='h-8 w-[200px] bg-gray-300 dark:bg-gray-700' />
						<div className='flex flex-wrap gap-6 mt-6'>
							<Skeleton className='h-10 w-[100px] bg-gray-300 dark:bg-gray-700' />
							<Skeleton className='h-10 w-[100px] bg-gray-300 dark:bg-gray-700' />
							<Skeleton className='h-10 w-[100px] bg-gray-300 dark:bg-gray-700' />
							<Skeleton className='h-10 w-[100px] bg-gray-300 dark:bg-gray-700' />
							<Skeleton className='h-10 w-[100px] bg-gray-300 dark:bg-gray-700' />
							<Skeleton className='h-10 w-[100px] bg-gray-300 dark:bg-gray-700' />
						</div>{' '}
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[...Array(3)].map((_, i) => (
							<div key={i} className='p-4 border rounded-lg space-y-4'>
								<Skeleton className='h-[180px] w-full rounded-lg bg-gray-300 dark:bg-gray-700' />
								<div className='flex flex-wrap justify-between gap-3'>
									<Skeleton className='h-6 w-2/4 bg-gray-300 dark:bg-gray-700' />
									<Skeleton className='h-6 w-1/4 bg-gray-300 dark:bg-gray-700' />
								</div>
								<div className='flex gap-3'>
									<Skeleton className='h-10 w-24 rounded-lg bg-gray-300 dark:bg-gray-700' />
									<Skeleton className='h-10 w-24 rounded-lg bg-gray-300 dark:bg-gray-700' />
								</div>
							</div>
						))}
					</div>
				</section>

				{/* ⭐ Testimonials */}
				<section className='space-y-6'>
					<Skeleton className='h-8 w-[200px] bg-gray-300 dark:bg-gray-700' />
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{[...Array(3)].map((_, i) => (
							<div key={i} className='p-4 border rounded-lg space-y-3'>
								<Skeleton className='h-18 w-18 rounded-full bg-gray-300 dark:bg-gray-700' />
								<Skeleton className='h-4 w-full bg-gray-300 dark:bg-gray-700' />
								<Skeleton className='h-4 w-2/3 bg-gray-300 dark:bg-gray-700' />
								<Skeleton className='h-4 w-1/3 bg-gray-300 dark:bg-gray-700' />
							</div>
						))}
					</div>
				</section>

				{/* ✉️ Newsletter */}
				<section>
					<div className='p-6 border rounded-lg flex flex-col md:flex-row items-center justify-between gap-4'>
						<Skeleton className='h-8 w-[200px] bg-gray-300 dark:bg-gray-700' />
						<div className='flex gap-3 w-full md:w-auto'>
							<Skeleton className='h-10 w-full md:w-64 rounded-lg bg-gray-300 dark:bg-gray-700' />
							<Skeleton className='h-10 w-32 rounded-lg bg-gray-300 dark:bg-gray-700' />
						</div>
					</div>
				</section>
			</div>

			{/* ⚫ Footer */}
			<footer className='py-10 border-t'>
				<div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8'>
					{[...Array(4)].map((_, i) => (
						<div key={i} className='space-y-3'>
							<Skeleton className='h-6 w-full md:w-3/4 bg-gray-300 dark:bg-gray-700' />
							<Skeleton className='h-4 w-5/6 md:w-2/4 bg-gray-300 dark:bg-gray-700' />
							<Skeleton className='h-4 w-4/6 md:w-3/4 bg-gray-300 dark:bg-gray-700' />
							<Skeleton className='h-4 w-5/6 md:w-2/4 bg-gray-300 dark:bg-gray-700' />
						</div>
					))}
				</div>
			</footer>
		</div>
	);
}
