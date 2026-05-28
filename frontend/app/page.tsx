'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter()
  return (
    <div className=" min-h-screen w-full bg-linear-to-b from-white to-[#E4F2FC] p-4">
    <div className="mx-auto max-w-360">
    {/* navbar */}

      <div className="flex items-center justify-between ">
      <div className="flex items-end gap-2">
        <Image src='/logo.avif' width={30} height={30} alt="logo"/>
        <p className="tracking-tighter font-semibold">VedaAI</p>  
      </div>  

      <div className="bg-black w-fit px-3 py-1.5 rounded-xl shadow-2xl ring-1 ring-white">
        <button className="flex text-white gap-1 items-center cursor-pointer" >Contact Us</button>
      </div>    
    </div>

    <div className="mt-24 flex flex-col items-center gap-8">
      <p className="text-3xl md:text-5xl font-semibold tracking-tighter leading-12 md:leading-14 text-center">AI Academic Assessment & <br /> <span className="rounded-2xl text-[#FF5401] bg-[#F9E5CB] px-3 py-1">Intelligence System</span></p>
      <p className="text-[#424242] text-center max-w-3xl mx-auto">An AI academic system for assessment, teaching, and personalised learning - designed to improve academic outcomes, reduce cost & time, and strengthen institutional credibility.</p>

      <div className="bg-black w-fit px-3 py-1.5 rounded-xl shadow-2xl ring-1 ring-white">
      <button className="flex text-white gap-1 items-center cursor-pointer" onClick={() => router.push("/login")} >Get Started</button>
      </div> 
    </div>
    </div>
      
    </div>
  );
}
