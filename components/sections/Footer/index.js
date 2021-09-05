import Image from "next/image";
import style from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faGithubSquare,
  faInstagramSquare,
  faDev,
  faYoutubeSquare,
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
          <a href="https://github.com/butadpj" target="_blank">
            <FontAwesomeIcon icon={faGithubSquare} />
          </a>
          <a href="https://dev.to/butadpj" target="_blank">
            <FontAwesomeIcon icon={faDev} />
          </a>
          <a
            href="https://www.youtube.com/channel/UCBTmZKbZkqE8JNpYyfTffHw"
            target="_blank"
          >
            <FontAwesomeIcon icon={faYoutubeSquare} />
          </a>
          <a href="https://www.facebook.com/butadpj" target="_blank">
            <FontAwesomeIcon icon={faFacebookSquare} />
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
        </div>
      </main>
      <p className={style.copyRight}>Paul John Butad &copy; {fullYear}</p>
    </section>
  );
};

export default Footer;
