import Header from "../component/header";
import { useState } from "react";
import { useRouter } from "next/router";
import { LoginContext } from "./_app";  
import { useContext } from "react";
import { PrismaClient } from "@prisma/client";




export default function Home({Users}) {
 
 
  const [boolean , setBoolean] = useState(true)
  const [firstName, setFirstName]= useState("")
   const [ lastName, setLastName]= useState("")
    const [email, setEmail]= useState("")
    const [ passWord, setPassword]= useState("")
  const [loginEmail , setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
   const [message, setMessage]   = useState(false)
  const router = useRouter()
   const {setUserDetail} = useContext(LoginContext)

const logIn = (e) => {
 e.preventDefault()
 
 
let invalid = Users.find(user =>  
user.email ===loginEmail && user.passWord === loginPassword
  )

 setUserDetail(invalid)
 if (invalid) {
   router.push(`/${invalid.email}`)
 }else{
   setMessage(true)
 }


}




  const submitData = async (e) => {
  e.preventDefault()
  const USD = 1000
  const NGN = 0
  const EUR = 0
 try {
  const body = {firstName,lastName,email,passWord, USD,NGN,EUR}
  await fetch("/api/login",{
  method:"post",
  headers:{"Content-Type": "application/json"},
  body: JSON.stringify(body),
  });
  router.push(`/${email}`)
 } catch (error) {
    console.error(error)
 }
 
 
 }

 return (
  
  
   <div>
    <div className="mt-40 text-center font-xl flex justify-center items-center inline-block">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-15 text-[#05386B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
</svg>
 <span className="text-xl text-[#05386B] ml-1">SHADOW MONEY TRANSFER</span>
    </div>
   {
     boolean ?
     (
   
  <div className="block p-6 rounded-lg shadow-xl bg-[#5CDB95] max-w-xl mt-20 mx-auto">
  <form onSubmit={logIn}>
    <div className="form-group mb-6">
      { message ? 
       (
     <p className="text-center text-red-600 uppercase">invalid password or email address</p>
        )
      :
     null 

      }
      <label  htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700">Email address</label>
      <input type="email" onChange={(e) => setLoginEmail(e.target.value)} className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2"
        aria-describedby="emailHelp" placeholder="Enter email" required/>
      
    </div>
    <div className="form-group mb-6">
      <label htmlFor="exampleInputPassword2" className="form-label inline-block mb-2 text-gray-700">Password</label>
      <input type="password" onChange={(e) => setLoginPassword(e.target.value)}className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword2"
        placeholder="Password" required/>
    </div>
   
    <button type="submit" className="
      w-full
      px-6
      py-2.5
      bg-blue-600
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
      ease-in-out">Sign in</button>
    <p className="text-gray-800 mt-6 text-center">Not a member? 
      <span onClick={() => setBoolean(false)} 
        className="ml-2 uppercase text-blue-600 hover:text-blue-700 cursor-pointer focus:text-blue-700 transition duration-200 ease-in-out">Register</span>
    </p>
  </form>
</div>
     )
     :
     (
<div className="block p-6 rounded-lg shadow-xl bg-[#5CDB95] max-w-xl mt-20 mx-auto">
  <form onSubmit={submitData}>
    <div className="grid grid-cols-2 gap-4">
      <div className="form-group mb-6">
        <input onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123"
          aria-describedby="emailHelp123" placeholder="First name" required/>
      </div>
      <div className="form-group mb-6">
        <input onChange={(e) => setLastName(e.target.value)} type="text" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput124"
          aria-describedby="emailHelp124" placeholder="Last name" required/>
      </div>
    </div>
    <div className="form-group mb-6">
      <input type="email" onChange={(e) => setEmail(e.target.value)}className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
        placeholder="Email address" required/>
    </div>
    <div className="form-group mb-6">
      <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
        placeholder="Password" required/>
    </div>

    <button type="submit" className="
      w-full
      px-6
      py-2.5
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
      ease-in-out">Sign up</button>

    <p className="text-center text-blue text-blue-600 uppercase mt-2 cursor-pointer" onClick={() => setBoolean(true)}>Already registered?</p>
  </form>
</div>

     )
   }
 

    </div>
  
  )
}

export const getStaticProps = async () => {
const prisma = new PrismaClient()
  const Users = await prisma.User.findMany()

  return{props: {Users} }
}
