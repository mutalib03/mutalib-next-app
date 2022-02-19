import { PrismaClient } from "@prisma/client"
export default async function handler(req, res) {
  const {to,source,value, target ,amount, users, userDetail} = req.body
  const reciever = users.find(user => user.firstName === to)
  
  let USDbalance, NGNbalance, EURbalance
   if (source === "USD") {
      USDbalance = Number(userDetail.USD) - Number(value)
   } else {
     USDbalance = userDetail.USD
   }
   if (source === "NGN") {
      NGNbalance = Number(userDetail.NGN) - Number(value)
   } else {
     NGNbalance = userDetail.NGN
   }

  if (source === "EUR") {
      EURbalance = Number(userDetail.EUR) - Number(value)
   } else {
     EURbalance = userDetail.EUR
   }

    USDbalance = Math.trunc(USDbalance)
    NGNbalance = Math.trunc(NGNbalance)
    EURbalance = Math.trunc(EURbalance)

   let USDrecieve, NGNrecieve, EURrecieve

  if (target === "USD") {
  USDrecieve = Number(reciever.USD) + Number(amount)
  } else{
    USDrecieve =  reciever.USD
  }

  if (target === "EUR") {
  EURrecieve = Number(reciever.EUR) + Number(amount)
  } else{
    EURrecieve =  reciever.EUR    
  }

  if (target === "NGN") {
  NGNrecieve = Number(reciever.NGN) + Number(amount)
  } else{
    NGNrecieve =  reciever.NGN
  }

  USDrecieve = Math.trunc(USDrecieve)
  NGNrecieve = Math.trunc(NGNrecieve)
  EURrecieve = Math.trunc(EURrecieve)
  
   const prisma = new PrismaClient()
 
  try {
      await prisma.Transaction.create({
         data:{
      to,
      source,
      value,
      target, 
      author:{connect:{email:userDetail.email}}
         } 
      })
       res.status(200).json({ name: 'submitted' })
  } catch (error) {
     console.error(error)
  }


 try {
      await prisma.User.update({
        where:{ email: userDetail.email},
        data:{
       USD: USDbalance,
       NGN: NGNbalance,
       EUR: EURbalance
         } 
      })
     
  } catch (error) {
     console.error(error)
  }

try {
      await prisma.User.update({
        where:{ email: reciever.email},
        data:{
       USD: USDrecieve,
       NGN: NGNrecieve,
       EUR: EURrecieve
         } 
      })
     
  } catch (error) {
     console.error(error)
  }


}