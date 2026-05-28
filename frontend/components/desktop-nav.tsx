'use client'

import Image from "next/image"
import { LayoutGrid,ChartPie, Ghost, FileText, Book, Settings } from 'lucide-react';
import { usePathname, useRouter } from "next/navigation";


export default function DesktopNav(){
    const router = useRouter()

    const pathName = usePathname()
    const cleanPathName = pathName.split("/").filter(Boolean);

    console.log(cleanPathName[0])
    const navLinks = [
        {   
            icon: <LayoutGrid />,
            url:"home",
            title:"Home"
        },
        {   icon: <Ghost />,
            url:"groups",
            title: "My Groups"
        },
        {   icon: <FileText />,
            url:"assignments",
            title:"Assignments"
        },
        {   icon: <Book />,
            url:"toolkits",
            title: "Ai Teacher's Toolkit"
        },
        {   icon: <ChartPie/>,
            url:"library",
            title:"My library"
        }

    ]
    return (
        <div className="hidden md:flex bg-white rounded-2xl  flex-col justify-between md:min-w-76 md:h-186 p-6 shadow-2xl">
            <div className="flex flex-col gap-12">
              <div className="flex items-center">
                <Image src='/veda-logo.svg' width={80} height={80} alt="Veda Ai" className="translate-y-3  -translate-x-5"/>
                <h1 className="text-2xl font-medium -translate-x-8 tracking-tighter">Veda AI</h1>
              </div>


            <div className="rounded-[100px] bg-linear-to-b from-[#FF7950] to-[#C0350A] flex items-center justify-center p-1 " onClick={() => router.push("/assignments/create")}>
                <button className="bg-[#272727] text-white cursor-pointer font-medium px-12 py-2 rounded-[100px]">Create Assignment</button>
            </div>
            <ul className="flex flex-col gap-2">
            {
                navLinks.map((link: {title: string, icon: any, url: string},index: number) => (
                    <li key={index} className={`text-[#5E5E5ECC] flex gap-2 rounded-lg cursor-pointer hover:text-[#303030] px-3 py-2 hover:bg-[#F0F0F0] ${cleanPathName[0] === link.url && 'bg-[#F0F0F0]'}`} onClick={() => router.push(`/${link.url}`)}>
                        {link.icon}
                        {link.title}
                    </li>
                ))
            }
            </ul>
            </div>

            <div className="flex flex-col gap-2">
                <div className="text-[#5E5E5ECC] hover:text-[#303030] flex gap-2 rounded-lg cursor-pointer  px-3 py-2 hover:bg-[#F0F0F0]">
                    <Settings />
                   <p>Settings</p>
                </div>

                <div className="bg-[#F0F0F0] p-3 rounded-2xl flex gap-6 items-center">
                    <Image src='/profile.jpg' width={60} height={60} alt="Veda Ai" className="rounded-full"/>

                    <div>
                     <p className="font-medium text-[#303030]">Delhi Public School</p>
                     <p className="text-[#5E5E5E]">Bokaro Steel City</p>
                    </div>
                </div>
            </div>
        </div>
    )
}