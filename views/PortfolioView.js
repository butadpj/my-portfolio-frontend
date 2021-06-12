import { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserStatus from "../components/UserStatus";
import Home from "../components/sections/Home";
import About from "../components/sections/About";
import Aims from "../components/sections/Aims";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";

const PortfolioView = ({ home, about, projects }) => {
  const [screenSize, setScreenSize] = useState({ w: 0, h: 0 });
  const [enableFancyCursor, setEnableFancyCursor] = useState(true);

  const cursorRef = useRef(null);

  const screenResize = () => {
    setScreenSize({ w: window.innerWidth, h: window.innerHeight });
  };

  const mouseMoveHandler = (e) => {
    if (cursorRef.current) {
      cursorRef.current.style.top = `calc(${e.clientY}px - 1.5rem)`;
      cursorRef.current.style.left = `calc(${e.clientX}px - 1.5rem)`;
    }
  };

  // Disable fancy cursor on mobile devices (There's a performance issue when enabled)
  useEffect(() => {
    if (screenSize.w <= 800) {
      setEnableFancyCursor(false);
    } else {
      setEnableFancyCursor(true);
    }
  }, [screenSize]);

  useEffect(() => {
    screenResize();
    if (enableFancyCursor) {
      window.addEventListener("resize", screenResize);
      document.addEventListener("mousemove", (e) => mouseMoveHandler(e));

      return () => {
        window.removeEventListener("resize", screenResize);
        document.removeEventListener("mousemove", (e) => mouseMoveHandler(e));
      };
    } else {
      document.body.style.cursor = "default";
    }
  }, []);

  return (
    <>
      {enableFancyCursor ? (
        <div className="cursor" ref={cursorRef}></div>
      ) : null}
      <Navbar />
      <UserStatus />
      <Home homeData={home} />
      <About aboutData={about} />
      <Aims />
      <Projects projectsData={projects} />
      <Contact />
      <Footer />
    </>
  );
};

export default PortfolioView;
