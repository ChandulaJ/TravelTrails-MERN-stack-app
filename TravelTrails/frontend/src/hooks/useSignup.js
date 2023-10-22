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

    try {
      // Read the selected file as a data URL
      const reader = new FileReader();
      reader.onload = async (event) => {
        
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

      // Read the profilePic file as a data URL
      
    } catch (error) {
      setError(`Error reading profile picture: ${error.message}`);
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
