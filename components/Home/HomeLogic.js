import { useState, useEffect } from "react";
import ParticlesConfig from "../../hooks/ParticlesConfig";
import useScrollPosition from "@react-hook/window-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";

const HomeLogic = (scrollLockRef) => {
  const { chosenParam } = ParticlesConfig();
  const scrollY = useScrollPosition(10);

  const [isScrollLock, setIsScrollLock] = useState(false);
  const [scrollText, setScrollText] = useState(
    <FontAwesomeIcon icon={faLock} />
  );

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

  return {
    chosenParam,
    scrollText,
    scrollY,
    toggleScrollLock,
    unlockScroll,
  };
};

export default HomeLogic;
