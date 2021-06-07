import { useState, useEffect, useContext } from "react";
import ParticlesConfig from "../../../hooks/ParticlesConfig";
import useScrollPosition from "@react-hook/window-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { TokenContext } from "../../../context/TokenContext";
import { SectionDataContext } from "../../../context/SectionDataContext";

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
    <FontAwesomeIcon icon={faLock} />
  );
  const [tokenState, tokenDispatch] = useContext(TokenContext);
  const [sectionDataState, sectionDataDispatch] =
    useContext(SectionDataContext);

  const fetchId = sectionDataState.selectedVersionId.homeId;
  let smallTextValue = "";
  let largeTextValue = "";
  let careerTitleValue = "";

  const toggleScrollLock = () => {
    // If the scroll is lock, then unlock it
    if (isScrollLock) {
      document.body.style.overflow = "auto";
      setIsScrollLock(false);

      setScrollText(<FontAwesomeIcon icon={faLock} />); // Scroll is lockable
      return;
    }
    // If the scroll is not lock, then lock it
    document.body.style.overflow = "hidden";
    setIsScrollLock(true);

    setScrollText(<FontAwesomeIcon icon={faUnlock} />); // Scroll is unlockable
  };

  const unlockScroll = () => {
    document.body.style.overflow = "auto";
    setIsScrollLock(false);

    setScrollText(<FontAwesomeIcon icon={faLock} />); // Scroll is lockable
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

  const toEditFetch = async (toEdit, toEditValue) => {
    const res = await fetch(`${process.env.devHost}/api/v1/home/${fetchId}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenState.accessToken}`, //? LOCAL STORAGE
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [toEdit]: toEditValue }),
    });

    const data = await res.json();

    console.log(data);
  };

  const handleSubmitTextValue = (textRef, textValue, toEditValue) => {
    textRef.current.textContent = textValue.trim(); // Trime the whitespace
    toEditFetch(toEditValue, textValue);
  };

  const textValuesInit = () => {
    smallTextValue = smallTextRef.current.textContent;
    largeTextValue = largeTextRef.current.textContent;
    careerTitleValue = careerTitleRef.current.textContent;
  };

  const textEventsInit = () => {
    smallTextRef.current.addEventListener("input", () => {
      smallTextValue = smallTextRef.current.textContent;
    });
    smallTextRef.current.addEventListener("focusout", () =>
      handleSubmitTextValue(smallTextRef, smallTextValue, "small_text")
    );

    largeTextRef.current.addEventListener("input", () => {
      largeTextValue = largeTextRef.current.textContent;
    });
    largeTextRef.current.addEventListener("focusout", () =>
      handleSubmitTextValue(largeTextRef, largeTextValue, "large_text")
    );

    careerTitleRef.current.addEventListener("input", () => {
      careerTitleValue = careerTitleRef.current.textContent;
    });
    careerTitleRef.current.addEventListener("focusout", () =>
      handleSubmitTextValue(careerTitleRef, careerTitleValue, "career_title")
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
    if (tokenState.isAuthenticated) mainRef.current.style.pointerEvents = "all";
    textValuesInit();
    textEventsInit();
  }, []);

  return {
    chosenParam,
    scrollText,
    scrollY,
    toggleScrollLock,
    unlockScroll,
    handleEditText,
  };
};

export default HomeLogic;
