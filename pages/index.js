import Head from "next/head";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import About from "../components/About";

const index = () => {
  return (
    <>
      <Navbar />
      <Home />
      <About />
    </>
  );
};

export default index;
