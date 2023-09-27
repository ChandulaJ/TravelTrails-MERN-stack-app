import { SocialPostsContext } from "../context/SocialPostContext";
import { useContext } from "react";

export const useSocialPostsContext = () => {
const context = useContext(SocialPostsContext)

if(!context){
    throw new Error('useSocialPostsContext must be used within a SocialPostsContextProvider')
}

return context
}