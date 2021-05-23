import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, animateScroll as scroll } from "react-scroll";

import useScrollPosition from "@react-hook/window-scroll";
import Image from "next/image";
import style from "./Navbar.module.css";

const smoothScrollDuration = 80;

const Navbar = () => {
  const [navShow, setNavShow] = useState(false);
  const [navLogoSrc, setNavLogoSrc] = useState("/images/logo/logo-nav@2x.png");
  const scrollY = useScrollPosition(10);
  const navBar = useRef(null);
  const navLinks = useRef(null);

  const [screenSize, setScreenSize] = useState({ w: 0, h: 0 });
  const screenResize = () => {
    setScreenSize({ w: window.innerWidth, h: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", screenResize);

    return () => {
      window.removeEventListener("resize", screenResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 800) {
      console.log(screenSize);
    } else {
    }
  }, [screenSize]);

  const handleMouseLeave = () => {
    setNavShow(false);
  };

  useEffect(() => {
    if (scrollY >= 150) {
      navBar.current.classList.add("navBarWhite");
      setNavLogoSrc("/images/logo/logo-nav@2x.png");
    } else {
      navBar.current.classList.remove("navBarWhite");
      setNavLogoSrc("/images/logo/logo-nav-light@2x.png");
    }
  }, [scrollY]);

  useEffect(() => {
    if (navShow) {
      navLinks.current.classList.add("navLinksShow");

      navLinks.current.addEventListener("mouseleave", handleMouseLeave);

      return;
    }
    navLinks.current.classList.remove("navLinksShow");

    return () => {
      navLinks.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [navShow]);

  return (
    <nav className={style.navbar} ref={navBar}>
      <div className={style.navContent}>
        <Image
          src={navLogoSrc}
          alt="navLogo"
          width={31}
          height={41}
          responsive="responsive"
          className={style.navLogo}
          onClick={() => scroll.scrollToTop()}
        />
        <div className={`${style.navLinks} `} ref={navLinks}>
          <div className={style.sectionLinks}>
            <Link
              activeClass={style.active}
              to="home"
              spy={true}
              smooth={true}
              offset={-50}
              duration={smoothScrollDuration}
            >
              Home
            </Link>

            <Link
              activeClass={style.active}
              to="about"
              spy={true}
              smooth={true}
              offset={-50}
              duration={smoothScrollDuration}
            >
              About
            </Link>
            <Link
              activeClass={style.active}
              to="projects"
              spy={true}
              smooth={true}
              offset={-80}
              duration={smoothScrollDuration}
            >
              Projects
            </Link>
            <Link
              activeClass={style.active}
              to="contact"
              spy={true}
              smooth={true}
              offset={-50}
              duration={smoothScrollDuration}
            >
              Contact
            </Link>
          </div>
          <div className={style.socials}></div>
          <FontAwesomeIcon
            icon={faTimes}
            className={style.close}
            onClick={() => setNavShow(false)}
          />
        </div>
        <FontAwesomeIcon
          icon={faBars}
          className={style.bars}
          onClick={() => setNavShow(true)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
