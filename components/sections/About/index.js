import { useRef } from "react";
import Image from "next/image";
import style from "./About.module.css";

import AboutLogic from "./AboutLogic";

const About = ({ aboutData }) => {
  const aboutTextRef = useRef(null);
  const personNameRef = useRef(null);

  const {} = AboutLogic(aboutTextRef, personNameRef);

  // SET DEFAULT DATA (FALL BACK) when server is down
  let aboutText = aboutData
    ? aboutData.about_text
    : "I've spent the past 1+ year solving business problems with my passion in software development.\n \nThese days, my time is spent on improving our full-stack ecommerce app that I've been working on since last year.";
  let displayPicture = aboutData
    ? aboutData.display_picture
    : "/images/picture/resume_pic_1_50.png";
  let personName = aboutData ? aboutData.person_name : "Paul John Butad";

  return (
    <section className={style.about} id="about">
      <div data-aos="fade-down">
        <header className={style.headerText}>ABOUT ME</header>
        <main className={style.main}>
          <div className={style.aboutText}>{aboutText}</div>
          <div className={style.profile}>
            <div data-aos="fade-up">
              <Image
                src={displayPicture}
                width={110}
                height={110}
                className={style.profileImg}
              />
              <div className={style.profileName}>{personName}</div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default About;
