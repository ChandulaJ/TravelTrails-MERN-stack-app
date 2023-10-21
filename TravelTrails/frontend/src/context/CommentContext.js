import React, { createContext, useReducer, useContext } from "react";

// Create a context for comments
export const CommentsContext = createContext();

// Reducer function for comments
const commentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return {
        comments: action.payload
      };
    case "ADD_COMMENT":
      return {
        comments: [action.payload, ...state.comments]
      };
    case "DELETE_COMMENT":
      return {
        comments: state.comments.filter((comment) => comment._id !== action.payload._id)
      };
    case "UPDATE_COMMENT":
      return {
        comments: state.comments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        )
      };
    default:
      return state;
  }
};

// Context provider for comments
export const CommentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentsReducer, {
    comments: []
  });

  return (
    <CommentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CommentsContext.Provider>
  );
};

// Custom hook to access comments context
export const useCommentsContext = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useCommentsContext must be used within a CommentsContextProvider");
  }
  return context;
};
