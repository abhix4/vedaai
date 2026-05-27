import Image from "next/image";

export default function Home(){
    return (
            <div className=" w-full flex items-center justify-center mt-40 ">
                    <Image src='/nothing.svg' width={300} height={300} alt="nothing-found"/>
                </div>
    )
}