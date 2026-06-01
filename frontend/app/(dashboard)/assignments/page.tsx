'use client'
import AssignmentCard from "@/components/assignment-card";
import { Funnel, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Assignments(){
    const router = useRouter();
    const [assignments, setAssignments] = useState<any []>([])

    async function getAssignments() {
        const response = await apiFetch(
              "/all-question-paper",
              {
                method: "POST",
                body: JSON.stringify({
                    userId: '6a15878b55ed0527d4f76233'
                })
              }
            )
        setAssignments(response.allQuestionPapers)
        console.log(response)
    }

    useEffect(() => {
        getAssignments()
        
    },[])
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center ml-1 gap-3">
                <div className="h-5 w-5 rounded-full bg-[#4BC26D]/40 p-1">
                    <div className="rounded-full w-3 h-3 bg-[#4BC26D]">

                    </div>
                </div>
                <div>
                <p className="text-xl font-semibold">Assignments</p>
                <p className="text-sm text-[#5E5E5E8C]/80">Manage and create assignments for your classes.</p>
                </div>
    
            </div>

            <div className="bg-white w-full rounded-2xl flex gap-2.5 px-5 py-3 items-center justify-between mb-4">
                <div className="flex gap-2 items-center">
                    <Funnel className=" text-[#A9A9A9]" size={16} />
                    <p className="text-[#A9A9A9]">Filter By</p>
                </div>
                

                <div className="flex items-center">
                    <Search className="translate-x-8.5 text-[#A9A9A9]" />
                    <Input  placeholder="Search Assignment" className="px-4 py-3 rounded-[100px] text-sm pl-10"/>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-40 md:mb-20">
                {
                    assignments.map((assignment: any, index: number) => <AssignmentCard assignment={assignment} key={index}/>)
                }
                {/* <AssignmentCard/>
                <AssignmentCard/>
                <AssignmentCard/>
                <AssignmentCard/>
                <AssignmentCard/>
                <AssignmentCard/>
                <AssignmentCard/>
                <AssignmentCard/> */}
            </div>
            <div className="bg-[#181818] w-fit p-3 md:px-6 md:py-3 rounded-[100px] fixed bottom-25 md:bottom-8 right-4 md:left-[53%]">
                <button className="flex text-white gap-1 items-center cursor-pointer" onClick={() => router.push("/assignments/create")}> <Plus /><span className="hidden md:block">Create Assignment</span></button>
            </div>
        </div>
        
    )
}