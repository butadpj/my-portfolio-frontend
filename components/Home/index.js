import { useState, useEffect, useRef } from "react";

import style from "./Home.module.css";
import Particles from "react-particles-js";
import ParticlesConfig from "../../hooks/ParticlesConfig";
import useScrollPosition from "@react-hook/window-scroll";
import Canvas from "../Canvas";

const Home = () => {
  const { simple, bubbles } = ParticlesConfig();
  const scrollY = useScrollPosition(60);
  const [isScrollLock, setIsScrollLock] = useState(false);
  const [scrollText, setScrollText] = useState("Lock");

  const scrollLock = useRef(null);
  const toggleScrollLock = () => {
    if (isScrollLock) {
      document.body.style.overflow = "auto";
      setScrollText("Lock");
      setIsScrollLock(false);
      return;
    }
    console.log("SDadsa");
    document.body.style.overflow = "hidden";

    setScrollText("Unlock");
    setIsScrollLock(true);
  };

  useEffect(() => {
    if (scrollY >= 40) {
      scrollLock.current.classList.add("hide");
      scrollLock.current.style.pointerEvents = "none";
    } else {
      scrollLock.current.classList.remove("hide");
      scrollLock.current.style.pointerEvents = "all";
    }
  }, [scrollY]);

  return (
    <section className={style.home} id="home">
      {/* <Canvas /> */}
      <Particles params={simple} />
      <main className={style.main}>
        <div className={style.mainText}>
          <section>
            <div className={style.mainTextPronoun}>I'm</div>
            <div className={style.mainTextName}>Paul</div>
          </section>
          <div className={style.careerTitle}>Software Developer</div>
        </div>
      </main>
      <p
        onClick={toggleScrollLock}
        className={style.lockScroll}
        ref={scrollLock}
      >
        {scrollText} scroll
      </p>
    </section>
  );
};

export default Home;
