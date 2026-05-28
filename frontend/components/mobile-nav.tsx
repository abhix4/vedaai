'use client'

import Image from "next/image"
import { LayoutGrid,ChartPie, Ghost, FileText, Book, Settings } from 'lucide-react';
import { usePathname, useRouter } from "next/navigation";


export default function MobileNav(){
    const router = useRouter()
    const pathName = usePathname()
    const cleanPathName = pathName.split("/").filter(Boolean);

   
    const navLinks = [
        {   
            icon: <LayoutGrid size={16}/>,
            url:"home",
            title:"Home"
        },
        {   icon: <Ghost size={16}/>,
            url:"groups",
            title: "My Groups"
        },
        {   icon: <FileText size={16} />,
            url:"assignments",
            title:"Assignments"
        },
        {   icon: <Book size={16} />,
            url:"toolkits",
            title: "Ai Toolkit"
        },
     

    ]
    return (
        <div className=" bg-[#181818]  w-[93%] rounded-2xl md:hidden justify-between fixed bottom-4 left-4 px-6 py-4  shadow-[64px] z-10">
           
            <ul className="flex bg-[#181818] gap-4 justify-between">
            {
                navLinks.map((link: {title: string, icon: any, url: string},index: number) => (
                    <li key={index} className={`text-[#5E5E5ECC] hover:text-white text-sm flex flex-col items-center text-center rounded-lg cursor-pointer  p-1 ${cleanPathName[0] === link.url && 'text-white'}`} onClick={() => router.push(`/${link.url}`)}>
                        {link.icon}
                        {link.title}
                    </li>
                ))
            }
            </ul>
            

           
        </div>
    )
}