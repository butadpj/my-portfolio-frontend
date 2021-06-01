import { useReducer, createContext } from "react";
import { reducer } from "../reducers/sectionDataReducer";

export const SectionDataContext = createContext();

const initialState = {
  isLoading: true,
};

const SectionDataContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SectionDataContext.Provider value={[state, dispatch]}>
      {props.children}
    </SectionDataContext.Provider>
  );
};

export default SectionDataContextProvider;
