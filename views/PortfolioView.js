import Navbar from "../components/Navbar";
import UserStatus from "../components/UserStatus";
import Home from "../components/sections/Home";
import About from "../components/sections/About";
import Aims from "../components/sections/Aims";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";

const PortfolioView = ({ home, about }) => {
  return (
    <>
      <Navbar />
      <UserStatus />
      <Home data={home} />
      <About data={about} />
      <Aims />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
};

export default PortfolioView;
