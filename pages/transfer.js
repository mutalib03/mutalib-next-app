import Header from "../component/header";
 import { useState } from "react";
import ExchangeRate from "../component/calc";
import prisma from "../lib/prisma";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LoginContext } from "./_app";
import { PrismaClient } from "@prisma/client";

export const getStaticProps = async () => {
 
const users = await prisma.User.findMany()  
 

return {
  props:{users}
}

}

 const Transfer = ({users}) => {
  const [to , setTo] = useState("") 
  const [value , setValue] = useState("")
  const [target , setTarget] = useState("")
  const [source  , setSource] = useState("")
  const router = useRouter()
  const {userDetail} = useContext(LoginContext)
  
  let  exchangeRates = ExchangeRate(source, target)
  let amount = value * exchangeRates
 
 
 
 
  
 
   const handleSubmit = async (e) => {
      e.preventDefault()
     
    try {
      const body = {to,source,value, target , amount, users, userDetail}
    await fetch("/api/transactions",{
    method:"post",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify(body)
    }) 
    router.push("/transaction")
    } catch (error) {
      console.log(error)
    }
  
    
  }
  
  
  return ( 
  <>
     <Header users={users}/>




   <div>
      <h1 className="mb-[20px] mt-[40px] text-xl uppercase text-center"> Transfer Money</h1>
  
    <form  onSubmit={handleSubmit} className="w-1/2 m-auto bg-[#5CDB95] p-8" >
  
     <select required onChange={(e) =>setTo(e.target.value)} class="form-select appearance-none
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

    <select  onChange={(e) => setSource(e.target.value) } required class="form-select appearance-none
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

     <select onChange={e => setTarget(e.target.value)} required class="form-select appearance-none
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
      class="
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

     <button type="submit" class="
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
      ease-in-out">SEND</button>
  </form>
  
   </div>

  </>
   
     );
}
 
export default Transfer;