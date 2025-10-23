import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
// @ts-ignore
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
const reviews = [
	{
		name: 'Ahmed Rahman',
		avatar: '/professional-man-portrait.png',
		rating: 5,
		comment:
			'Exceptional quality and comfort! The leather is premium and the fit is perfect. Highly recommend LOAFINITY.',
		verified: true,
	},
	{
		name: 'Sarah Khan',
		avatar: '/professional-woman-portrait.png',
		rating: 5,
		comment:
			'Love my new shoes! Great customer service and fast delivery. The quality exceeded my expectations.',
		verified: true,
	},
	{
		name: 'Mohammad Ali',
		avatar: '/young-man-portrait.png',
		rating: 5,
		comment:
			'Perfect for both office and casual wear. The comfort level is amazing and they look incredibly stylish.',
		verified: true,
	},
	{
		name: 'Ahmed Rahman',
		avatar: '/professional-man-portrait.png',
		rating: 5,
		comment:
			'Exceptional quality and comfort! The leather is premium and the fit is perfect. Highly recommend LOAFINITY.',
		verified: true,
	},
	{
		name: 'Sarah Khan',
		avatar: '/professional-woman-portrait.png',
		rating: 5,
		comment:
			'Love my new shoes! Great customer service and fast delivery. The quality exceeded my expectations.',
		verified: true,
	},
	{
		name: 'Mohammad Ali',
		avatar: '/young-man-portrait.png',
		rating: 5,
		comment:
			'Perfect for both office and casual wear. The comfort level is amazing and they look incredibly stylish.',
		verified: true,
	},
	{
		name: 'Ahmed Rahman',
		avatar: '/professional-man-portrait.png',
		rating: 5,
		comment:
			'Exceptional quality and comfort! The leather is premium and the fit is perfect. Highly recommend LOAFINITY.',
		verified: true,
	},
	{
		name: 'Sarah Khan',
		avatar: '/professional-woman-portrait.png',
		rating: 5,
		comment:
			'Love my new shoes! Great customer service and fast delivery. The quality exceeded my expectations.',
		verified: true,
	},
	{
		name: 'Mohammad Ali',
		avatar: '/young-man-portrait.png',
		rating: 5,
		comment:
			'Perfect for both office and casual wear. The comfort level is amazing and they look incredibly stylish.',
		verified: true,
	},
];

export function Testimonials() {
	return (
		<section className='py-16 lg:py-22'>
			<div className='container mx-auto'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-balance'>
						✨ কাস্টমার রিভিউ
					</h2>

					<div className='flex items-center gap-3'>
						<Button
							size={'icon'}
							className='custom-prev  rounded-md cursor-pointer transition duration-300 bg-[#FFD600] hover:bg-yellow-500 text-black shadow'
						>
							<ArrowLeft />
						</Button>
						<Button
							size={'icon'}
							className='custom-next bg-purple-950 cursor-pointer transition duration-300 hover:bg-purple-800  rounded-md shadow'
						>
							<ArrowRight />
						</Button>
					</div>
				</div>

				<Swiper
					autoplay={{
						delay: 4000, // 2.5s per slide
						disableOnInteraction: false, // keep autoplay after interaction
					}}
					slidesPerView={3}
					spaceBetween={30}
					freeMode={true}
					loop={true} // 🔄 infinite loop
					modules={[Navigation, Autoplay]}
					className='mySwiper'
					breakpoints={{
						0: {
							slidesPerView: 1, // mobile
						},
						640: {
							slidesPerView: 2, // small tablets
						},
						1024: {
							slidesPerView: 3, // desktop
						},
					}}
					navigation={{
						prevEl: '.custom-prev',
						nextEl: '.custom-next',
					}}
				>
					{reviews.map((review, index) => (
						<SwiperSlide key={index}>
							<Card className='h-[280px] shadow-sm'>
								<CardContent className='p-6 space-y-4'>
									<div className='flex'>
										{[...Array(5)].map((_, i) => (
											<span
												key={i}
												className={`text-xl font-extrabold ${i < review.rating ? 'text-[#fabc13]' : 'text-gray-300'}`}
											>
												★
											</span>
										))}
									</div>
									<blockquote className='text-muted-foreground text-pretty'>
										"{review.comment}"
									</blockquote>
									<div className='flex items-center space-x-3'>
										<Avatar className='h-10 w-10'>
											<AvatarImage
												src={review.avatar || '/placeholder.svg'}
												alt={review.name}
											/>
											<AvatarFallback>
												{review.name
													.split(' ')
													.map((n) => n[0])
													.join('')}
											</AvatarFallback>
										</Avatar>
										<div>
											<div className='font-semibold text-sm'>{review.name}</div>
											{review.verified && (
												<div className='text-xs text-primary'>
													Verified Purchase
												</div>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
