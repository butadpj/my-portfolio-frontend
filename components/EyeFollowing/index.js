import { useRef, useEffect } from "react";
import style from "./EyeFollowing.module.css";

const EyeFollowing = () => {
  const ballRef = useRef(null);

  let x, y;

  const mouseMoveHandler = (e) => {
    x = (e.clientX * 100) / window.innerWidth;
    y = (e.clientY * 100) / window.innerHeight;

    ballRef.current.style.left = `${x}%`;
    ballRef.current.style.top = `${y - 10}%`;
    ballRef.current.style.transform = `translate(-${x - 100}%, -${y - 100}%)`;
  };

  const touchMoveHandler = (e) => {
    x = (e.touches[0].clientX * 100) / window.innerWidth;
    y = (e.touches[0].clientY * 100) / window.innerHeight;

    ballRef.current.style.left = `${x}%`;
    ballRef.current.style.top = `${y - 10}%`;
    ballRef.current.style.transform = `translate(-${x - 100}%, -${y - 100}%)`;
  };

  useEffect(() => {
    document.addEventListener("mousemove", (e) => mouseMoveHandler(e));
    document.addEventListener("touchmove", (e) => touchMoveHandler(e));

    return () => {
      document.removeEventListener("mousemove", (e) => mouseMoveHandler(e));
      document.removeEventListener("touchmove", (e) => touchMoveHandler(e));
    };
  }, []);

  return (
    <div className={style.eye}>
      <div className={style.ball} ref={ballRef}></div>
    </div>
  );
};

export default EyeFollowing;
