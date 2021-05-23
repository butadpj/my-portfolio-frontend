import { useRef } from "react";
import style from "./Home.module.css";
import Particles from "react-particles-js";
import HomeLogic from "./HomeLogic";
import useGetVersion from "../../hooks/useGetVersion";

const Home = ({ data }) => {
  const scrollLockRef = useRef(null);
  const largeTextRef = useRef(null);

  const { chosenParam, scrollText, scrollY, toggleScrollLock, unlockScroll } =
    HomeLogic(scrollLockRef);

  let homeData = useGetVersion("v1", data);

  let smallText = homeData ? homeData.small_text : "I'm";
  let largeText = homeData ? homeData.large_text : "Paul";
  let careerTitle = homeData ? homeData.career_title : "Software Developer";

  return (
    <section className={style.home} id="home">
      <Particles
        height="100vh"
        params={chosenParam}
        canvasClassName="particles"
      />
      <main className={style.main}>
        <div className={style.mainText}>
          <section>
            <div className={style.mainTextPronoun}>{smallText}</div>
            <div className={style.mainTextName} ref={largeTextRef}>
              {largeText}
            </div>
          </section>
          <div className={style.careerTitle}>{careerTitle}</div>
        </div>
      </main>
      <p
        onClick={toggleScrollLock}
        className={style.lockScroll}
        ref={scrollLockRef}
      >
        {scrollText} scroll
      </p>
    </section>
  );
};

export default Home;
