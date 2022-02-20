// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
   const prisma = new PrismaClient()
  const { firstName,lastName,passWord,email,USD,NGN,EUR} = req.body
  try {
    await prisma.User.create({
      data:{
    email,
   firstName,
   lastName,
   passWord,
   USD,
   NGN,
   EUR
      }
      
    })
     res.status(200).json({ name: 'submitted' })
  } catch (error) {
    console.error(error)
  }

  



  
 
}
