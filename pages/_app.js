import { createContext, useState } from 'react'
import '../styles/globals.css'

export const LoginContext = createContext()


function MyApp({ Component, pageProps }) {
  const[userDetail, setUserDetail] = useState({})

  return (
    <LoginContext.Provider value={{userDetail , setUserDetail}}>
     <Component {...pageProps} />
    </LoginContext.Provider>
 
  )
}


export default MyApp
