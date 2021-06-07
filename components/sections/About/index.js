import { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import style from "./About.module.css";
import useGetVersion from "../../../hooks/useGetVersion";
import { TokenContext } from "../../../context/TokenContext";
import { SectionDataContext } from "../../../context/SectionDataContext";
import useGetCookie from "../../../hooks/useGetCookie";

const About = ({ aboutData }) => {
  const router = useRouter();
  const [tokenState, tokenDispatch] = useContext(TokenContext);
  const [sectionDataState, sectionDataDispatch] =
    useContext(SectionDataContext);

  // SET DEFAULT DATA (FALL BACK) when server is down
  let aboutText = aboutData
    ? aboutData.about_text
    : "I've spent the past 1+ year solving business problems with my passion in software development.\n \nThese days, my time is spent on improving our full-stack ecommerce app that I've been working on since last year.";
  let displayPicture = aboutData
    ? aboutData.display_picture
    : "/images/picture/resume_pic_1_50.png";
  let personName = aboutData ? aboutData.person_name : "Paul John Butad";

  const editTextSample = async () => {
    try {
      const res = await fetch(`${process.env.devHost}/api/v1/home/1/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokenState.accessToken}`, //? LOCAL STORAGE
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ large_text: "Paul" }),
      });

      const data = await res.json();

      console.log(data);
      if (
        data.code === "token_not_valid" ||
        data.code === "bad_authorization_header"
      ) {
        router.push("admin/");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
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
