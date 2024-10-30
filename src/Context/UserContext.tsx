import { createContext, ReactNode, useState } from "react";

type userContextType = {
  userToken: string | null,
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>
}

export let userContext = createContext<userContextType | undefined>(undefined);

export default function UserContextProvider(props:{children:ReactNode}) {
    
let [userToken,setUserToken] = useState<string | null>(null);


  return  <userContext.Provider value={{userToken,setUserToken}}>
        {props.children}
    </userContext.Provider>
}
