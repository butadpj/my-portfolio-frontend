import { useRef } from "react";
import style from "./Home.module.css";
import Particles from "react-particles-js";
import HomeLogic from "./HomeLogic";
import { SectionDataContext } from "../../../context/SectionDataContext";

const Home = ({ homeData }) => {
  const scrollLockRef = useRef(null);
  const smallTextRef = useRef(null);
  const largeTextRef = useRef(null);
  const careerTitleRef = useRef(null);
  const mainRef = useRef(null);
  // const [state, dispatch] = useContext(SectionDataContext);

  const {
    chosenParam,
    scrollText,
    scrollY,
    toggleScrollLock,
    unlockScroll,
    handleEditText,
  } = HomeLogic(
    scrollLockRef,
    mainRef,
    smallTextRef,
    largeTextRef,
    careerTitleRef
  );

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
      <main className={style.main} ref={mainRef}>
        <div className={style.mainText}>
          <section>
            <div
              className={style.mainTextPronoun}
              ref={smallTextRef}
              onClick={() => handleEditText("smallText")}
            >
              {smallText}
            </div>
            <div
              className={style.mainTextName}
              ref={largeTextRef}
              onClick={() => handleEditText("largeText")}
            >
              {largeText}
            </div>
          </section>
          <div
            className={style.careerTitle}
            ref={careerTitleRef}
            onClick={() => handleEditText("careerTitle")}
          >
            {careerTitle}
          </div>
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
