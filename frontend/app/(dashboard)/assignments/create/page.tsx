import  CreateAssignmentForm  from "@/components/create-assignment";

export default function CreateAssignment(){
    return (
        <div className="w-full">
            <div className="flex items-center ml-1 gap-3">
            <div className="h-5 w-5 rounded-full bg-[#4BC26D]/40 p-1">
                <div className="rounded-full w-3 h-3 bg-[#4BC26D]">

                </div>
            </div>
            <div>
            <p className="text-xl font-semibold">Create Assignment</p>
            <p className="text-sm text-[#5E5E5E8C]/80">Set up a new assignment for your students</p>
            </div>

            </div>
            <div className="py-12 px-22">
                <CreateAssignmentForm/>
            </div>
            
        </div>
    )
}