// #EDF5E1
import { PrismaClient } from "@prisma/client";
import Link from "next/link";


const Header  = ({users}) => {
 const {USD, EUR, NGN} = users
   
  return (
   <div>
 <div className="w-full h-20 bg-[#5CDB95] shadow-xl text-[#05386B] flex  items-center  justify-between ">
<div className="flex w-1/3 text-xl items-center">
 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-15 text-[#05386B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
</svg>
<span>SHADOW</span>
</div>
 <div className="w-1/2 flex justify-around">
<Link href="/dashboard">DASHBOARD</Link>
<Link href="/">LOGOUT</Link>
 </div>


   </div>
 
   <div className="w-1/4 bg-[#5CDB95] shadow-xl text-[#05386B] h-26 m-auto ">
    <div className="text-center text-xl">ACCOUNT BALANCE</div>
          <div className="text-xl ">
            <div className="text-center font-bold">USD {USD} </div>
              <div className="text-center font-bold">NGN {NGN} </div>
                <div className="text-center font-bold">EUR {EUR} </div>
          </div>


   </div>

 
  </div>
      );
}
 
export default Header ;