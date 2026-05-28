import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";

export default function AssignmentCard(){
    const router = useRouter()
    return(
        <div className="bg-white rounded-3xl p-6 ">
            <div className="flex justify-between">
                <p className="text-2xl font-bold w-[90%]">Quiz on Electricity</p> 
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger>
                      
                            <EllipsisVertical className="text-[#A9A9A9] cursor-pointer" />
                       
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        
                        <DropdownMenuItem onClick={() => router.push("/assignments/1")}>View Assignment</DropdownMenuItem>
                        <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
                    
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
         
            <div className="flex justify-between mt-10">
                <p><span className="font-medium">Assigned on</span> : 20-06-2025</p>
                <p><span className="font-medium">Due</span> : 21-06-2025</p>
            </div>
            
           
        </div>
    )
}