import Image from "next/image";
import style from "./Navbar.module.css";
import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.navContent}>
        <Image
          src="/logo/logo-nav-mobile@2x.png"
          alt="nav-logo"
          width={31}
          height={41}
        />
        <div className={style.navLinks}>
          <div className={style.active}>Home</div>
          <div className="about">About</div>
          <div className="projects">Projects</div>
          <div className="contact">Contact</div>
        </div>
        <FontAwesomeIcon icon={faBars} className={style.bars} />
      </div>
    </nav>
  );
};

export default Navbar;
