import { useContext, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { LoginContext } from "../_app";
import Header from "../../component/header";
import { useRouter } from "next/router";

export const getServerSideProps = async({params}) => {
    const prisma = new PrismaClient()
  const uniqueUser = await prisma.User.findUnique({
      where:{
          email: params.transaction
      },
      include:{Transactions:true}
  })


  
  return {
      props: { uniqueUser }
  }
}

const Transaction = ({uniqueUser}) => {
  
    const router = useRouter()
    const {Transactions, email, id} =uniqueUser
return(
   <>
   <Header users={uniqueUser}/>
  
   <div className="
   w-full
   h-full
   flex
   flex-col
   justify-center
   items-center
   ">
  <button onClick={() => router.push(`/${email}/${id}`)}
    className=" 
    px-[100px] py-[20px]
    bg-[#5CDB95]
    text-xl 
    tracking-widest 
    text-[#05386B]
    animate-bounce
   mt-16
    shadow-xl
    "

   >
       NEW TRANSACTION
   </button>

    <div className="
    w-[90%]
    ">
<p className=" 
text-[#05386B]  
p-[10px]
mt-10
text-[25px]
text-center
border-b-[3px]
border-[#5CDB95]
mb-[10px]
 shadow-xl
  font-bold
" >TRANSACTION HISTORY</p>
 <div
    className="
    flex
    justify-between
    text-center
    p-[20px]
    mb-[10px]
    text-lg
    font-bold
   text-[#05386B] 
    "
    
  >
     <span className=" w-[17%]">To</span>
    <span className="mr-[10px] w-[13%]">Value</span>
     <span className=" mr-[10px] w-[13%]">Target</span>
      <span className=" mr-[10px] w-[13%]">Source</span>
      <span className=" mr-[15px] w-[20%]">CreatedAt </span>
      <span className="mr-[10px] w-[20%]"> UpdatedAt</span>
  </div>

 {
Transactions.map(transact => 
  <div key={transact.id} 
    className="
    flex
    justify-between
    text-center
    p-[20px]
    bg-[#5CDB95]
    mb-[10px]
    shadow-xl
   text-[#05386B] 
    "
    
  >
    <span className=" w-[17%]">{transact.to}</span>
    <span className="mr-[10px] w-[13%]"> {transact.value}</span>
     <span className=" mr-[10px] w-[13%]">{transact.target}</span>
      <span className=" mr-[10px] w-[13%]">{transact.source}</span>
      <span className=" mr-[10px] w-[20%]">{new Date(transact.CreatedAt).toLocaleTimeString()} ,
          {new Date(transact.CreatedAt).toLocaleDateString()}
      </span>

      <span className="mr-[10px] w-[20%]"> {new Date(transact.UpdatedAt).toLocaleTimeString()} ,
      {new Date(transact.UpdatedAt).toLocaleDateString()}
      </span>
  </div> 
)    
}

    </div>



   </div>
 

   </>
   

)
}



export default Transaction;