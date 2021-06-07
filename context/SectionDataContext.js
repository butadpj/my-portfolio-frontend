import { useReducer, createContext } from "react";
import { reducer } from "../reducers/sectionDataReducer";

export const SectionDataContext = createContext();

const initialState = {
  isLoading: true, // Loading state for data fetch
  selectedVersion: "v1",
  selectedVersionId: {
    homeId: null,
    aboutId: null,
    projectsId: null,
    contactId: null,
  },
  // Data from each section
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
