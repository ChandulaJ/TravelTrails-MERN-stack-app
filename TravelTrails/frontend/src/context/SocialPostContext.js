import { createContext ,useReducer} from "react";

export const SocialPostsContext = createContext();

export const socialPostsReducer = (state,action) =>{
    switch(action.type){
        case 'SET_SOCIALPOSTS':
            return{
                socialPosts: action.payload
            }
        case 'CREATE_SOCIALPOST':
            return{
                socialPosts: [action.payload,...state.socialPosts]
            }
        default:
            return state

    }
}

export const SocialPostsContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(socialPostsReducer,{
        socialPosts: null
    })

    

    return (
        <SocialPostsContext.Provider value={{...state,dispatch}}>  
            {children}
        </SocialPostsContext.Provider> 
    )
}