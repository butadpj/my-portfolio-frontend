import { useReducer, createContext } from "react";
import { reducer } from "../reducers/tokenReducer";
import useGetLocalItem from "../hooks/useGetLocalItem";

export const TokenContext = createContext();

const initialState = {
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
};

const TokenContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (typeof window !== "undefined") {
    let accessToken = useGetLocalItem("accessToken");
    let refreshToken = useGetLocalItem("refreshToken");

    if (accessToken && refreshToken) {
      state.isAuthenticated = true;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    }
  }
  return (
    <TokenContext.Provider value={[state, dispatch]}>
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
