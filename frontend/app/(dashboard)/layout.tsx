import DesktopNav from "@/components/desktop-nav";
import MobileNav from "@/components/mobile-nav";
import TopBar from "@/components/top-bar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <div className="flex w-full mx-auto max-w-360 gap-3 p-4 bg-[#EEEEEE]">
      
      <DesktopNav/>  
      <MobileNav/>
      <section className="w-full max-h-[95vh] overflow-y-auto scrollbar-hide">
        <TopBar/>
        {children}
      </section>
    </div>
   
  );
}
