import DesktopNav from "@/components/desktop-nav";
import TopBar from "@/components/top-bar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <div className="flex gap-3">
      <DesktopNav/>  
      <section className="w-full max-h-[95vh] overflow-y-auto scrollbar-hide">
        <TopBar/>
        {children}
      </section>
    </div>
   
  );
}
