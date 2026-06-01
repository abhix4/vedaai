'use client'
import { ArrowLeft, Bell, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { apiFetch } from "@/lib/api";

export default function TopBar(){
    const router = useRouter()

    async function logout(){
         const response = await apiFetch(
            "/teacher/logout",
            {
            method: "POST",
            
            }
        )
        if(response) router.push("/login")
    }
    return (
        <div className="bg-white w-full rounded-2xl flex gap-2.5 px-5 py-2 items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <ArrowLeft size={20} className="text-[#303030] cursor-pointer" onClick={() => router.push("/assignments")} />
                <p>Assignment</p>
            </div>
            

            <div className="flex items-center gap-2 md:gap-4">
                <div className="bg-[#F6F6F6] p-2 rounded-full">
                    <Bell size={18}/>
                </div>
                <div className="flex items-center gap-2">

                     <DropdownMenu modal={false}>
                    <DropdownMenuTrigger>
                      
                      <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-red-400"></div>
               
                    <p className="font-medium  hidden md:block">John Doe</p>

                    <ChevronDown size={18} className=" hidden md:block"/>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        
                        {/* <DropdownMenuItem onClick={() => router.push(`/assignments/${assignment._id}`)}>View Assignment</DropdownMenuItem> */}
                        <DropdownMenuItem variant='destructive' onClick={logout}>Logout</DropdownMenuItem>
                    
                    </DropdownMenuContent>
                </DropdownMenu>
                   
                </div>
            </div>
        </div>
    )
}