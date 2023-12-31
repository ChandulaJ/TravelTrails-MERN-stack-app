import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

//check whether needed

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (username, password, email, address, occupation, dateofbirth) => {
    setIsLoading(true);
    setError(null);

    
     //upload profile pic,(not implemented)
        try {
          const response = await fetch('/api/accounts/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
              email,
              address,
              occupation,
              dateofbirth,
              
            }),
          });
          const json = await response.json();

          if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
          } else {
            // Handle success as before
            localStorage.setItem('accounts', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false);
          }
        } catch (error) {
          setError(`Error signing up: ${error.message}`);
          setIsLoading(false);
        }
      };

  return { signup, isLoading, error };
};
