import { FileDown } from "lucide-react";

export default async function ViewAssignment({ params } : {
  params: Promise<{assignmentId: string}>
}){
    const {assignmentId} = await params;
    return (
        <div className="w-full p-5 bg-[#5E5E5E] rounded-[32px]">
            <div className="bg-[#181818CC] py-6 px-8 rounded-[32px]">
               <p className="text-white font-medium text-lg">  Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science classes on the NCERT chapters:</p>

                 <div className="bg-white w-fit px-6 py-2 rounded-[100px] mt-4">
                <button className="flex bg-white gap-1 items-center cursor-pointer" > <FileDown />Download as PDF</button>
            </div>
            </div>
        </div>
    )
}