import { useState, useEffect, useContext } from "react";
import { TokenContext } from "../../../context/TokenContext";
import { SectionDataContext } from "../../../context/SectionDataContext";

const AboutLogic = (aboutTextRef, personNameRef) => {
  const [tokenState, tokenDispatch] = useContext(TokenContext);
  const [sectionDataState, sectionDataDispatch] =
    useContext(SectionDataContext);
  return {};
};

export default AboutLogic;
