import { colors } from '@/theme/color';

export default function TopBar() {
	return (
		<div className='w-full' style={{ background: colors.card }}>
			<div className='container mx-auto px-4 py-2 flex items-center justify-between'>
				<div className='text-xs' style={{ color: colors.sub }}>
					Free shipping over <span style={{ color: colors.accent }}>$75</span>
				</div>
				<div
					className='flex items-center gap-4 text-xs'
					style={{ color: colors.sub }}
				>
					<span>Track Order</span>
					<span>Help</span>
					<span>Stores</span>
				</div>
			</div>
		</div>
	);
}
