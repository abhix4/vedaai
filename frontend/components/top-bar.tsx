import { ArrowLeft, Bell, ChevronDown } from "lucide-react";

export default function TopBar(){
    return (
        <div className="bg-white w-full rounded-2xl flex gap-2.5 px-5 py-2 items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <ArrowLeft size={20} className="text-[#303030]" />
                <p>Assignment</p>
            </div>
            

            <div className="flex items-center gap-4">
                <div className="bg-[#F6F6F6] p-2 rounded-full">
                    <Bell size={18}/>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-red-400"></div>
               
                    <p className="font-medium">John Doe</p>

                    <ChevronDown size={18}/>
                </div>
            </div>
        </div>
    )
}