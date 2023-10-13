import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const logout =() => {
        //remove account from storage
        localStorage.removeItem('accounts')

        //dispatch Logout action
        dispatch({type: 'LOGOUT'})
    }
    return { logout }
}