import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { accounts: action.payload }
    case 'LOGOUT':
      return { accounts: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    accounts: null
  })

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem('accounts'))

    if (accounts) {
      dispatch({ type: 'LOGIN', payload: accounts }) 
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}