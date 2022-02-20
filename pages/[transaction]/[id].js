
import Header from "../../component/header";
 import { useState } from "react";
import ExchangeRate from "../../component/calc";

import prisma from "../../lib/prisma";
import { useRouter } from "next/router";


export const getServerSideProps = async ({params}) => {
   
const users = await prisma.User.findMany()  
const userDetail = await prisma.User.findUnique({
   where:{
        id:Number(params.id)
    }
})

return {
  props:{users,userDetail}
}

}

 const Transfers = ({users, userDetail}) => {
  const [to , setTo] = useState("") 
  const [value , setValue] = useState("")
  const [target , setTarget] = useState("")
  const [source  , setSource] = useState("")
  const [boolean, setBoolean] = useState(true)
  const router = useRouter()
  
    console.log(userDetail)
  let  exchangeRates = ExchangeRate(source, target)
  let amount = value * exchangeRates

   let canTransfer
  if (source === "USD" && value > userDetail.USD )  {
        canTransfer=true
  } else if (source === "USD" && value > userDetail.USD ) {
      canTransfer =false
  }
 
   if (source === "NGN" && value > userDetail.NGN )  {
        canTransfer =true 
  } else if (source === "NGN" && value > userDetail.NGN ) {
      canTransfer =false
  }
 
   if (source === "EUR" && value > userDetail.EUR )  {
       canTransfer =true
  } else if (source === "EUR" && value < userDetail.EUR ) {
      canTransfer =false
  }
 
 
   const handleSubmit = async (e) => {
      e.preventDefault()
     
    try {
      const body = {to,source,value, target , amount, users, userDetail}
    await fetch("/api/transactions",{
    method:"post",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify(body)
    }) 
    router.push(`/${userDetail.email}`)
    } catch (error) {
      console.log(error)
    }
  
    
  }
  
  
  return ( 
  <>
     <Header users={userDetail}/>




   <div>
      <h1 className="mb-[20px] mt-[40px] text-xl uppercase text-center"> Transfer Money</h1>
  
    <form  onSubmit={handleSubmit} className=" shadow-xl w-1/2 m-auto bg-[#5CDB95] p-8" >
  
     <select required onChange={(e) =>setTo(e.target.value)} className="form-select appearance-none
       mb-10
      block
      w-full
      h-12
      px-3
      py-1.5
      text-base
      font-normal
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-[#05386B]
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
        <option selected>DESTINATION</option>
        {
        users.map(user =><option key={user.id} value={`${user.firstName}`}>{user.firstName} {user.lastName}</option> )
        }
      
       
    </select>  
 {
   exchangeRates ? 
   (
   <p>THE EXCHANGE RATE IS {exchangeRates} </p>
   )
   :
   null
 }

    <select  onChange={(e) => setSource(e.target.value) } required className="form-select appearance-none
      block
      w-full
       h-12
      px-3
      py-1.5
      text-base
      font-normal
      text-[]
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-[#05386B]
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
        <option selected>YOUR CURRENCY</option>
        <option value="USD">USD</option>
        <option value="NGN">NGN</option>
        <option value="EUR">EUR</option>
    </select>  

     <select onChange={e => setTarget(e.target.value)} required className="form-select appearance-none
      mt-10
     block
      w-full
       h-12
      px-3
      py-1.5
      text-base
      font-normal
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-[#05386B]
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
        <option selected>TARGET CURRENCY</option>
        <option value="USD">USD</option>
        <option value="NGN">NGN</option>
        <option value="EUR">EUR</option>
    </select> 
  

  <input
     required
     onChange={e => setValue(e.target.value)}
     type="number"
      className="
        form-control
         mt-10
        block
       w-full
       h-12
      px-3
      py-1.5
      text-base
      font-normal
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-[#05386B]
      rounded
      transition
      ease-in-out
      m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="exampleFormControlInput1"
      placeholder="Amount"
    />
      {
   amount ? 
   (
   <p>THE EQUIVALENT TO {target} IS  {amount} </p>
   )
   :
   null
 }
 
     <button onClick={() => setBoolean(!boolean)} disabled={canTransfer} type="submit" className="
      w-full
      mt-10
      px-6
      py-3.5
      bg-[#05386B]
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">
          { boolean ?
          "SEND"
          :
          "LOADING............"
          }
             </button>
      {
        canTransfer ? (
        <p className="text-[#ff0000] text-lg font-bold " >INSUFFICIENT FUND</p>
        )
        :
        (
        null
        )
      }
  </form>
  
   </div>

  </>
   
     );
}
 
export default Transfers;