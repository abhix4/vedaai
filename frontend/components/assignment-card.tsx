import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AssignmentCard(){
    return(
        <div className="bg-white rounded-3xl p-6 ">
            <div className="flex justify-between">
                <p className="text-2xl font-bold w-[90%]">Quiz on Electricity</p> 
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger>
                        <button>
                            <EllipsisVertical className="text-[#A9A9A9]" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        
                        <DropdownMenuItem>View Assignment</DropdownMenuItem>
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