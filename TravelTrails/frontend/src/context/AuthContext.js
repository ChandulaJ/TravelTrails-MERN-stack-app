import {createContext,useReducer} from 'react';

export const Authcontext = createContext()

export const authReducer = (state,action) => {
    switch(action.type){
        case "LOGIN":
            return {user:action.payload}
        case "LOGOUT":
            return {user:null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user:null
    })
    
    console.log('AuthContext State : ',state)
    return (
        <Authcontext.Provider value={{...state,dispatch}}>
            {children}
        </Authcontext.Provider>
    )
}