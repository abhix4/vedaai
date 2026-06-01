import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function AssignmentCard({assignment}: any){
    const router = useRouter()

    async function deleteQP() {
            const response = await apiFetch(
                  "/delete-question-paper",
                  {
                    method: "POST",
                    body: JSON.stringify({
                        qpId: assignment._id
                    })
                  }
                )
            // setAssignments(response.allQuestionPapers)
            console.log(response)
        }
    
    return(
        <div className="bg-white flex flex-col justify-between rounded-3xl p-6 ">
            <div className="flex justify-between items-start">
                <p className="text-2xl font-bold w-[90%]">{assignment.title}</p> 
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger>
                      
                            <EllipsisVertical className="text-[#A9A9A9] cursor-pointer" />
                       
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        
                        <DropdownMenuItem onClick={() => router.push(`/assignments/${assignment._id}`)}>View Assignment</DropdownMenuItem>
                        <DropdownMenuItem variant='destructive' onClick={deleteQP}>Delete</DropdownMenuItem>
                    
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
         
            <div className="flex justify-between mt-10">
                <p><span className="font-medium">Assigned on</span> : 20-06-2025</p>
                <p><span className="font-medium">Due</span> : { new Date(assignment?.dueDate).toLocaleDateString()}</p>
            </div>
            
           
        </div>
    )
}