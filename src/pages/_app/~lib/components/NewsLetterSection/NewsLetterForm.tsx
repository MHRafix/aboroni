import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterForm() {
	return (
		<section className='py-16 lg:py-24 bg-purple-950 dark:bg-muted/30 text-primary-foreground my-15 rounded-lg'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='max-w-2xl mx-auto text-center space-y-8'>
					<div className='space-y-4'>
						<h2 className='text-3xl lg:text-4xl font-bold text-balance'>
							Stay in the Loop
						</h2>
						<p className='text-lg text-primary-foreground/80 text-pretty'>
							Get early access to new collections, exclusive offers, and style
							tips delivered straight to your inbox.
						</p>
					</div>

					<div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
						<Input
							placeholder='Enter your email'
							className='bg-transparent flex-1 py-6'
						/>
						<Button
							variant='secondary'
							className='bg-accent text-accent-foreground hover:bg-accent/90 py-6'
						>
							Subscribe
						</Button>
					</div>

					<p className='text-sm text-primary-foreground/60'>
						No spam, unsubscribe at any time. We respect your privacy.
					</p>
				</div>
			</div>
		</section>
	);
}
