import { useEffect, useContext } from "react";

import Head from "next/head";
import { Loader, PWAInstallerAlert } from '../components';
import PortfolioView from "../views/PortfolioView";

import AOS from "aos";
import "aos/dist/aos.css";

import { SectionDataContext } from "../context/SectionDataContext";
import { selectDataVersion } from "../utils";

let SHOWLOADERTIME = 1000; // setTimeOut delay

const index = ({ home, about, projects }) => {
  const [sectionDataState, sectionDataDispatch] =
    useContext(SectionDataContext); // SectionDataContext

  const loadingState = sectionDataState.isLoading;

  // Get the specified data version (in SectionDataContext)
  let homeData = selectDataVersion(sectionDataState.selectedVersion, home);
  let aboutData = selectDataVersion(sectionDataState.selectedVersion, about);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      offset: 0,
      once: true,

    });
    AOS.refresh();

    // Get the id of specified section data version (for fetch purposes)
    sectionDataDispatch({
      type: "DATA_SECTION_VERSION_ID",
      payload: {
        homeId: homeData ? homeData.id : 1,
        aboutId: aboutData ? aboutData.id : 1,
      },
    });

    // Hide the loader after (n) milliseconds
    let timer = setTimeout(() => {
      sectionDataDispatch({ type: "DATA_INIT" }); // isLoading state -> False
    }, SHOWLOADERTIME);

    // Clear timeout if the component will unmount
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <PWAInstallerAlert />
      <Head>
        <title>Paul's Portfolio | Home</title>
      </Head>

      {loadingState ? <Loader /> : null}

      <PortfolioView
        home={homeData}
        about={aboutData}
        projects={projects}
      />

    </>
  );
};

export const getStaticProps = async () => {
  let fetchUrl = `${process.env.devHost}/api/`;
  let fetchApiVersion = "v1/"; // api version
  let fetchSectionUrls = ["home/", "about/", "projects/"];
  try {
    // Single URL fetch
    // const res = await fetch(`http://127.0.0.1:8000/api/v1/home/`);
    // const home = await res.json();

    // Multiple URL fetch
    const responses = await Promise.all(
      fetchSectionUrls.map((sections) =>
        fetch(`${fetchUrl}${fetchApiVersion}${sections}`).then((res) =>
          res.json()
        )
      )
    );

    return {
      props: {
        home: responses[0],
        about: responses[1],
        projects: responses[2],
      },
      revalidate: 10, //seconds
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {},
  };
};

export default index;
