import { useAuthContext } from "./useAuthContext"
import {useSocialPostsContext} from "./useSocialPostsContext" 

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: socialPostsDispatch } = useSocialPostsContext()

    const logout =() => {
        //remove account from storage
        localStorage.removeItem('accounts')

        //dispatch Logout action
        dispatch({type: 'LOGOUT'})
        socialPostsDispatch({type: 'SET_SOCIALPOSTS', payload:null})
    }
    return { logout }
}