import React, { PropsWithChildren } from 'react';
import Footer from './common/Footer/Footer';
import Header from './common/Header/Header';
import { SidebarInset, SidebarProvider } from './ui/sidebar';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
	// const [session] = useAtom(userAtom);

	return (
		<>
			<SidebarProvider defaultOpen={true}>
				<SidebarInset>
					{/* <SidebarHeader> */}
					<Header />
					{/* </SidebarHeader> */}
					<div className='flex flex-col flex-1 gap-4'>
						<>{children}</>
					</div>
					{/* <SidebarFooter className='dark:bg-[#172031] bg-[#FBFBFB] border-t !py-8 flex h-20 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
						<div className='flex items-center px-4 gap-2'>
						</div>
						</SidebarFooter> */}

					<Footer />
				</SidebarInset>
			</SidebarProvider>
		</>
	);
};

export default AppLayout;
