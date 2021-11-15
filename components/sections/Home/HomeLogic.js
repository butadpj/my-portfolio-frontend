import { useState, useEffect, useContext } from "react";
import ParticlesConfig from "../../../hooks/ParticlesConfig";
import useScrollPosition from "@react-hook/window-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { TokenContext } from "../../../context/TokenContext";
import { SectionDataContext } from "../../../context/SectionDataContext";

let SMALL_TEXT_VALUE = "";
let LARGE_TEXT_VALUE = "";
let CAREER_TITLE_VALUE = "";

let OLD_SMALL_TEXT_VALUE = "";
let OLD_LARGE_TEXT_VALUE = "";
let OLD_CAREER_TITLE_VALUE = "";

let SAVE_TIME_DELAY = 3000;

const HomeLogic = (
  scrollLockRef,
  mainRef,
  smallTextRef,
  largeTextRef,
  careerTitleRef
) => {
  const { chosenParam } = ParticlesConfig();
  const scrollY = useScrollPosition(10);
  const [isScrollLock, setIsScrollLock] = useState(false);
  const [scrollText, setScrollText] = useState(
    <FontAwesomeIcon icon={faLock} color="var(--dark)" />
  );
  const [tokenState, tokenDispatch] = useContext(TokenContext);
  const [sectionDataState, sectionDataDispatch] =
    useContext(SectionDataContext);

  // ID of the section's selected version
  const fetchId = sectionDataState.selectedVersionId.homeId;

  const unlockScroll = () => {
    document.body.style.overflow = "auto";
    setIsScrollLock(false);

    setScrollText(<FontAwesomeIcon icon={faLock} color="var(--dark)" />); // Scroll is lockable
  };

  const lockScroll = () => {
    document.body.style.overflow = "hidden";
    setIsScrollLock(true);
    setScrollText(<FontAwesomeIcon icon={faUnlock} color="var(--light-1)" />); // Scroll is unlockable
  };

  const toggleScrollLock = () => {
    // If the scroll is lock, then unlock it
    if (isScrollLock) {
      unlockScroll();
      return;
    }
    // If the scroll is not lock, then lock it
    lockScroll();
  };

  const makeEditable = (content) => {
    if (tokenState.isAuthenticated) {
      content.current.contentEditable = true;
      content.current.focus();
    } else console.log("Not editable");
  };

  const handleEditText = (text) => {
    if (text === "smallText") makeEditable(smallTextRef);
    if (text === "largeText") makeEditable(largeTextRef);
    if (text === "careerTitle") makeEditable(careerTitleRef);
  };

  const contentEditableFetch = async (property, value) => {
    let fetchUrl = `${process.env.prodHost}/api/v1/home/${fetchId}/`;

    if (fetchId) {
      const res = await fetch(fetchUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokenState.accessToken}`, //? LOCAL STORAGE
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [property]: value }),
      });

      const data = await res.json();

      console.log(data);
    } else {
      console.log("There's something wrong with fetchId");
    }
  };

  // Called in refsEventsInit()
  const handleSubmitTextValue = (
    textRef,
    textValue,
    oldTextValue,
    property
  ) => {
    // Only save changes when there's a change in text values
    if (textValue !== oldTextValue) {
      textRef.current.textContent = textValue.trim(); // Trime the whitespace
      contentEditableFetch(property, textValue);
    }
  };

  const textValuesInit = () => {
    SMALL_TEXT_VALUE = smallTextRef.current.textContent;
    LARGE_TEXT_VALUE = largeTextRef.current.textContent;
    CAREER_TITLE_VALUE = careerTitleRef.current.textContent;

    OLD_SMALL_TEXT_VALUE = SMALL_TEXT_VALUE;
    OLD_LARGE_TEXT_VALUE = LARGE_TEXT_VALUE;
    OLD_CAREER_TITLE_VALUE = CAREER_TITLE_VALUE;
  };

  const refsEventsInit = () => {
    smallTextRef.current.addEventListener("input", () => {
      SMALL_TEXT_VALUE = smallTextRef.current.textContent;

      // Wait for 3 seconds before saving the value
      setTimeout(() => {
        OLD_SMALL_TEXT_VALUE = SMALL_TEXT_VALUE;
      }, SAVE_TIME_DELAY);
    });
    smallTextRef.current.addEventListener("focusout", () =>
      handleSubmitTextValue(
        smallTextRef,
        SMALL_TEXT_VALUE,
        OLD_SMALL_TEXT_VALUE,
        "small_text"
      )
    );

    largeTextRef.current.addEventListener("input", () => {
      LARGE_TEXT_VALUE = largeTextRef.current.textContent;

      // Wait for 3 seconds before saving the value
      setTimeout(() => {
        OLD_LARGE_TEXT_VALUE = LARGE_TEXT_VALUE;
      }, SAVE_TIME_DELAY);
    });
    largeTextRef.current.addEventListener("focusout", () =>
      handleSubmitTextValue(
        largeTextRef,
        LARGE_TEXT_VALUE,
        OLD_LARGE_TEXT_VALUE,
        "large_text"
      )
    );

    careerTitleRef.current.addEventListener("input", () => {
      CAREER_TITLE_VALUE = careerTitleRef.current.textContent;

      // Wait for 3 seconds before saving the value
      setTimeout(() => {
        OLD_CAREER_TITLE_VALUE = CAREER_TITLE_VALUE;
      }, SAVE_TIME_DELAY);
    });
    careerTitleRef.current.addEventListener("focusout", () =>
      handleSubmitTextValue(
        careerTitleRef,
        CAREER_TITLE_VALUE,
        OLD_CAREER_TITLE_VALUE,
        "career_title"
      )
    );
  };

  useEffect(() => {
    if (scrollY >= 40) {
      scrollLockRef.current.classList.add("hide");
      scrollLockRef.current.style.pointerEvents = "none";
      unlockScroll();
    } else {
      scrollLockRef.current.classList.remove("hide");
      scrollLockRef.current.style.pointerEvents = "all";
    }
  }, [scrollY]);

  useEffect(() => {
    // If the user is authenticated, contentEditable -> TRUE
    if (tokenState.isAuthenticated) mainRef.current.style.pointerEvents = "all";
    textValuesInit(); // Initialize text values
    refsEventsInit(); // Initialize text refs events
  }, [fetchId]);

  return {
    chosenParam,
    scrollText,
    toggleScrollLock,
    handleEditText,
  };
};

export default HomeLogic;
