import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import style from "./Navbar.module.css";
import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-scroll";

const Navbar = () => {
  const [navShow, setNavShow] = useState(false);
  const navLinks = useRef(null);

  const handleMouseLeave = () => {
    setNavShow(false);
  };

  useEffect(() => {
    if (navShow) {
      navLinks.current.classList.add("navLinksShow");

      navLinks.current.addEventListener("mouseleave", handleMouseLeave);

      return;
    }
    console.log(navLinks.current);
    navLinks.current.classList.remove("navLinksShow");

    return () => {
      navLinks.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [navShow]);

  return (
    <nav className={style.navbar}>
      <div className={style.navContent}>
        <Image
          src="/logo/logo-nav-mobile@2x.png"
          alt="navLogo"
          width={31}
          height={41}
          responsive="responsive"
          className={style.navLogo}
        />
        <div className={`${style.navLinks} `} ref={navLinks}>
          <div className={style.sectionLinks}>
            <Link
              activeClass={style.active}
              to="home"
              spy={true}
              smooth={true}
              offset={-50}
              duration={80}
            >
              Home
            </Link>

            <Link
              activeClass={style.active}
              to="about"
              spy={true}
              smooth={true}
              offset={0}
              duration={80}
            >
              About
            </Link>
            <div className="projects">Projects</div>
            <div className="contact">Contact</div>
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
