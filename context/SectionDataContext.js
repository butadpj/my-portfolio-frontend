import { useReducer, createContext } from "react";
import { reducer } from "../reducers/sectionDataReducer";

export const SectionDataContext = createContext();

const initialState = {
  isLoading: true, // Loading state for data fetch
  selectedVersion: "v1",
  selectedVersionId: { homeId: 1, aboutId: 1, projectsId: 1, contactId: 1 },
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
