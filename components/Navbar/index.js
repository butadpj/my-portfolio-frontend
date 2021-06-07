import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, animateScroll as scroll } from "react-scroll";
import useScrollPosition from "@react-hook/window-scroll";
import style from "./Navbar.module.css";
const smoothScrollDuration = 600;

const Navbar = () => {
  const [navShow, setNavShow] = useState(false);
  const [navLogoSrc, setNavLogoSrc] = useState(
    "/images/logo/logo-nav-mobile-dark@2x.png"
  );
  const scrollY = useScrollPosition(10);
  const navBar = useRef(null);
  const navContent = useRef(null);
  const navLinks = useRef(null);

  const handleMouseLeave = () => {
    setNavShow(false);
  };

  useEffect(() => {
    if (scrollY >= 150) {
      navBar.current.classList.add(style["navBarWhite"]);
      setNavLogoSrc("/images/logo/logo-nav-mobile-dark@2x.png");
    } else {
      navBar.current.classList.remove(style["navBarWhite"]);
      setNavLogoSrc("/images/logo/logo-nav-mobile-light@2x.png");
    }
  }, [scrollY]);

  useEffect(() => {
    if (navShow) {
      navLinks.current.classList.add(style["navLinksShow"]);
      navContent.current.addEventListener("mouseleave", handleMouseLeave);
    } else {
      navLinks.current.classList.remove(style["navLinksShow"]);
    }
    return () => {
      if (navShow) {
        navContent.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [navShow]);

  return (
    <nav className={style.navbar} ref={navBar}>
      <div className={style.navContent} ref={navContent}>
        <Image
          src={navLogoSrc}
          alt="navLogo"
          width={31}
          height={41}
          responsive="responsive"
          className={style.navLogo}
          onClick={() => scroll.scrollToTop()}
        />
        <div className={style.navLinks} ref={navLinks}>
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
              offset={-20}
              duration={smoothScrollDuration}
            >
              About
            </Link>
            <Link
              activeClass={style.active}
              to="projects"
              spy={true}
              smooth={true}
              offset={-100}
              duration={smoothScrollDuration}
            >
              Projects
            </Link>
            <Link
              activeClass={style.active}
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
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
