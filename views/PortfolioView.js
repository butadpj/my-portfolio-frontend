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
  const [enableFancyCursor, setEnableFancyCursor] = useState(true);

  const cursorRef = useRef(null);

  const mouseMoveHandler = (e) => {
    cursorRef.current.style.top = `calc(${e.clientY}px - 1.5rem)`;
    cursorRef.current.style.left = `calc(${e.clientX}px - 1.5rem)`;
  };

  // For touch screens e.g. Mobile phones, Tablets, etc.
  const touchMoveHandler = (e) => {
    cursorRef.current.style.left = `calc(${e.touches[0].clientX}px - 1.5rem)`;
    cursorRef.current.style.top = `calc(${e.touches[0].clientY}px - 1.5rem)`;
  };

  useEffect(() => {
    if (enableFancyCursor && cursorRef.current) {
      document.addEventListener("mousemove", (e) => mouseMoveHandler(e));
      document.addEventListener("touchmove", (e) => touchMoveHandler(e));

      return () => {
        document.removeEventListener("mousemove", (e) => mouseMoveHandler(e));
        document.removeEventListener("touchmove", (e) => mouseMoveHandler(e));
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
