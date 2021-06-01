import Image from "next/image";
import style from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faGithubSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faHandPointUp } from "@fortawesome/free-solid-svg-icons";

import { animateScroll as scroll } from "react-scroll";

let fullYear = new Date().getFullYear();
const Footer = () => {
  return (
    <section className={style.footer} id="footer">
      <div className={style.scrollTop} onClick={() => scroll.scrollToTop()}>
        <p>Scroll to top</p>
        <div className={style.scrollTopIcon}>
          <FontAwesomeIcon icon={faHandPointUp} />
        </div>
      </div>
      <main className={style.main}>
        <div className={style.mediaLinks}>
          <a href="https://www.facebook.com/butadpj" target="_blank">
            <FontAwesomeIcon icon={faFacebookSquare} />
          </a>
          <a href="https://github.com/butadpj" target="_blank">
            <FontAwesomeIcon icon={faGithubSquare} />
          </a>
          <a href="https://instagram.com/butadpj" target="_blank">
            <FontAwesomeIcon icon={faInstagramSquare} />
          </a>
        </div>
        <div className={style.contacts}>
          <div className={style.mobileNumber}>
            <p className={style.label}>Call me:</p>
            <p>09507867559</p>
          </div>
          <div className={style.mobileNumber}>
            <p className={style.label}>Email me:</p>
            <p>butadpj@gmail.com</p>
          </div>
        </div>
        <div className={style.footerLogo}>
          <Image src="/images/logo/logo-footer@2x.png" width={50} height={72} />
          <p>Paul John Butad &copy; {fullYear}</p>
        </div>
      </main>
    </section>
  );
};

export default Footer;
